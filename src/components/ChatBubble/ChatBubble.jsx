import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    MessageCircle, X, Send, Plus, ChevronDown,
    Loader, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { createTicket, getMyTickets, getTicketMessages } from '../../services/supportService';
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

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Current user ID
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isLoggedIn = !!localStorage.getItem('accessToken');

    // ---- Socket.IO ----
    const { sendMessage, joinTicket } = useSupportSocket({
        ticketId: activeTicket?.id ?? null,
        enabled: isLoggedIn,   // giữ socket kết nối kể cả khi đóng bong bóng
        onChatHistory: (data) => {
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            setMessages(arr);
            setLoadingMsgs(false);
        },
        onNewMessage: (msg) => {
            // Nếu là tin nhắn của ticket đang mở
            if (msg.ticket_id === activeTicket?.id) {
                setMessages(prev => {
                    if (prev.find(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
            } else if (!open) {
                // Bong bóng đóng → tăng unread
                setUnreadCount(prev => prev + 1);
            }
        },
        onNewNotification: () => { /* có thể hiển thị gì đó nếu muốn */ },
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

        // Join room → server sẽ emit chatHistory qua socket
        joinTicket(ticket.id);

        // Thử load qua REST API, nếu 404 thì chờ chatHistory từ socket
        try {
            const data = await getTicketMessages(ticket.id);
            const arr = Array.isArray(data) ? data : (data?.messages || []);
            if (arr.length > 0) {
                setMessages(arr);
                setLoadingMsgs(false);
            }
            // Nếu arr rỗng, chờ chatHistory từ socket (server sẽ emit)
        } catch {
            // API không hỗ trợ endpoint này → chờ chatHistory từ socket
            console.info('[ChatBubble] getTicketMessages not available, using socket chatHistory');
        }
        // loadingMsgs sẽ được set false bởi onChatHistory hoặc sau timeout
        setTimeout(() => setLoadingMsgs(false), 3000);

        setTimeout(() => inputRef.current?.focus(), 150);
    };

    // ---- Tạo ticket mới ----
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

    // ---- Gửi tin nhắn ----
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

    // ---- Không đăng nhập → không hiển thị ----
    if (!isLoggedIn) return null;

    return (
        <div className={styles.wrapper}>
            {/* Chat Window */}
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
                            {/* New ticket button */}
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
                                    Tạo yêu cầu hỗ trợ mới
                                </button>
                            </div>

                            <div className={styles.listLabel}>Yêu cầu hỗ trợ của tôi</div>

                            {loadingTickets ? (
                                <div className={styles.centerLoader}>
                                    <Loader size={22} className={styles.spinning} style={{ color: '#7c1a1a' }} />
                                </div>
                            ) : tickets.length === 0 ? (
                                <div className={styles.emptyTickets}>
                                    <AlertCircle size={28} strokeWidth={1.2} />
                                    <p>Chưa có yêu cầu hỗ trợ nào.<br />Nhấn nút trên để tạo mới.</p>
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
                                                    <span className={styles.ticketCardDate}>
                                                        <Clock size={10} />
                                                        {new Date(ticket.created_at).toLocaleDateString('vi-VN')}
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
                            {/* Messages */}
                            <div className={styles.messagesArea}>
                                {loadingMsgs ? (
                                    <div className={styles.centerLoader}>
                                        <Loader size={22} className={styles.spinning} style={{ color: '#7c1a1a' }} />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className={styles.noMsgs}>
                                        <CheckCircle size={24} strokeWidth={1.2} style={{ color: '#d1d5db' }} />
                                        <p>Chưa có tin nhắn.<br />Hãy gửi yêu cầu của bạn!</p>
                                    </div>
                                ) : (
                                    <>
                                        {messages.map((msg, idx) => {
                                            // Lấy ID người dùng hiện tại
                                            const myId = currentUser.id || currentUser._id;
                                            // So khớp chính xác ID để biết ai gửi
                                            const isMe = msg.sender_id === myId;

                                            return (
                                                <div
                                                    key={msg.id || idx}
                                                    className={`${styles.msgRow} ${isMe ? styles.msgRowMe : styles.msgRowOther}`}
                                                >
                                                    {!isMe && (
                                                        <div className={styles.adminAvatar}>
                                                            {msg.sender_role === 'admin' ? 'A' : 'U'}
                                                        </div>
                                                    )}
                                                    <div className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleOther}`}>
                                                        <p>{msg.message}</p>
                                                        <span className={styles.bubbleTime}>{formatTime(msg.created_at)}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>

                            {/* Input */}
                            <div className={styles.inputArea}>
                                {activeTicket?.status === 'closed' ? (
                                    <div className={styles.closedNotice}>
                                        Ticket này đã đóng
                                    </div>
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

            {/* FAB */}
            <button
                className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
                onClick={() => setOpen(prev => !prev)}
                aria-label="Mở hỗ trợ khách hàng"
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
                {!open && unreadCount > 0 && (
                    <span className={styles.fabBadge}>{unreadCount}</span>
                )}
            </button>
        </div>
    );
};

export default ChatBubble;
