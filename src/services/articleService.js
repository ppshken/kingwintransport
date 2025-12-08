import api from './api';

export const articleService = {
    async getAll(page = 1, limit = 10, isFeatured = null) {
        let url = `/articles?page=${page}&limit=${limit}`;
        if (isFeatured !== null) {
            url += `&is_featured=${isFeatured}`;
        }
        const response = await api.get(url);
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/articles/${id}`);
        return response.data.data;
    },

    async getBySlug(slug) {
        const response = await api.get(`/articles/slug/${slug}`);
        return response.data.data;
    },

    async create(data) {
        const response = await api.post('/articles', data);
        return response.data;
    },

    async update(id, data) {
        const response = await api.put(`/articles/${id}`, data);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/articles/${id}`);
        return response.data;
    }
};
