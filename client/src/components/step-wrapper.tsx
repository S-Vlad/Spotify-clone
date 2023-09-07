import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const StepWrapper: React.FC<Props> = ({ currentStep, children, stepsTitles }) => {
  return (
    <Container>
      <Stepper activeStep={currentStep}>
        {stepsTitles.map((step, index) => (
          <Step key={index} completed={currentStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent='center' style={{ margin: '64px 0', height: 270 }}>
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

type Props = {
  children: React.ReactNode;
  currentStep: number;
  stepsTitles: string[];
};

export default StepWrapper;
