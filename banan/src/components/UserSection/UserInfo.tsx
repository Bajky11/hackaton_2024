import { Avatar, Stack, Typography } from '@mui/material';
import { User } from '@/slices/app/parts/auth';
import useMediaQuery from '@mui/material/useMediaQuery';

function UserInfo({ user }: { user: User | null }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const userName = user ? user.name : 'Hackaton';
  const userEmail = user ? user.email : '';

  return (
    <Stack direction={'row'} gap={2} alignItems={'center'}>

      {!isMobile && (
        <Stack alignItems={'flex-end'}>
          <Typography
            sx={{ textTransform: 'uppercase' }}
            fontWeight={'bold'}
            fontSize={18}
          >
            {userName}
          </Typography>
          <Typography lineHeight={1} fontSize={12}>{userEmail}</Typography>
        </Stack>
      )}
      <Avatar>{userName[0]}</Avatar>
    </Stack>
  );
}

export default UserInfo;
