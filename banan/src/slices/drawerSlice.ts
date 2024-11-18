import { createSlice } from '@reduxjs/toolkit';

export type DrawerItem = {
  name: string;
  path: string;
};

const drawerItems = [
  { name: 'Dashboard', path: '/app/dashboard' },
  { name: 'Sas', path: '/app/sas' },
  { name: 'Automations', path: '/app/automations' },
  { name: 'Metrics', path: '/app/metrics' },
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
