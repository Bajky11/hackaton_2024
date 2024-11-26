import React, { useState, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  CircularProgress,
  ListItemText,
  ListItemSecondaryAction,
  IconButton as MuiIconButton,
  Divider,
} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useGetFailedAutomationListQuery } from '@/services/notifications';

function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [localNotifications, setLocalNotifications] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false); // Stav pro inicializaci dat

  const router = useRouter();

  const { data, isLoading, error } = useGetFailedAutomationListQuery();

  // Inicializace pouze při načtení dat
  useEffect(() => {
    if (!initialized && data?.items) {
      setLocalNotifications(data.items);
      setInitialized(true);
    }
  }, [data, initialized]);

  const notifications = localNotifications;
  const notificationCount = notifications.length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (link: string) => {
    router.push(link);
  };

  const handleDeleteNotification = (id: string) => {
    setLocalNotifications((prev) =>
      prev.filter((notification) => notification.unique_id !== id),
    );
  };

  // Vypočítání nejdelší zprávy pro přizpůsobení velikosti okna
  const longestMessage = notifications.reduce((max, notification) => {
    return notification.message.length > max.length
      ? notification.message
      : max;
  }, '');

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleClick}>
          <Badge
            badgeContent={notificationCount}
            color="error"
            overlap="circular"
          >
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="notif-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: `${longestMessage.length * 8}px`, // Dynamická šířka okna
          },
        }}
      >
        <Typography sx={{ px: 2, pt: 2, pb: 2 }} lineHeight={1} variant="subtitle1">
          Automations
        </Typography>
        <Divider />
        {isLoading && (
          <MenuItem>
            <CircularProgress size={24} />
          </MenuItem>
        )}
        {error && (
          <MenuItem>
            <Typography color="error">Failed to load notifications</Typography>
          </MenuItem>
        )}
        {!isLoading && notificationCount === 0 && (
          <MenuItem>
            <Typography>No new notifications</Typography>
          </MenuItem>
        )}
        {!isLoading &&
          notifications.map((notification) => (
            <MenuItem key={notification.unique_id}>
              <ListItemText
                sx={{ px: 1, py: 0.5 }}
                primary={notification.dataId}
                // <Typography color="error" style={{ wordWrap: 'break-word' }}>
                //   {notification.message}
                // </Typography>
                secondary={notification.state}
                onClick={() => handleNotificationClick(notification.link)}
              />
              <ListItemSecondaryAction>
                <MuiIconButton
                  edge="end"
                  aria-label="delete"
                  size='medium'
                  onClick={() =>
                    handleDeleteNotification(notification.unique_id)
                  }
                >
                  <DeleteIcon />
                </MuiIconButton>
              </ListItemSecondaryAction>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default NotificationsMenu;
