import apiClient from '../lib/api-client';

export const orderService = {
  getOrders: () => apiClient.get('/orders'),
  getOrderById: (id: string | number) => apiClient.get(`/orders/${id}`),
  createOrder: (data: any) => apiClient.post('/orders', data),
  updateOrder: (id: string | number, data: any) => apiClient.patch(`/orders/${id}`, data),
};
