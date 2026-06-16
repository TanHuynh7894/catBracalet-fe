import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    MessageCircle, X, Send, Plus, ChevronDown,
    Loader, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { createTicket, getMyTickets, getTicketMessages, getUserById } from '../../services/supportService';
import useSupportSocket from '../../hooks/useSupportSocket';
import styles from './ChatBubble.module.css';

const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const STATUS_LABEL = {
    open: { text: 'Đang mở', color: '#16a34a' },
    closed: { text: 'Đã đóng', color: '#9ca3af' },
};

const ChatBubble = () => {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState('list'); // 'list' | 'chat'
    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(false);
    const [activeTicket, setActiveTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMsgs, setLoadingMsgs] = useState(false);
    const [inputText, setInputText] = useState('');
    const [creating, setCreating] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userCache, setUserCache] = useState({});

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Current user ID
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const myId = currentUser.id || currentUser._id;
    const isLoggedIn = !!localStorage.getItem('accessToken');

    // Hàm lấy tên từ ID
    const fetchUserName = useCallback(async (uid) => {
        if (!uid || userCache[uid]) return;
        try {
            const response = await getUserById(uid);
            const userData = response.data || response;
            const userInfo = {
                name: userData.fullName || userData.full_name || userData.username || (uid === myId ? 'Bạn' : 'Người dùng'),
                avatar: userData.avatar || null
            };
            setUserCache(prev => ({ ...prev, [uid]: userInfo }));
        } catch {
            setUserCache(prev => ({ ...prev, [uid]: { name: uid === myId ? 'Bạn' : 'Người dùng', avatar: null } }));
        }
    }, [userCache, myId]);

    // ---- Socket.IO ----
    const { sendMessage, joinTicket } = useSupportSocket({
        ticketId: activeTicket?.id ?? null,
        enabled: isLoggedIn,
        onChatHistory: (data) => {
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            setMessages(arr);
            setLoadingMsgs(false);
            // Lấy tên tất cả người gửi
            arr.forEach(m => fetchUserName(m.sender_id));
        },
        onNewMessage: (msg) => {
            if (msg.ticket_id === activeTicket?.id) {
                setMessages(prev => {
                    if (prev.find(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
                fetchUserName(msg.sender_id);
            } else if (!open) {
                setUnreadCount(prev => prev + 1);
            }
        },
    });

    // ---- Auto scroll ----
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // ---- Fetch my tickets khi mở ----
    const fetchTickets = useCallback(async () => {
        if (!isLoggedIn) return;
        setLoadingTickets(true);
        try {
            const data = await getMyTickets();
            setTickets(data || []);
        } catch { /* silent */ } finally {
            setLoadingTickets(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (open) {
            setUnreadCount(0);
            fetchTickets();
        }
    }, [open, fetchTickets]);

    // ---- Mở ticket ----
    const handleOpenTicket = async (ticket) => {
        setActiveTicket(ticket);
        setMessages([]);
        setLoadingMsgs(true);
        setView('chat');
        joinTicket(ticket.id);

        try {
            const data = await getTicketMessages(ticket.id);
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            if (arr.length > 0) {
                setMessages(arr);
                setLoadingMsgs(false);
                arr.forEach(m => fetchUserName(m.sender_id));
            }
        } catch {
            console.info('[ChatBubble] using socket chatHistory');
        }
        setTimeout(() => setLoadingMsgs(false), 3000);
        setTimeout(() => inputRef.current?.focus(), 150);
    };

    const handleCreateTicket = async () => {
        setCreating(true);
        try {
            const ticket = await createTicket();
            setTickets(prev => [ticket, ...prev]);
            await handleOpenTicket(ticket);
        } catch { /* silent */ } finally {
            setCreating(false);
        }
    };

    const handleSend = () => {
        const text = inputText.trim();
        if (!text || !activeTicket) return;
        sendMessage(activeTicket.id, text);
        setInputText('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isLoggedIn) return null;

    return (
        <div className={styles.wrapper}>
            {open && (
                <div className={styles.window}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            {view === 'chat' && (
                                <button
                                    className={styles.backBtn}
                                    onClick={() => { setView('list'); setActiveTicket(null); setMessages([]); fetchTickets(); }}
                                >
                                    <ChevronDown size={16} style={{ transform: 'rotate(90deg)' }} />
                                </button>
                            )}
                            <div className={styles.headerIcon}>
                                <MessageCircle size={18} />
                            </div>
                            <div>
                                <div className={styles.headerTitle}>
                                    {view === 'chat'
                                        ? `Ticket #${activeTicket?.id?.slice(0, 8)}…`
                                        : 'Hỗ trợ khách hàng'
                                    }
                                </div>
                                <div className={styles.headerSub}>
                                    {view === 'chat'
                                        ? (
                                            <span style={{ color: STATUS_LABEL[activeTicket?.status]?.color }}>
                                                ● {STATUS_LABEL[activeTicket?.status]?.text}
                                            </span>
                                        )
                                        : 'Đội ngũ hỗ trợ 24/7'
                                    }
                                </div>
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    {view === 'list' ? (
                        <div className={styles.listView}>
                            <div className={styles.newTicketSection}>
                                <button
                                    className={styles.newTicketBtn}
                                    onClick={handleCreateTicket}
                                    disabled={creating}
                                >
                                    {creating
                                        ? <Loader size={16} className={styles.spinning} />
                                        : <Plus size={16} />
                                    }
                                    Tạo yêu cầu mới
                                </button>
                            </div>

                            <div className={styles.listLabel}>Yêu cầu của tôi</div>

                            {loadingTickets ? (
                                <div className={styles.centerLoader}>
                                    <Loader size={22} className={styles.spinning} style={{ color: '#7c1a1a' }} />
                                </div>
                            ) : tickets.length === 0 ? (
                                <div className={styles.emptyTickets}>
                                    <AlertCircle size={28} strokeWidth={1.2} />
                                    <p>Chưa có yêu cầu nào.</p>
                                </div>
                            ) : (
                                <div className={styles.ticketsList}>
                                    {tickets.map(ticket => (
                                        <div
                                            key={ticket.id}
                                            className={styles.ticketCard}
                                            onClick={() => handleOpenTicket(ticket)}
                                        >
                                            <div className={styles.ticketCardIcon}>
                                                <MessageCircle size={16} />
                                            </div>
                                            <div className={styles.ticketCardInfo}>
                                                <div className={styles.ticketCardId}>
                                                    #{ticket.id.slice(0, 12)}…
                                                </div>
                                                <div className={styles.ticketCardMeta}>
                                                    <span style={{ color: STATUS_LABEL[ticket.status]?.color, fontWeight: 600 }}>
                                                        {STATUS_LABEL[ticket.status]?.text}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronDown size={14} style={{ transform: 'rotate(-90deg)', color: '#d1d5db' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className={styles.messagesArea}>
                                {loadingMsgs ? (
                                    <div className={styles.centerLoader}>
                                        <Loader size={22} className={styles.spinning} style={{ color: '#7c1a1a' }} />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className={styles.noMsgs}>
                                        <p>Chưa có tin nhắn.</p>
                                    </div>
                                ) : (
                                    <>
                                        {messages.map((msg, idx) => {
                                            const isMe = msg.sender_id === myId;
                                            const senderInfo = userCache[msg.sender_id] || { name: msg.sender_role === 'admin' ? 'Hỗ trợ' : 'Khách' };

                                            return (
                                                <div
                                                    key={msg.id || idx}
                                                    className={`${styles.msgRow} ${isMe ? styles.msgRowMe : styles.msgRowOther}`}
                                                >
                                                    <div className={styles.nameAndBubble}>
                                                        <span className={isMe ? styles.senderNameMe : styles.senderNameOther}>
                                                            {senderInfo.name}
                                                        </span>
                                                        <div className={styles.bubbleRow}>
                                                            {!isMe && (
                                                                <div className={styles.adminAvatar}>
                                                                    {senderInfo.avatar ? (
                                                                        <img
                                                                            src={senderInfo.avatar}
                                                                            className={styles.avatarImg}
                                                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                                        />
                                                                    ) : null}
                                                                    <span className={styles.avatarFallback} style={{ display: senderInfo.avatar ? 'none' : 'flex' }}>
                                                                        {senderInfo.name?.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleOther}`}>
                                                                <p className={styles.msgText}>{msg.message}</p>
                                                                <span className={styles.bubbleTime}>{formatTime(msg.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>

                            <div className={styles.inputArea}>
                                {activeTicket?.status === 'closed' ? (
                                    <div className={styles.closedNotice}>Ticket đã đóng</div>
                                ) : (
                                    <>
                                        <textarea
                                            ref={inputRef}
                                            value={inputText}
                                            onChange={e => setInputText(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Nhập tin nhắn..."
                                            className={styles.chatInput}
                                            rows={2}
                                        />
                                        <button
                                            className={styles.sendBtn}
                                            onClick={handleSend}
                                            disabled={!inputText.trim()}
                                        >
                                            <Send size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            <button
                className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
                onClick={() => setOpen(prev => !prev)}
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
                {!open && unreadCount > 0 && <span className={styles.fabBadge}>{unreadCount}</span>}
            </button>
        </div>
    );
};

export default ChatBubble;
