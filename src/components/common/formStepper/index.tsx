import React, { useCallback, useMemo } from 'react';

import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { IFormSteps } from '@/models';
import { FieldErrors } from 'react-hook-form';

interface IFormStepperProps {
  steps: IFormSteps;
  activeStep: number;
  setActiveStep: (step: number) => void;
  errors: FieldErrors<any>;
  children: React.ReactNode;
}

export const FormStepper: React.FC<IFormStepperProps> = ({
  activeStep,
  errors,
  setActiveStep,
  steps,
  children,
}) => {
  const handleStep = useCallback(
    (step: number) => () => {
      setActiveStep(step);
    },
    [setActiveStep],
  );

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep, setActiveStep]);

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const stepsDisplay = useMemo(
    () =>
      steps.map((step, index) => (
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
      )),
    [errors, handleStep, steps],
  );

  return (
    <>
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ paddingY: '20px' }}
        children={stepsDisplay}
      />
      {children}
      <Stack direction="row" justifyContent="space-between">
        <Button
          color="inherit"
          variant="contained"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          הקודם
        </Button>
        {activeStep != steps.length - 1 && (
          <Button variant="contained" onClick={handleNext}>
            הבא
          </Button>
        )}
      </Stack>
    </>
  );
};
