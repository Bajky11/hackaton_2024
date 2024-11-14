import { createSlice } from '@reduxjs/toolkit';

export type DrawerItem = {
  name: string;
  path: string;
};

const drawerItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Automations', path: '/automations' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'Runners', path: '/runners' },
  { name: 'Metrics', path: '/metrics' },
];

const initialState = {
  selectedItem: drawerItems[0].name,
  items: drawerItems,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    selectDrawerItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { selectDrawerItem } = drawerSlice.actions;
export default drawerSlice.reducer;
