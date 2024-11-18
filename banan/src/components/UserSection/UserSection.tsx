import { Stack } from '@mui/material';
import NotificationsMenu from '@/components/UserSection/NotificationMenu';
import UserInfo from '@/components/UserSection/UserInfo';
import UserMenu from '@/components/UserSection/UserMenu';

function UserSection() {
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <NotificationsMenu />
      <UserInfo />
      <UserMenu />
    </Stack>
  );
}

export default UserSection;
