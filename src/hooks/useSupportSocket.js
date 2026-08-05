import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || 'https://c9t.tanhuynh.me';

export default function useSupportSocket({
    ticketId,
    onNewMessage,
    onChatHistory,
    onNewNotification,
    enabled = true,
}) {
    const socketRef = useRef(null);
    const joinedTicketRef = useRef(null);
    const pendingJoinRef = useRef(null);


    const cbNewMessage = useRef(onNewMessage);
    const cbChatHistory = useRef(onChatHistory);
    const cbNewNotification = useRef(onNewNotification);
    useEffect(() => { cbNewMessage.current = onNewMessage; }, [onNewMessage]);
    useEffect(() => { cbChatHistory.current = onChatHistory; }, [onChatHistory]);
    useEffect(() => { cbNewNotification.current = onNewNotification; }, [onNewNotification]);


    useEffect(() => {
        if (!enabled) return;
        if (socketRef.current) return;

        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('[Socket] ❌ Không tìm thấy accessToken!');
            return;
        }

        console.log('[Socket] Gửi Authorization Header với token:', token.substring(0, 15) + '...');


        const socket = io(SOCKET_URL, {
            extraHeaders: {
                Authorization: `Bearer ${token}`
            },
            transports: ['polling'], 
            reconnection: true,
            reconnectionAttempts: 10,
            forceNew: true
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('[Socket] ✅ Kết nối thành công bằng POLLING (Header Auth)! ID:', socket.id);
            const tid = pendingJoinRef.current || joinedTicketRef.current;
            if (tid) {
                console.log('[Socket] Joining room:', tid);
                socket.emit('joinTicket', { ticket_id: tid });
                pendingJoinRef.current = null;
            }
        });

        socket.on('disconnect', (reason) => {
            console.warn('[Socket] ❌ Bị ngắt kết nối:', reason);
            if (reason === 'io server disconnect') {
                console.error('[Socket] Server từ chối token. Hãy kiểm tra lại cách BE lấy token từ handshake.auth');
            }
        });

        socket.on('connect_error', (err) => {
            console.error('[Socket] Lỗi kết nối:', err.message);
        });

        socket.on('chatHistory', (data) => {
            console.log('[Socket] chatHistory →', data);
            cbChatHistory.current?.(data);
        });

        socket.on('newMessage', (msg) => {
            console.log('[Socket] newMessage →', msg);
            cbNewMessage.current?.(msg);
        });

        socket.on('new_notification', (notif) => {
            console.log('[Socket] new_notification →', notif);
            cbNewNotification.current?.(notif);
        });

        return () => {
            console.log('[Socket] Cleanup – disconnecting');
            socket.disconnect();
            socketRef.current = null;
            joinedTicketRef.current = null;
            pendingJoinRef.current = null;
        };
        
    }, [enabled]);


    useEffect(() => {
        if (!ticketId) return;
        joinedTicketRef.current = ticketId;

        if (socketRef.current?.connected) {
            console.log('[Socket] joinTicket (effect):', ticketId);
            socketRef.current.emit('joinTicket', { ticket_id: ticketId });
        } else {
            console.log('[Socket] Queuing joinTicket:', ticketId);
            pendingJoinRef.current = ticketId;
        }
    }, [ticketId]);


    const joinTicket = useCallback((tid) => {
        joinedTicketRef.current = tid;
        if (socketRef.current?.connected) {
            console.log('[Socket] joinTicket (manual):', tid);
            socketRef.current.emit('joinTicket', { ticket_id: tid });
        } else {
            console.log('[Socket] Socket not connected – queuing joinTicket:', tid);
            pendingJoinRef.current = tid;
        }
    }, []);


    const sendMessage = useCallback((tid, message) => {
        const socket = socketRef.current;
        if (!socket) {
            console.error('[Socket] Socket not initialized');
            return false;
        }
        if (!socket.connected) {
            console.error('[Socket] Not connected. disconnected =', socket.disconnected);
            socket.connect();
            return false;
        }
        console.log('[Socket] sendMessage →', { ticket_id: tid, message });
        socket.emit('sendMessage', { ticket_id: tid, message });
        return true;
    }, []);

    return { sendMessage, joinTicket };
}
