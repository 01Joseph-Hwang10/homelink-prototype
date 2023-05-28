import { combineReducers } from '@reduxjs/toolkit';
import { UserSlice } from './slices/user.slice';

const reducer = combineReducers({
  [UserSlice.name]: UserSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
