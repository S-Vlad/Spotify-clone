import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Track } from '@/types/tracks';

type PlayerState = {
  activeTrack: null | Track;
  duration: number;
  progress: number;
  isPaused: boolean;
  volume: number;
};

const initialState: PlayerState = {
  activeTrack: null,
  duration: 0,
  progress: 0,
  isPaused: true,
  volume: 90,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveTrack: (state, action: PayloadAction<Track | null>) => {
      state.activeTrack = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { setActiveTrack, setDuration, setIsPaused, setProgress, setVolume } = playerSlice.actions;
export default playerSlice.reducer;
