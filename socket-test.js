/**
 * socket-test.html
 * Mở file này trong browser (bằng Dev Server proxy hoặc trực tiếp)
 * để test nhanh 4 cách auth Socket.IO khác nhau mà không cần React.
 *
 * Cách dùng:
 *   1. Mở browser, vào localhost:5173
 *   2. Đăng nhập → mở Console
 *   3. Dán toàn bộ nội dung script bên dưới vào Console rồi Enter
 */

// ====================================================
// PASTE PHẦN NÀY VÀO BROWSER CONSOLE SAU KHI ĐĂNG NHẬP
// ====================================================

(async () => {
    const TOKEN = localStorage.getItem('accessToken');
    const URL = 'https://c9t.tanhuynh.me';

    if (!TOKEN) { console.error('❌ Chưa đăng nhập!'); return; }
    console.log('🔑 Token:', TOKEN.slice(0, 40) + '...');

    // Dynamically load socket.io-client nếu chưa có
    let io = window.io;
    if (!io) {
        await new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.socket.io/4.8.0/socket.io.min.js';
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
        });
        io = window.io;
    }

    const METHODS = [
        {
            label: 'Method 1: auth.token (raw)',
            opts: { auth: { token: TOKEN }, transports: ['polling', 'websocket'] }
        },
        {
            label: 'Method 2: auth.token (Bearer prefix)',
            opts: { auth: { token: `Bearer ${TOKEN}` }, transports: ['polling', 'websocket'] }
        },
        {
            label: 'Method 3: query.token (raw)',
            opts: { query: { token: TOKEN }, transports: ['polling', 'websocket'] }
        },
        {
            label: 'Method 4: extraHeaders Authorization (polling only)',
            opts: {
                extraHeaders: { Authorization: `Bearer ${TOKEN}` },
                transports: ['polling'],    // extraHeaders CHỈ hoạt động với polling
            }
        },
        {
            label: 'Method 5: No auth (server dùng cookie?)',
            opts: { transports: ['polling', 'websocket'], withCredentials: true }
        },
    ];

    for (const method of METHODS) {
        await new Promise(resolve => {
            console.log(`\n🧪 Testing: ${method.label}`);
            const socket = io(URL, { ...method.opts, forceNew: true, timeout: 5000, reconnection: false });

            const timer = setTimeout(() => {
                console.log(`⏱️  ${method.label} → TIMEOUT`);
                socket.disconnect();
                resolve();
            }, 5000);

            socket.on('connect', () => {
                console.log(`✅ ${method.label} → CONNECTED! id=${socket.id}`);
                // Test joinTicket
                socket.emit('joinTicket', { ticket_id: 'test' });
                setTimeout(() => { socket.disconnect(); clearTimeout(timer); resolve(); }, 1000);
            });

            socket.on('disconnect', (reason) => {
                console.log(`❌ ${method.label} → DISCONNECTED: ${reason}`);
                clearTimeout(timer);
                resolve();
            });

            socket.on('connect_error', (err) => {
                console.log(`🚫 ${method.label} → ERROR: ${err.message}`);
                clearTimeout(timer);
                socket.disconnect();
                resolve();
            });
        });
    }

    console.log('\n✨ Test hoàn thành! Xem kết quả ✅ CONNECTED bên trên.');
})();
