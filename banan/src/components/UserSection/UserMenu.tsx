import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/app/parts/auth';
import { useRouter } from 'next/navigation';

function UserMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    router.push('/');
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <KeyboardArrowDownOutlinedIcon />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} gap={1}>
            <PermIdentityOutlinedIcon />
            <Typography>Profile</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} gap={1}>
            <SettingsOutlinedIcon />
            <Typography>Settings</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <Stack direction={'row'} gap={1}>
            <LogoutOutlinedIcon />
            <Typography>Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
