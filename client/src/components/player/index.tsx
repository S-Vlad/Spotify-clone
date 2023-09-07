'use client';

import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { baseURL } from '@/constants/config';
import { useAppSelector } from '@/hooks';
import { setDuration, setIsPaused, setProgress, setVolume } from '@/store/player/player-slice';

import TrackProgress from '../track-progress';

import styles from './styles.module.scss';

let audio: HTMLAudioElement | undefined;

const Player: React.FC = () => {
  const dispatch = useDispatch();

  const { activeTrack, duration, isPaused, progress, volume } = useAppSelector((state) => state.player);

  const handlePlay = () => {
    dispatch(setIsPaused(!isPaused));
    isPaused ? audio?.play() : audio?.pause();
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      handlePlay();
    }
  }, [activeTrack, volume]);

  const setAudio = () => {
    if (activeTrack && audio) {
      audio.src = `${baseURL}/${activeTrack.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => dispatch(setDuration((audio as HTMLAudioElement).duration));
      audio.ontimeupdate = () => dispatch(setProgress((audio as HTMLAudioElement).currentTime));
    }
  };

  if (!activeTrack) {
    return null;
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    dispatch(setProgress(value));

    if (audio) {
      audio.currentTime = value;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    dispatch(setVolume(value));

    if (audio) {
      audio.volume = value / 100;
    }
  };

  return (
    <div className={styles.player}>
      <IconButton onClick={(e) => handlePlay()}>{isPaused ? <PlayArrow /> : <Pause />}</IconButton>

      <Grid container direction='column' style={{ width: 200, margin: '0 16px' }}>
        <div>{activeTrack.title}</div>
        <div style={{ color: 'gray', fontSize: 12 }}>{activeTrack.artist}</div>
      </Grid>
      <TrackProgress progress={progress} maxProgress={duration} onChange={handleProgressChange} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress progress={volume} maxProgress={100} onChange={handleVolumeChange} />
    </div>
  );
};

export default Player;
