import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/material';
import React from 'react';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/app/parts/auth';
import { useRouter } from 'next/navigation';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Cookies from 'js-cookie';

function UserMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setMode, colorScheme } = useColorScheme();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookies.remove('user');
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
        <MenuItem
          onClick={() => {
            setMode(colorScheme === 'dark' ? 'light' : 'dark');
            handleClose();
          }}
        >
          <Stack direction={'row'} spacing={2} alignItems="center">
            {colorScheme === 'dark' ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeIcon />
            )}
            <Typography>
              {colorScheme === 'dark' ? 'Dark mode' : 'Light mode'}
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} spacing={2}>
            <PermIdentityOutlinedIcon />
            <Typography>Profile</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} spacing={2}>
            <SettingsOutlinedIcon />
            <Typography>Settings</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <Stack direction={'row'} spacing={2}>
            <LogoutOutlinedIcon />
            <Typography>Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
