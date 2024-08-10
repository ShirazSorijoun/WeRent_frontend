import React from 'react';

import { Step, StepLabel, Stepper } from '@mui/material';
import { IFormSteps } from '@/models';
import { FieldErrors } from 'react-hook-form';

interface IFormStepperProps {
  steps: IFormSteps;
  activeStep: number;
  setActiveStep: (step: number) => void;
  errors: FieldErrors<any>;
}

export const FormStepper: React.FC<IFormStepperProps> = ({
  activeStep,
  errors,
  setActiveStep,
  steps,
}) => {
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Stepper nonLinear activeStep={activeStep} sx={{ paddingY: '20px' }}>
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            error={!!errors[step.stepIdentifier]}
            onClick={handleStep(index)}
            optional={step.optionalText}
            sx={{ cursor: 'pointer' }}
            icon={step.icon ? <step.icon /> : undefined}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
