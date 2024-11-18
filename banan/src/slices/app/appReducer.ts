import { combineReducers } from 'redux';
import drawerReducer from './parts/drawer';
import authReducer from './parts/auth';

const appReducer = combineReducers({
  auth: authReducer,
  drawer: drawerReducer,
});

export default appReducer;
