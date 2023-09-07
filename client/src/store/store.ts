import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import playerReducer from './player/player-slice';
import tracksReducer from './tracks/tracks-slice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    tracks: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
