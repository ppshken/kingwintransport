import api from './api';

export const partnerService = {
    async getAll(isActive = null) {
        let url = '/partners';
        if (isActive !== null) {
            url += `?is_active=${isActive}`;
        }
        const response = await api.get(url);
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/partners/${id}`);
        return response.data.data;
    },

    async create(data) {
        const response = await api.post('/partners', data);
        return response.data;
    },

    async update(id, data) {
        const response = await api.put(`/partners/${id}`, data);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/partners/${id}`);
        return response.data;
    }
};

