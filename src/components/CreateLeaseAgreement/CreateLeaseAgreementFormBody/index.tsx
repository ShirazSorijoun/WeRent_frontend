import React from 'react';
import {
  CreateLeaseAgreementFormPage1,
  CreateLeaseAgreementFormPage2,
  CreateLeaseAgreementFormPage3,
  CreateLeaseAgreementFormPage4,
  CreateLeaseAgreementFormPage5,
} from './formPages';
import { Box, Button, Step, StepButton, Stepper } from '@mui/material';
import { ControlProps } from '@/models/form';

const steps = ['1', '2', '3', '4', '5'];
const StepToComp: React.FC<ControlProps>[] = [
  CreateLeaseAgreementFormPage1,
  CreateLeaseAgreementFormPage2,
  CreateLeaseAgreementFormPage3,
  CreateLeaseAgreementFormPage4,
  CreateLeaseAgreementFormPage5,
];

export const FormLeaseAgreementFormBody: React.FC<ControlProps> = ({
  control,
}) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const Comp = StepToComp[activeStep];
  return (
    <>
      <section>
        <h2>חוזה שכירות בלתי מוגנת</h2>
        <p>שנערך ונחתם ביום</p>
      </section>

      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Comp control={control} />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep != steps.length - 1 && (
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
        )}
      </Box>
    </>
  );
};
