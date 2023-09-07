'use client';

import { Card, IconButton, Grid } from '@mui/material';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

import { baseURL } from '@/constants/config';
import { useAppDispatch } from '@/hooks';
import { removeTrack } from '@/store/tracks/thunks/remove-track';
import { setActiveTrack } from '@/store/player/player-slice';
import { Track } from '@/types/tracks';

import styles from './styles.module.scss';

const TrackItem: React.FC<Props> = ({ isActive = false, data }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(setActiveTrack(data));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(removeTrack(data._id));
  };

  return (
    <Card className={styles.track} onClick={() => router.push(`/tracks/${data._id}`)}>
      <IconButton onClick={handlePlay}>{isActive ? <Pause /> : <PlayArrow />}</IconButton>

      <img src={`${baseURL}/${data.picture}`} alt='' width={70} height={70} />

      <Grid container direction='column' style={{ width: 200, margin: '0 16px' }}>
        <div>{data.title}</div>
        <div style={{ color: 'gray', fontSize: 12 }}>{data.artist}</div>
      </Grid>

      {isActive && <div>03:41 / 04:57</div>}

      <IconButton onClick={handleDelete} style={{ marginLeft: 'auto' }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

type Props = {
  isActive?: boolean;
  data: Track;
};

export default TrackItem;
