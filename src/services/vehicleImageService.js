import api from './api';

export const vehicleImageService = {
    async getAll(vehicleTypeId = null, category = null) {
        let url = '/vehicle-images?';
        const params = [];

        if (vehicleTypeId) params.push(`vehicle_type_id=${vehicleTypeId}`);
        if (category) params.push(`category=${category}`);

        url += params.join('&');

        const response = await api.get(url);
        return response.data.data;
    },

    async getById(id) {
        const response = await api.get(`/vehicle-images/${id}`);
        return response.data.data;
    },

    async upload(formData) {
        const response = await api.post('/vehicle-images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    async update(id, data) {
        const response = await api.put(`/vehicle-images/${id}`, data);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/vehicle-images/${id}`);
        return response.data;
    }
};
