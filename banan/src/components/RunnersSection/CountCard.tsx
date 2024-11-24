import { useState } from 'react';
import { Stack } from '@mui/material';
import { LoadingTypography } from '@/components/LoadingTypography';
import { useTheme } from '@mui/material/styles';

export interface CountCardProps {
  label: string; // Text, který se zobrazí jako popis
  value: number | null; // Číselná hodnota nebo null (např. při nenahraných datech)
  color: string; // Barva textu nebo pozadí
  loading: boolean; // Indikuje, zda je obsah ve stavu načítání
  onClick?: () => void; // Volitelný handler pro kliknutí
}

function CountCard({ label, value, color, loading, onClick }: CountCardProps) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();

  const textColor = hovered ? 'black' : color;
  const bgColor =
    theme.palette.mode === 'light'
      ? hovered
        ? color
        : '#F6F6F6'
      : hovered
        ? color
        : '#111111';

  return (
    <Stack
      border={`0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`}
      borderRadius={1}
      alignItems="center"
      justifyContent="center"
      style={{
        padding: '8px',
        color: textColor,
        backgroundColor: bgColor,
        flex: 1,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Stack alignItems="center" justifyContent="center">
        <LoadingTypography
          loading={loading}
          text={label}
          variant="h6"
          fontWeight="bold"
        />
        <LoadingTypography
          loading={loading}
          text={value ?? 'N/A'}
          variant="h4"
          fontWeight="bold"
        />
      </Stack>
    </Stack>
  );
}

export default CountCard;
