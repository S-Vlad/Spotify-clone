import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

import { baseURL } from '@/constants/config';
import { COMMENT, TRACKS } from '@/constants/routes';
import { useAppSelector, useInput } from '@/hooks';
import MainLayout from '@/layouts/main-layout';
import { Comment, Track } from '@/types/tracks';

const getData = async () => {
  const response = await fetch(`${baseURL}${TRACKS}`);

  return response.json();
};

const TrackPage = async () => {
  const params = useParams();
  const router = useRouter();

  const tracks: Track[] = await getData();
  let track = tracks.find((track) => track._id === params.id);

  const usernameField = useInput('');
  const commentField = useInput('');

  const addComment = async () => {
    if (!track) {
      return null;
    }

    try {
      const params = {
        username: usernameField.value,
        text: commentField.value,
        trackId: track?._id,
      };
      const response = await axios.post(`${baseURL}${TRACKS}${COMMENT}`, params);
      track = { ...track, comments: [...track.comments, response.data] };
    } catch (e) {
      console.log(e);
    }
  };

  const renderTrack = () => {
    if (!track) {
      return null;
    }

    return (
      <>
        <Grid container style={{ margin: '16px 0' }}>
          <img src={`${baseURL}/${track.picture}`} alt='' style={{ width: 200, height: 200 }} />

          <div style={{ marginLeft: 32 }}>
            <h1>Title - {track.title}</h1>
            <h2>Artist - {track.artist}</h2>
            <h3>listens - {track.listens}</h3>
          </div>
        </Grid>

        <h3>Lyrics</h3>
        <p>{track.lyrics}</p>

        <h2>Comments</h2>
        <Grid container>
          <TextField label='Your name' fullWidth {...usernameField} />
          <TextField label='Your message' fullWidth multiline rows={4} {...commentField} />
          <Button onClick={addComment}>Send</Button>
        </Grid>

        <div>
          {track.comments.map((item) => {
            return (
              <div key={item._id}>
                <div>Author - {item?.username}</div>
                <div>Comment - {item?.text}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <MainLayout>
      <Button onClick={router.back} style={{ fontSize: 24 }} variant='outlined'>
        Back
      </Button>

      {renderTrack()}
    </MainLayout>
  );
};

export default TrackPage;
