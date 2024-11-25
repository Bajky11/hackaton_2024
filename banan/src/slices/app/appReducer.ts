import { combineReducers } from 'redux';
import drawerReducer from './parts/drawer';
import authReducer from './parts/auth';
import runnerLogReducer from './parts/runnerLog';

const appReducer = combineReducers({
  auth: authReducer,
  drawer: drawerReducer,
  runnerLog: runnerLogReducer
});

export default appReducer;
