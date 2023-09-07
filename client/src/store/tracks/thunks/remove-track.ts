import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Track } from '@/types/tracks';

import { fetchTracks } from './fetch-tracks';
import { TRACKS } from '@/constants/routes';

export const removeTrack = createAsyncThunk('tracks/removeTrack', async (id: Track['_id'], thunkAPI) => {
  try {
    await axios.delete<Track[]>(`http://localhost:3000${TRACKS}/${id}`);
    thunkAPI.dispatch(fetchTracks());
  } catch (e) {
    return thunkAPI.rejectWithValue('failed to get tracks');
  }
});
