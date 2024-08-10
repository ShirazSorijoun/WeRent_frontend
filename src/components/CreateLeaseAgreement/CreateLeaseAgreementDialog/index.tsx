import React, { useCallback, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  schema,
  leaseAgreementDefaultValues,
  FIFTH_STEP_NAME,
  FIRST_STEP_NAME,
  FORTH_STEP_NAME,
  SECOND_STEP_NAME,
  THIRD_STEP_NAME,
} from '../formUtils';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { postLeaseAgreementForm } from '../../../api/modelsServices/leaseAgreement-service';
import { toast } from 'react-toastify';
import { IFormSteps } from '@/models';
import { ControlProps } from '@/models/form';
import {
  CreateLeaseAgreementFormPage1,
  CreateLeaseAgreementFormPage2,
  CreateLeaseAgreementFormPage3,
  CreateLeaseAgreementFormPage4,
  CreateLeaseAgreementFormPage5,
} from '../formPages';
import { FormStepper, StepperButtons } from '@@/common/stepper';

interface ILeaseAgreementFormDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => void;
}

const steps: IFormSteps = [
  { label: '1', stepIdentifier: FIRST_STEP_NAME },
  { label: '2', stepIdentifier: SECOND_STEP_NAME },
  { label: '3', stepIdentifier: THIRD_STEP_NAME },
  { label: '4', stepIdentifier: FORTH_STEP_NAME },
  { label: '5', stepIdentifier: FIFTH_STEP_NAME },
];

const StepToComp: React.FC<ControlProps>[] = [
  CreateLeaseAgreementFormPage1,
  CreateLeaseAgreementFormPage2,
  CreateLeaseAgreementFormPage3,
  CreateLeaseAgreementFormPage4,
  CreateLeaseAgreementFormPage5,
];

export const LeaseAgreementFormDialog: React.FC<
  ILeaseAgreementFormDialogProps
> = ({ isOpen, handleCancel, completeSave }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: leaseAgreementDefaultValues,
  });

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [submitting, setSubmitting] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      reset(leaseAgreementDefaultValues);
    }
  }, [isOpen, reset]);

  const closeDialog = useCallback(() => {
    reset();
    handleCancel();
  }, [handleCancel, reset]);

  const onSubmit = useCallback(
    async (formData: any) => {
      setSubmitting(true);
      try {
        await postLeaseAgreementForm(formData); // Call your API function to save form data
        console.log('Form data saved:', formData);
        completeSave(); // Notify parent component about successful save
      } catch (err) {
        toast.error('Failed to save form data. Please try again.');
        console.error('Error saving form data:', err);
      } finally {
        setSubmitting(false);
      }
    },
    [completeSave],
  );

  const FormDisplayBody = useMemo(() => StepToComp[activeStep], [activeStep]);

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>חוזה שכירות בלתי מוגנת</DialogTitle>
      <DialogContent>
        <FormStepper
          activeStep={activeStep}
          errors={errors}
          setActiveStep={setActiveStep}
          steps={steps}
        />
        <FormDisplayBody control={control} />
        <StepperButtons
          activeStep={activeStep}
          numOfSteps={steps.length}
          setActiveStep={setActiveStep}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={closeDialog}>
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          color="success"
          loading={submitting}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
