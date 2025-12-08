import api from './api';

export const customerService = {
    async getAll(isActive = null) {
        let url = '/customers';
        if (isActive !== null) {
            url += `?is_active=${isActive}`;
        }
        const response = await api.get(url);
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/customers/${id}`);
        return response.data.data;
    },

    async create(data) {
        const response = await api.post('/customers', data);
        return response.data;
    },

    async update(id, data) {
        const response = await api.put(`/customers/${id}`, data);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/customers/${id}`);
        return response.data;
    }
};
