import { configureStore } from '@reduxjs/toolkit';
import reducerResultGame from './ResultGameSlice';

const store = configureStore({
  reducer: {
    resultGame: reducerResultGame,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
