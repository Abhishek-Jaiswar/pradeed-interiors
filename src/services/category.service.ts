import apiClient from '../lib/api-client';

export const categoryService = {
  getCategories: () => apiClient.get('/categories'),
  getCategoryById: (id: string | number) => apiClient.get(`/categories/${id}`),
  createCategory: (data: any) => apiClient.post('/categories', data),
  updateCategory: (id: string | number, data: any) => apiClient.patch(`/categories/${id}`, data),
  deleteCategory: (id: string | number) => apiClient.delete(`/categories/${id}`),
};
