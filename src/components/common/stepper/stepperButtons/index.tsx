import React from 'react';

import { Box, Button } from '@mui/material';

interface IStepperButtonsProps {
  activeStep: number;
  numOfSteps: number;
  setActiveStep: (step: number) => void;
}
export const StepperButtons: React.FC<IStepperButtonsProps> = ({
  activeStep,
  numOfSteps,
  setActiveStep,
}) => {
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        הקודם
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      {activeStep != numOfSteps - 1 && (
        <Button onClick={handleNext} sx={{ mr: 1 }}>
          הבא
        </Button>
      )}
    </Box>
  );
};
