import { Avatar, Stack, Typography } from '@mui/material';
import { User } from '@/slices/app/parts/auth';
import useMediaQuery from '@mui/material/useMediaQuery';

function UserInfo({ user }: { user: User | null }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const userName = user ? user.name : 'Hackaton';
  const userEmail = user ? user.email : '';

  return (
    <Stack direction={'row'} gap={1} alignItems={'center'}>
      <Avatar>{userName[0]}</Avatar>
      {!isMobile && (
        <Stack>
          <Typography
            sx={{ textTransform: 'uppercase' }}
            fontWeight={'bold'}
            fontSize={18}
          >
            {userName}
          </Typography>
          <Typography fontSize={12}>{userEmail}</Typography>
        </Stack>
      )}
    </Stack>
  );
}

export default UserInfo;
