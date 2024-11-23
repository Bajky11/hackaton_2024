import { format } from 'date-fns';

export const formatTimestamp = (timestamp: string): string => {
  try {
    return format(new Date(timestamp), 'HH:mm:ss dd.MM.yyyy'); // Např. 21/11/2024 10:30:00
  } catch {
    return 'Invalid Date';
  }
};
