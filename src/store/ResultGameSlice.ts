import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, boolean> = {
  hasResult: false,
};

const resultGameSlice = createSlice({
  name: 'resultGame',
  initialState: initialState,
  reducers: {
    setResultGame(state, action: PayloadAction<boolean>) {
      state.hasResult = action.payload;
    },
  },
});

export const { setResultGame } = resultGameSlice.actions;

export default resultGameSlice.reducer;
