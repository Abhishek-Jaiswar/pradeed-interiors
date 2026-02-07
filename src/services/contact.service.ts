import apiClient from '../lib/api-client';

export const contactService = {
  submitForm: (data: any) => apiClient.post('/contact', data),
};
