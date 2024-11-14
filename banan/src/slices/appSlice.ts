import { combineReducers } from 'redux';
import drawerReducer from './drawerSlice';

const appReducer = combineReducers({
  drawer: drawerReducer,
});

export default appReducer;
