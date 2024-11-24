import { createSlice } from '@reduxjs/toolkit';

export type DrawerItem = {
  name: string;
  path: string;
};

const drawerItems: DrawerItem[] = [
  { name: 'Dashboard', path: '/app/dashboard' },
  { name: 'Sas', path: '/app/sas' },
  { name: 'Automations', path: '/app/automations' },
  { name: 'Runners', path: '/app/runners' },
  { name: 'Metrics', path: '/app/metrics' },
  { name: 'Automation2', path: '/app/automations' },
];

const initialState = {
  selectedItem: drawerItems[0].name,
  items: drawerItems,
};

const drawer = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    selectDrawerItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { selectDrawerItem } = drawer.actions;
export default drawer.reducer;
