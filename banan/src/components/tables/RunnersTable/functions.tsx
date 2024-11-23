export const getChipColor = (state: string): string => {
  switch (state) {
    case 'active':
      return '#4BA43A';
    case 'idle':
      return '#499AF2';
    case 'offline':
      return 'gray';
    case 'failed':
      return '#BE3B2B';
    default:
      return 'gray';
  }
};
