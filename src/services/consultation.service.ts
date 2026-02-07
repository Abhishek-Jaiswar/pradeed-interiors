import apiClient from '../lib/api-client';

export const consultationService = {
  getConsultations: () => apiClient.get('/consultations'),
  getConsultationById: (id: string | number) => apiClient.get(`/consultations/${id}`),
  createConsultation: (data: any) => apiClient.post('/consultations', data),
  updateConsultation: (id: string | number, data: any) => apiClient.patch(`/consultations/${id}`, data),
  deleteConsultation: (id: string | number) => apiClient.delete(`/consultations/${id}`),
};
