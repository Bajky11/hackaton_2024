import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Typography,
} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/app/app/context/NotificationsContext';

const NotificationsMenu = () => {
  const { notifications, removeNotification } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleOpen}>
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MenuItem
              key={`error-${notification.id}-${index}`}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: 'red',
                  flex: 1,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push(`/app/automations/${notification.data_id}`);
                  handleClose(); // Zavře menu po kliknutí na text
                }}
              >
                {notification.message}
              </Typography>
              <IconButton
                size="small"
                onClick={() => removeNotification(notification.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography>Žádné nové notifikace</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationsMenu;
