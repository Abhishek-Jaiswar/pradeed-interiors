import { useMutation } from '@tanstack/react-query';
import { calculatorService } from '../../services/calculator.service';

export function useCalculator() {
  return useMutation({
    mutationFn: calculatorService.calculate,
  });
}
