import api from './api';

export const vehicleTypeService = {
    async getAll() {
        const response = await api.get('/vehicle-types');
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/vehicle-types/${id}`);
        return response.data.data;
    },

    async create(data) {
        const response = await api.post('/vehicle-types', data);
        return response.data;
    },

    async update(id, data) {
        const response = await api.put(`/vehicle-types/${id}`, data);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/vehicle-types/${id}`);
        return response.data;
    }
};
