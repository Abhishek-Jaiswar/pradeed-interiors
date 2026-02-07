import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { consultationService } from '../../services/consultation.service';

export function useConsultations() {
  return useQuery({
    queryKey: ['consultations'],
    queryFn: consultationService.getConsultations,
  });
}

export function useConsultation(id: string) {
  return useQuery({
    queryKey: ['consultations', id],
    queryFn: () => consultationService.getConsultationById(id),
    enabled: !!id,
  });
}

export function useConsultationMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: consultationService.createConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      consultationService.updateConsultation(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
      queryClient.invalidateQueries({ queryKey: ['consultations', variables.id] });
    },
  });

  return {
    createConsultation: createMutation,
    updateConsultation: updateMutation,
  };
}
