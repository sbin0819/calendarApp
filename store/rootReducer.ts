import { combineReducers } from '@reduxjs/toolkit';
import calendar from './calendar';

const rootReducer = combineReducers({
  calendar,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
