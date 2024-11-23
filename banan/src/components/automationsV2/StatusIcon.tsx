import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';

interface StatusIconProps {
  status: string;
}

function StatusIcon({ status }: StatusIconProps) {
  const [color, setColor] = useState('blue');

  useEffect(() => {
    switch (status.toLowerCase()) {
      case 'info':
        setColor('#5C86D1');
        break;
      case 'warning':
        setColor('orange');
        break;
      case 'error':
        setColor('#BE3B2B');
        break;
      case 'success':
        setColor('#4BA43A');
        break;
      default:
        setColor('grey');
        break;
    }
  }, [status]);

  function renderIconAccordingToStatus() {
    switch (status.toLowerCase()) {
      case 'info':
        return <InfoOutlinedIcon sx={{ color: 'white' }} />;
      case 'warning':
        return <WarningAmberRoundedIcon />;
      case 'error':
        return <CloseRoundedIcon sx={{ color: 'white' }} />;
      case 'success':
        return <CheckRoundedIcon sx={{ color: 'white' }} />;
      default:
        return null; // Bez ikony, pokud stav není známý
    }
  }

  return (
    <Stack
      sx={{
        backgroundColor: color,
        height: 30,
        width: 30,
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
