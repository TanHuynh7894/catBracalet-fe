import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Search, RefreshCw, Send, User as UserIcon, Clock,
    CheckCircle, Headphones, X, ChevronRight
} from 'lucide-react';
import { getAllTickets, getTicketMessages, closeTicket, getUserById } from '../../services/supportService';
import useSupportSocket from '../../hooks/useSupportSocket';
import styles from './SupportManagement.module.css';

const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const STATUS_BADGE = {
    open: { text: 'Đang mở', class: 'statusOpen' },
    closed: { text: 'Đã đóng', class: 'statusClosed' },
};

const SupportManagement = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTicket, setActiveTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMsgs, setLoadingMsgs] = useState(false);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [unreadMap, setUnreadMap] = useState({});

    // Cache thông tin user để hiển thị tên
    const [userCache, setUserCache] = useState({});

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const userString = localStorage.getItem('user');
    const currentUser = userString ? JSON.parse(userString) : {};
    const adminId = currentUser.id || currentUser._id;

    // ---- Fetch User Name Logic (có cache) ----
    const fetchUserName = useCallback(async (uid) => {
        if (!uid || userCache[uid]) return;
        try {
            const response = await getUserById(uid);
            const userData = response.data || response;

            // Lấy fullName và avatar từ API bạn gửi
            const userInfo = {
                name: userData.fullName || userData.full_name || userData.username || 'Khách hàng',
                avatar: userData.avatar || null
            };

            setUserCache(prev => ({ ...prev, [uid]: userInfo }));
        } catch (err) {
            console.warn(`[Support] Lỗi lấy profile cho uid: ${uid}`, err);
            setUserCache(prev => ({ ...prev, [uid]: { name: 'Người dùng', avatar: null } }));
        }
    }, [userCache]);

    // Tự động fetch tên cho tất cả ticket trong danh sách
    useEffect(() => {
        if (tickets.length > 0) {
            tickets.forEach(t => {
                if (t.user_id) fetchUserName(t.user_id);
            });
        }
    }, [tickets, fetchUserName]);

    // ---- Socket.IO ----
    const { sendMessage, joinTicket } = useSupportSocket({
        ticketId: activeTicket?.id || null,
        onChatHistory: (data) => {
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            setMessages(arr);
            setLoadingMsgs(false);
            // Lấy tên cho tất cả người gửi trong lịch sử
            arr.forEach(m => fetchUserName(m.sender_id));
        },
        onNewMessage: (msg) => {
            if (msg.ticket_id === activeTicket?.id) {
                setMessages(prev => [...prev, msg]);
                fetchUserName(msg.sender_id);
            } else {
                setUnreadMap(prev => ({ ...prev, [msg.ticket_id]: (prev[msg.ticket_id] || 0) + 1 }));
            }
        },
    });

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllTickets();
            setTickets(data || []);
        } catch (err) {
            console.error('Failed:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchTickets(); }, [fetchTickets]);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const handleSelectTicket = async (ticket) => {
        setActiveTicket(ticket);
        setMessages([]);
        setLoadingMsgs(true);
        setUnreadMap(prev => ({ ...prev, [ticket.id]: 0 }));
        joinTicket(ticket.id);

        try {
            const data = await getTicketMessages(ticket.id);
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            if (arr.length > 0) setMessages(arr);
        } catch { /* wait socket */ }

        setTimeout(() => setLoadingMsgs(false), 2000);
        setTimeout(() => inputRef.current?.focus(), 150);
    };

    const handleSend = () => {
        if (!inputText.trim() || !activeTicket) return;
        sendMessage(activeTicket.id, inputText.trim());
        setInputText('');
    };

    const filteredTickets = tickets.filter(t => {
        const matchSearch = t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (userCache[t.user_id] || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = filterStatus === 'all' || t.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className={styles.root}>
            {/* Sidebar */}
            <div className={styles.leftPanel}>
                <div className={styles.leftHeader}>
                    <div>
                        <h1 className={styles.panelTitle}>Hỗ trợ khách hàng</h1>
                        <p className={styles.panelSubtitle}>{tickets.length} yêu cầu</p>
                    </div>
                    <button className={styles.refreshBtn} onClick={fetchTickets} title="Làm mới">
                        <RefreshCw size={18} className={loading ? styles.spinning : ''} />
                    </button>
                </div>

                <div className={styles.searchBox}>
                    <Search className={styles.searchIcon} size={15} />
                    <input
                        type="text"
                        placeholder="Tìm theo ID hoặc Tên khách..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.filterTabs}>
                    {['all', 'open', 'closed'].map(s => (
                        <button
                            key={s}
                            className={`${styles.filterTab} ${filterStatus === s ? styles.filterTabActive : ''}`}
                            onClick={() => setFilterStatus(s)}
                        >
                            {s === 'all' ? 'Tất cả' : s === 'open' ? 'Mở' : 'Đóng'}
                        </button>
                    ))}
                </div>

                <div className={styles.ticketList}>
                    {loading ? (
                        <div className={styles.centerLoader}><RefreshCw size={24} className={styles.spinning} /></div>
                    ) : (
                        filteredTickets.map(ticket => (
                            <div
                                key={ticket.id}
                                className={`${styles.ticketItem} ${activeTicket?.id === ticket.id ? styles.ticketItemActive : ''}`}
                                onClick={() => handleSelectTicket(ticket)}
                            >
                                <div className={styles.ticketAvatar}>
                                    {userCache[ticket.user_id]?.avatar ? (
                                        <img src={userCache[ticket.user_id].avatar} alt="" className={styles.avatarImg} />
                                    ) : (
                                        <UserIcon size={18} />
                                    )}
                                </div>
                                <div className={styles.ticketInfo}>
                                    <div className={styles.ticketIdRow}>
                                        <span className={styles.userName}>
                                            {userCache[ticket.user_id]?.name || 'Đang tải...'}
                                        </span>
                                        {unreadMap[ticket.id] > 0 && <span className={styles.unreadBadge}>{unreadMap[ticket.id]}</span>}
                                    </div>
                                    <div className={styles.ticketMeta}>
                                        <span className={styles.ticketIdLabel}>ID: #{ticket.id.slice(0, 8)}...</span>
                                        <span className={`${styles.ticketStatus} ${styles[STATUS_BADGE[ticket.status].class]}`}>
                                            {ticket.status === 'open' ? '●' : '○'} {STATUS_BADGE[ticket.status].text}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight size={14} className={styles.chevron} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={styles.rightPanel}>
                {!activeTicket ? (
                    <div className={styles.emptyChat}>
                        <div className={styles.emptyChatIcon}><Headphones size={48} /></div>
                        <h2>Trung tâm Phản hồi</h2>
                        <p>Chọn một khách hàng để bắt đầu phiên tư vấn trực tuyến.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.chatHeader}>
                            <div className={styles.headerProfile}>
                                <div className={styles.chatHeaderAvatar}>
                                    {userCache[activeTicket.user_id]?.avatar ? (
                                        <img src={userCache[activeTicket.user_id].avatar} alt="" className={styles.avatarImg} />
                                    ) : (
                                        (userCache[activeTicket.user_id]?.name || 'K').charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <div className={styles.chatHeaderTitle}>
                                        {userCache[activeTicket.user_id]?.name || 'Đang tải tên...'}
                                    </div>
                                    <div className={styles.chatHeaderSub}>
                                        Ticket ID: <strong>#{activeTicket.id}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.chatHeaderActions}>
                                {activeTicket.status === 'open' && (
                                    <button className={styles.closeTicketBtn} onClick={async () => {
                                        if (confirm('Đóng ticket này?')) {
                                            await closeTicket(activeTicket.id);
                                            setActiveTicket({ ...activeTicket, status: 'closed' });
                                            fetchTickets();
                                        }
                                    }}>Đóng ticket</button>
                                )}
                                <button className={styles.clearBtn} onClick={() => setActiveTicket(null)}><X size={18} /></button>
                            </div>
                        </div>

                        <div className={styles.messagesArea}>
                            {loadingMsgs ? (
                                <div className={styles.loadingMsgs}>Đang tải lịch sử...</div>
                            ) : (
                                messages.map((msg, idx) => {
                                    // Quy tắc thép: Admin bên PHẢI, User bên TRÁI
                                    const isFromAdmin = msg.sender_role === 'admin';
                                    const isRightSide = isFromAdmin;

                                    const senderInfo = userCache[msg.sender_id] || (isFromAdmin ? { name: 'Admin' } : { name: 'Khách hàng' });
                                    const displayName = msg.sender_id === adminId ? 'Bạn' : senderInfo.name;

                                    return (
                                        <div key={msg.id || idx} className={`${styles.msgGroup} ${isRightSide ? styles.groupMe : styles.groupOther}`}>
                                            {!isRightSide && <div className={styles.senderName}>{senderInfo.name}</div>}
                                            <div className={`${styles.msgRow} ${isRightSide ? styles.rowMe : styles.rowOther}`}>
                                                {!isRightSide && (
                                                    <div className={styles.chatAvatar}>
                                                        {senderInfo.avatar ? <img src={senderInfo.avatar} className={styles.avatarImg} /> : 'U'}
                                                    </div>
                                                )}
                                                <div className={`${styles.msgBubble} ${isRightSide ? styles.bubbleMe : styles.bubbleOther}`}>
                                                    <p>{msg.message}</p>
                                                    <span className={styles.msgTime}>{formatTime(msg.created_at)}</span>
                                                </div>
                                                {isRightSide && (
                                                    <div className={`${styles.chatAvatar} ${styles.avatarAdmin}`}>
                                                        {senderInfo.avatar ? <img src={senderInfo.avatar} className={styles.avatarImg} /> : 'A'}
                                                    </div>
                                                )}
                                            </div>
                                            {isRightSide && <div className={styles.senderNameMe}>{displayName}</div>}
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className={styles.inputArea}>
                            <textarea
                                ref={inputRef}
                                className={styles.chatInput}
                                placeholder="Nhập tin nhắn..."
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                disabled={activeTicket.status === 'closed'}
                            />
                            <button className={styles.sendBtn} onClick={handleSend} disabled={!inputText.trim() || activeTicket.status === 'closed'}>
                                <Send size={18} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SupportManagement;
