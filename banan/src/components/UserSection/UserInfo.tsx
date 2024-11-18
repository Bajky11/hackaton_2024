import { Avatar, Stack, Typography } from '@mui/material';
import { User } from '@/slices/app/parts/auth';

function UserInfo({ user }: { user: User | null }) {
  return (
    <Stack direction={'row'} gap={1} alignItems={'center'}>
      <Stack>
        <Typography
          sx={{ textTransform: 'uppercase' }}
          fontWeight={'bold'}
          fontSize={18}
        >
          {user ? user.name : 'Hackaton'}
        </Typography>
        <Typography fontSize={12}>Admin</Typography>
      </Stack>
      <Avatar />
    </Stack>
  );
}

export default UserInfo;
