import { Stack, Typography } from '@mui/material';
import { header_height } from '@/constants';
import SortIcon from '@mui/icons-material/Sort';
import React from 'react';
import UserSection from '@/components/UserSection/UserSection';

const Header = () => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'flex-start'}
      height={header_height}
    >
      <Stack direction={'row'} alignItems={'center'} gap={1}></Stack>
      <UserSection />
    </Stack>
  );
};

export default Header;
