import { Avatar, Stack, Typography } from '@mui/material';

function UserInfo() {
  return (
    <Stack direction={'row'} gap={1} alignItems={'center'}>
      <Stack>
        <Typography
          sx={{ textTransform: 'uppercase' }}
          fontWeight={'bold'}
          fontSize={18}
        >
          LARRY
        </Typography>
        <Typography fontSize={12}>Admin</Typography>
      </Stack>
      <Avatar />
    </Stack>
  );
}

export default UserInfo;
