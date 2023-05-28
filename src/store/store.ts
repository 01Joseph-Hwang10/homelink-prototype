import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import EnhancedReducer, { RootState } from './reducer';

export const store = configureStore({
  reducer: EnhancedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
