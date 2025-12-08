import api from './api';

export const serviceService = {
    async getAll() {
        const response = await api.get('/services');
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/services/${id}`);
        return response.data.data;
    },

    async create(data) {
        const response = await api.post('/services', data);
        return response.data;
    },

    async update(id, data) {
        const response = await api.put(`/services/${id}`, data);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/services/${id}`);
        return response.data;
    }
};
