import { useQuery } from '@tanstack/react-query';
import apiClient from '../../lib/api-client';

export function useDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => apiClient.get('/admin/dashboard'),
  });
}
