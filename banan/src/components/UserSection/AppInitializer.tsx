'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from '@/slices/app/parts/auth';

export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        dispatch(setUser(user));
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
  }, [dispatch]);

  return null;
}
