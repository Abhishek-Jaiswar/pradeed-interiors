import apiClient from '../lib/api-client';

export const calculatorService = {
  calculate: (data: any) => apiClient.post('/calculator', data),
};
