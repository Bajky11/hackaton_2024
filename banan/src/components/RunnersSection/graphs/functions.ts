export const getBackgroundColor = (theme) =>
  theme.palette.mode === 'light' ? '#F6F6F6' : '#111111';

export const getBorderColor = (theme) =>
  `0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`;

export const getTextColor = (theme) =>
  theme.palette.mode === 'light' ? 'black' : 'white';
