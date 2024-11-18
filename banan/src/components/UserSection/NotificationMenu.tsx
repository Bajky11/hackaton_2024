import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import React from 'react';

function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleClick}>
          <NotificationsOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="notif-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Typography>No new notifications</Typography>
        </MenuItem>
        {/* Další notifikace lze přidat zde */}
      </Menu>
    </>
  );
}

export default NotificationsMenu;
