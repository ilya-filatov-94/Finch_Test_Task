import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, boolean> = {
  isWon: false,
};

const resultGameSlice = createSlice({
  name: 'resultGame',
  initialState: initialState,
  reducers: {
    setResultGame(state, action: PayloadAction<boolean>) {
      state.isWon = action.payload;
    },
  },
});

export const { setResultGame } = resultGameSlice.actions;

export default resultGameSlice.reducer;
