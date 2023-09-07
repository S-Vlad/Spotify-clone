import { Track } from '@/types/tracks';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchTracks } from './thunks/fetch-tracks';

type TracksState = {
  error: string;
  isLoading: boolean;
  tracks: Track[];
};

const initialState: TracksState = {
  error: '',
  isLoading: false,
  tracks: [],
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
  },
  extraReducers: {
    [fetchTracks.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTracks.fulfilled.type]: (state, action: PayloadAction<Track[]>) => {
      state.isLoading = false;
      state.tracks = action.payload;
    },
    [fetchTracks.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setError, setTracks } = tracksSlice.actions;
export default tracksSlice.reducer;
