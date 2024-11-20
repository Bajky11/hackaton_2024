'use client';

import React, { useState } from 'react';
import {
  Divider,
  Paper,
  Stack,
  Typography,
  Drawer as MuiDrawer,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import { drawer_width } from '@/constants';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerItem, selectDrawerItem } from '@/slices/app/parts/drawer';
import { RootState } from '@/store';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

const Drawer = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery('(max-width: 1800px)');
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { selectedItem, items: drawerItems } = useSelector(
    (state: RootState) => state.app.drawer,
  );

  const handleItemClick = (item: DrawerItem) => {
    dispatch(selectDrawerItem(item.name));
    if (isSmall) setIsOpen(false);
  };

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const DrawerContent = (
    <Stack
      bgcolor={'#1E1F22'}
      width={drawer_width}
      color={'white'}
      p={2}
      gap={1.5}
    >
      <Box>LOGO</Box>
      <Divider orientation={'horizontal'} color={'white'} />
      {drawerItems.map((item: DrawerItem, id: number) => {
        return (
          <Paper
            key={id}
            component={Link}
            href={item.path}
            elevation={2}
            onClick={() => handleItemClick(item)}
            sx={{
              p: 1,
              width: '75%',
              backgroundColor:
                selectedItem === item.name ? '#2C5DDA' : '#313030',
              textDecoration: 'none',
            }}
          >
            <Typography color={'white'} sx={{ textTransform: 'upperCase' }}>
              {item.name}
            </Typography>
          </Paper>
        );
      })}
    </Stack>
  );

  return (
    <>
      {isSmall && (
        <>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{
              position: 'fixed',
              top: 16,
              left: isOpen ? drawer_width + 16 : 16, // Dynamicky posun
              zIndex: 1300,
              transition: 'left 0.3s ease', // Plynulý přechod
            }}
          >
            <MenuIcon />
          </IconButton>
          <MuiDrawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawer_width,
                bgcolor: '#1E1F22',
              },
            }}
          >
            {DrawerContent}
          </MuiDrawer>
        </>
      )}
      {!isSmall && DrawerContent}
    </>
  );
};

export default Drawer;
