'use client';

import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { baseURL } from '@/constants/config';
import { TRACKS } from '@/constants/routes';
import FileUpload from '@/components/file-upload';
import StepWrapper from '@/components/step-wrapper';
import { useInput } from '@/hooks';
import MainLayout from '@/layouts/main-layout';

export const stepsTitles = ['Track information', 'Upload picture', 'Upload track'];

const Tracks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [audio, setAudio] = useState<File>();
  const [picture, setPicture] = useState<File>();

  const titleField = useInput('');
  const artistField = useInput('');
  const lyricsField = useInput('');

  const router = useRouter();

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const formData = new FormData();

      formData.append('title', titleField.value);
      formData.append('artist', artistField.value);
      formData.append('lyrics', lyricsField.value);
      formData.append('audio', audio as File);
      formData.append('picture', picture as File);

      axios
        .post(`${baseURL}${TRACKS}`, formData)
        .then(() => {
          router.push(TRACKS);
        })
        .catch(console.log);
    }
  };

  return (
    <MainLayout>
      <StepWrapper currentStep={currentStep} stepsTitles={stepsTitles}>
        {currentStep === 0 && (
          <Grid container direction='column' style={{ padding: 16 }}>
            <TextField label='Track title' style={{ marginTop: 8 }} {...titleField} />
            <TextField label='Artist title' style={{ marginTop: 8 }} {...artistField} />
            <TextField label='Lyrics' multiline rows={3} style={{ marginTop: 8 }} {...lyricsField} />
          </Grid>
        )}

        {currentStep === 1 && (
          <FileUpload setFile={setPicture} acceptExtentions='image/*'>
            <Button>{stepsTitles[1]}</Button>
          </FileUpload>
        )}

        {currentStep === 2 && (
          <FileUpload setFile={setAudio} acceptExtentions='audio/*'>
            <Button>{stepsTitles[2]}</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button disabled={currentStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;
