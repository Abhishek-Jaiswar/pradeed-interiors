import apiClient from '../lib/api-client';

export const productService = {
  getProducts: (params?: any) => apiClient.get('/products', { params }),
  getProductById: (id: string | number) => apiClient.get(`/products/${id}`),
  createProduct: (data: any) => apiClient.post('/products', data),
  updateProduct: (id: string | number, data: any) => apiClient.patch(`/products/${id}`, data),
  deleteProduct: (id: string | number) => apiClient.delete(`/products/${id}`),
};
