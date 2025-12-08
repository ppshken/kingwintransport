import api from './api';

export const contactService = {
    async getAll(status = null) {
        let url = '/contacts';
        if (status) {
            url += `?status=${status}`;
        }
        const response = await api.get(url);
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/contacts/${id}`);
        return response.data.data;
    },

    async create(data) {
        const response = await api.post('/contacts', data);
        return response.data;
    },

    async updateStatus(id, status) {
        const response = await api.put(`/contacts/${id}/status`, { status });
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/contacts/${id}`);
        return response.data;
    }
};
