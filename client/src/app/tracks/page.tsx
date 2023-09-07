'use client';

import { Box, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import TrackList from '@/components/track-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import MainLayout from '@/layouts/main-layout';
import { fetchTracks } from '@/store/tracks/thunks/fetch-tracks';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { error, tracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Grid container justifyContent='center'>
        <Card style={{ width: 900 }}>
          <Box p={2}>
            <Grid container justifyContent='space-between'>
              <h1>Track list</h1>
              <Button onClick={() => router.push('/tracks/create')}>Upload</Button>
            </Grid>

            <TrackList tracks={tracks} />
          </Box>
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;
