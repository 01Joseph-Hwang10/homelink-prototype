import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientSchema, ResidentSchema, UserRole } from '../../model';

interface State {
  user?: ClientSchema | ResidentSchema;
  currentMode: UserRole;
}

const initialState: Partial<State> = {
  currentMode: UserRole.Client,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ClientSchema | ResidentSchema>) => {
      state.user = action.payload;
    },
    setMode: (state, action: PayloadAction<UserRole>) => {
      state.currentMode = action.payload;
    },
  },
});

export const { setUser, setMode } = UserSlice.actions;

export default UserSlice.reducer;
