import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Stack } from '@mui/material';
import { getStateColor } from '@/services/automation';

interface StatusIconProps {
  status: string;
  size?: number; // Volitelná velikost ikony a kontejneru
}

function StatusIcon({ status, size = 30 }: StatusIconProps) {
  function renderIconAccordingToStatus() {
    const commonStyles = { fontSize: size * 0.6 }; // Ikona zabírá 60 % velikosti kontejneru
    switch (status.toLowerCase()) {
      case 'info':
        return <InfoOutlinedIcon sx={commonStyles} />;
      case 'warning':
        return <WarningAmberRoundedIcon sx={commonStyles} />;
      case 'error':
        return <CloseRoundedIcon sx={commonStyles} />;
      case 'success':
        return <CheckRoundedIcon sx={commonStyles} />;
      default:
        return null; // Bez ikony, pokud stav není známý
    }
  }

  return (
    <Stack
      sx={{
        backgroundColor: getStateColor(status),
        height: size,
        width: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {renderIconAccordingToStatus()}
    </Stack>
  );
}

export default StatusIcon;
