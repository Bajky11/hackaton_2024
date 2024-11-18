import { Stack } from '@mui/material';
import NotificationsMenu from '@/components/UserSection/NotificationMenu';
import UserInfo from '@/components/UserSection/UserInfo';
import UserMenu from '@/components/UserSection/UserMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

function UserSection() {
  const user = useSelector((state: RootState) => state.app.auth.user);

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <NotificationsMenu />
      <UserInfo user={user} />
      <UserMenu />
    </Stack>
  );
}

export default UserSection;
