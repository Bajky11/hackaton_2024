import { createSlice } from '@reduxjs/toolkit';

export type DrawerItem = {
  name: string;
  path: string;
};

const drawerItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Sas', path: '/sas' },
  { name: 'Automations', path: '/automations' },
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
