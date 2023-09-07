import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Track } from '@/types/tracks';

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Track[]>('http://localhost:3000/tracks');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('failed to get tracks');
  }
});
