import { Button, Stack } from '@mui/material';
import { drawer_width } from '@/constants';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { DrawerItem, selectDrawerItem } from '@/slices/drawerSlice';
import { RootState } from '@/store';

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
      p={1}
      gap={1}
    >
      {drawerItems.map((item: DrawerItem) => {
        return (
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
        );
      })}
    </Stack>
  );
};

export default Drawer;
