import { Skeleton, Typography, TypographyProps } from '@mui/material';

export interface LoadingTypographyProps {
  loading: boolean;
  text?: string | number;
  variant?: TypographyProps['variant'];
  width?: number | string;
  height?: number | string;
  fontWeight?: string;
}

export function LoadingTypography({
  loading,
  text = '',
  variant = 'body1',
  width = 80,
  height = 24,
  fontWeight = 'normal',
}: LoadingTypographyProps) {
  return loading ? (
    <Skeleton variant="text" width={width} height={height} />
  ) : (
    <Typography variant={variant} fontWeight={fontWeight}>
      {text}
    </Typography>
  );
}
