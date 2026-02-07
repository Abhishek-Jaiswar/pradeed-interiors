import apiClient from '../lib/api-client';

export const portfolioService = {
  getProjects: (params?: any) => apiClient.get('/portfolio', { params }),
  getProjectById: (id: string | number) => apiClient.get(`/portfolio/${id}`),
  createProject: (data: any) => apiClient.post('/portfolio', data),
  updateProject: (id: string | number, data: any) => apiClient.patch(`/portfolio/${id}`, data),
  deleteProject: (id: string | number) => apiClient.delete(`/portfolio/${id}`),
};
