import React from 'react';

import { Step, StepButton, Stepper } from '@mui/material';
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

  const getStepColor = (index: number, stepIdentifier: string): string => {
    if (index === activeStep) return 'primary';

    if (errors[stepIdentifier]) return 'error';

    return 'inherit';
  };

  return (
    <>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton
              color={getStepColor(index, step.stepIdentifier)}
              onClick={handleStep(index)}
              optional={step.optionalText}
              icon={step.icon ? <step.icon /> : undefined}
            >
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </>
  );
};
