import { Avatar, Stack, Typography } from '@mui/material';

function UserInfo() {
  return (
    <Stack direction={'row'} spacing={1}>
      <Stack>
        <Typography
          sx={{ textTransform: 'uppercase' }}
          fontWeight={'bold'}
          fontSize={20}
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
