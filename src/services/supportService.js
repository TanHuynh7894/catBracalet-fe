import api from './api';

const BASE = '/support-tickets';

// --- USER ---
export const createTicket = () => api.post(BASE).then(r => r.data);
export const getMyTickets = () => api.get(`${BASE}/my-tickets`).then(r => r.data);
export const getTicketMessages = (ticketId) =>
    api.get(`${BASE}/${ticketId}/messages`).then(r => r.data);

// --- ADMIN ---
export const getAllTickets = () => api.get(BASE).then(r => r.data);
export const closeTicket = (ticketId) =>
    api.patch(`${BASE}/${ticketId}/close`).then(r => r.data);
export const deleteTicket = (ticketId) =>
    api.delete(`${BASE}/${ticketId}`).then(r => r.data);
