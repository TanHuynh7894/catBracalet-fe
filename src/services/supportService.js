import api from './api';

const BASE = '/support-tickets';

// --- USER ---
export const createTicket = () => api.post(BASE).then(r => r.data);
export const getMyTickets = () => api.get(`${BASE}/my-tickets`).then(r => r.data);
export const getTicketMessages = (ticketId) =>
    api.get(`${BASE}/${ticketId}/messages`).then(r => r.data);

// --- ADMIN ---
export const getAllTickets = () => api.get(BASE).then(r => r.data);
export const closeTicket = async (id) => {
    const response = await api.patch(`/support-tickets/${id}/search`, { status: 'closed' });
    return response.data;
};

export const getUserById = async (id) => {
    // Đã đổi thành /user/${id} theo userService.js
    const response = await api.get(`/user/${id}`);
    return response.data;
};
export const deleteTicket = (ticketId) =>
    api.delete(`${BASE}/${ticketId}`).then(r => r.data);
