import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Search, RefreshCw, Send, User, Clock,
    CheckCircle, AlertCircle, Headphones, X
} from 'lucide-react';
import { getAllTickets, getTicketMessages, closeTicket } from '../../services/supportService';
import useSupportSocket from '../../hooks/useSupportSocket';
import styles from './SupportManagement.module.css';

const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const STATUS_BADGE = {
    open: { text: 'Đang mở', class: 'statusOpen', icon: <Clock size={12} /> },
    closed: { text: 'Đã đóng', class: 'statusClosed', icon: <CheckCircle size={12} /> },
};

const SupportManagement = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTicket, setActiveTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMsgs, setLoadingMsgs] = useState(false);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all | open | closed
    const [unreadMap, setUnreadMap] = useState({});

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Lấy thông tin admin đang đăng nhập
    const userString = localStorage.getItem('user');
    const currentUser = userString ? JSON.parse(userString) : {};
    const adminId = currentUser.id || currentUser._id;

    // ---- Socket.IO ----
    const { sendMessage, joinTicket } = useSupportSocket({
        ticketId: activeTicket?.id || null,
        onChatHistory: (data) => {
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            setMessages(arr);
            setLoadingMsgs(false);
        },
        onNewMessage: (msg) => {
            if (msg.ticket_id === activeTicket?.id) {
                setMessages(prev => {
                    if (prev.find(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
            } else {
                setUnreadMap(prev => ({
                    ...prev,
                    [msg.ticket_id]: (prev[msg.ticket_id] || 0) + 1
                }));
            }
        },
    });

    // ---- Fetch ticket list ----
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllTickets();
            setTickets(data || []);
        } catch (err) {
            console.error('Failed to fetch tickets:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Select ticket
    const handleSelectTicket = async (ticket) => {
        setActiveTicket(ticket);
        setMessages([]);
        setLoadingMsgs(true);
        setUnreadMap(prev => ({ ...prev, [ticket.id]: 0 }));
        joinTicket(ticket.id);

        try {
            const data = await getTicketMessages(ticket.id);
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            if (arr.length > 0) {
                setMessages(arr);
                setLoadingMsgs(false);
            }
        } catch {
            console.info('[Admin] history via socket');
        }
        setTimeout(() => setLoadingMsgs(false), 3000);
        setTimeout(() => inputRef.current?.focus(), 150);
    };

    const handleSend = () => {
        const text = inputText.trim();
        if (!text || !activeTicket) return;
        sendMessage(activeTicket.id, text);
        setInputText('');
    };

    const handleCloseTicket = async () => {
        if (!activeTicket || !window.confirm('Đóng yêu cầu hỗ trợ này?')) return;
        try {
            await closeTicket(activeTicket.id);
            setActiveTicket(prev => ({ ...prev, status: 'closed' }));
            fetchTickets();
        } catch (err) {
            alert('Không thể đóng ticket');
        }
    };

    // Filtered list
    const filteredTickets = tickets.filter(t => {
        const matchSearch = t.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = filterStatus === 'all' || t.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className={styles.root}>
            {/* Left Panel */}
            <div className={styles.leftPanel}>
                <div className={styles.leftHeader}>
                    <div>
                        <h1 className={styles.panelTitle}>Hỗ trợ khách hàng</h1>
                        <p className={styles.panelSubtitle}>{tickets.length} ticket tổng cộng</p>
                    </div>
                    <button className={styles.refreshBtn} onClick={fetchTickets}>
                        <RefreshCw size={18} className={loading ? styles.spinning : ''} />
                    </button>
                </div>

                <div className={styles.searchBox}>
                    <Search className={styles.searchIcon} size={16} />
                    <input
                        type="text"
                        placeholder="Tìm ticket theo ID..."
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
                            {s === 'all' ? 'Tất cả' : s === 'open' ? 'Đang mở' : 'Đã đóng'}
                        </button>
                    ))}
                </div>

                <div className={styles.ticketList}>
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className={styles.ticketSkeleton}>
                                <div className={styles.skeletonLine} />
                                <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
                            </div>
                        ))
                    ) : filteredTickets.length === 0 ? (
                        <div className={styles.emptyState}>Không tìm thấy ticket nào</div>
                    ) : (
                        filteredTickets.map(ticket => (
                            <div
                                key={ticket.id}
                                className={`${styles.ticketItem} ${activeTicket?.id === ticket.id ? styles.ticketItemActive : ''}`}
                                onClick={() => handleSelectTicket(ticket)}
                            >
                                <div className={styles.ticketAvatar}>
                                    <Headphones size={18} />
                                </div>
                                <div className={styles.ticketInfo}>
                                    <div className={styles.ticketIdRow}>
                                        <span className={styles.ticketId}>#{ticket.id.slice(0, 8)}...</span>
                                        {unreadMap[ticket.id] > 0 && (
                                            <span className={styles.unreadBadge}>{unreadMap[ticket.id]}</span>
                                        )}
                                    </div>
                                    <div className={styles.ticketMeta}>
                                        <span className={`${styles.ticketStatus} ${styles[STATUS_BADGE[ticket.status].class]}`}>
                                            {ticket.status === 'open' ? '🟢' : '⚪'} {STATUS_BADGE[ticket.status].text}
                                        </span>
                                        <span className={styles.ticketDate}>
                                            {new Date(ticket.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Panel */}
            <div className={styles.rightPanel}>
                {!activeTicket ? (
                    <div className={styles.emptyChat}>
                        <div className={styles.emptyChatIcon}><Headphones size={40} /></div>
                        <h2>Trung tâm hỗ trợ</h2>
                        <p>Chọn một yêu cầu bên trái để bắt đầu hỗ trợ khách hàng theo thời gian thực.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatHeaderInfo}>
                                <div className={styles.chatHeaderAvatar}>T</div>
                                <div>
                                    <div className={styles.chatHeaderTitle}>Ticket #{activeTicket.id}</div>
                                    <div className={styles.chatHeaderSub}>Khởi tạo lúc {new Date(activeTicket.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                            <div className={styles.chatHeaderActions}>
                                {activeTicket.status === 'open' && (
                                    <button className={styles.closeTicketBtn} onClick={handleCloseTicket}>
                                        Đóng ticket
                                    </button>
                                )}
                                <button className={styles.clearBtn} onClick={() => setActiveTicket(null)}><X size={18} /></button>
                            </div>
                        </div>

                        <div className={styles.messagesArea}>
                            {loadingMsgs ? (
                                <div className={styles.loadingMsgs}>Đang tải tin nhắn...</div>
                            ) : messages.length === 0 ? (
                                <div className={styles.noMessages}>Chưa có tin nhắn nào. Hãy bắt đầu hỗ trợ khách hàng!</div>
                            ) : (
                                messages.map((msg, idx) => {
                                    // SO KHỚP CHÍNH XÁC ID
                                    const isMe = msg.sender_id === adminId || msg.sender_role === 'admin';
                                    return (
                                        <div key={msg.id || idx} className={`${styles.msgRow} ${isMe ? styles.msgRowRight : styles.msgRowLeft}`}>
                                            {!isMe && <div className={styles.msgAvatar}>U</div>}
                                            <div className={`${styles.msgBubble} ${isMe ? styles.msgBubbleAdmin : styles.msgBubbleUser}`}>
                                                <p>{msg.message}</p>
                                                <span className={styles.msgTime}>{formatTime(msg.created_at)}</span>
                                            </div>
                                            {isMe && <div className={`${styles.msgAvatar} ${styles.msgAvatarAdmin}`}>A</div>}
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className={styles.inputArea}>
                            {activeTicket.status === 'closed' ? (
                                <div className={styles.closedNotice}>Yêu cầu này đã được đóng</div>
                            ) : (
                                <>
                                    <textarea
                                        ref={inputRef}
                                        className={styles.chatInput}
                                        placeholder="Nhập tin nhắn hỗ trợ... (Enter để gửi, Shift+Enter xuống dòng)"
                                        value={inputText}
                                        onChange={e => setInputText(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend();
                                            }
                                        }}
                                    />
                                    <button className={styles.sendBtn} onClick={handleSend} disabled={!inputText.trim()}>
                                        <Send size={20} />
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SupportManagement;
