'use client';

import { Divider, Paper, Stack, Typography } from '@mui/material';
import { drawer_width } from '@/constants';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerItem, selectDrawerItem } from '@/slices/drawerSlice';
import { RootState } from '@/store';
import { Box } from '@mui/system';

const Drawer = () => {
  const dispatch = useDispatch();
  const { selectedItem, items: drawerItems } = useSelector(
    (state: RootState) => state.app.drawer,
  );

  const handleItemClick = (item: DrawerItem) => {
    dispatch(selectDrawerItem(item.name));
  };

  return (
    <Stack
      bgcolor={'#1E1F22'}
      width={drawer_width}
      color={'white'}
      p={2}
      gap={1.5}
    >
      <Box>LOGO</Box>
      <Divider orientation={'horizontal'} color={'white'} />
      {drawerItems.map((item: DrawerItem) => {
        return (
          <Link key={item.name} href={item.path} passHref>
            <Paper
              elevation={3}
              onClick={() => handleItemClick(item)}
              sx={{
                p: 1,
                backgroundColor:
                  selectedItem === item.name ? '#2C5DDA' : '#313030',
              }}
            >
              <Typography color={'white'}>{item.name}</Typography>
            </Paper>
          </Link>
        );
      })}
    </Stack>
  );
};

export default Drawer;

/**
 <Link key={item.name} href={item.path} passHref>
 <Button
 fullWidth
 sx={{ justifyContent: 'flex-start' }}
 variant={selectedItem === item.name ? 'contained' : 'text'}
 onClick={() => handleItemClick(item)}
 >
 {item.name}
 </Button>
 </Link>
 */
