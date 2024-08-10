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
  leaseAgreementFormData,
} from '../formUtils';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
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
import { useLeaseAgreementForm } from './hooks/useCreateLeaseAgreementDialog';

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

  const { handleSave, handleWrongFormData, isButtonLoading } =
    useLeaseAgreementForm();

  const [activeStep, setActiveStep] = React.useState<number>(0);

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
    async (formData: leaseAgreementFormData) => {
      const isSaved = await handleSave(formData);
      if (isSaved) completeSave();
    },
    [completeSave, handleSave],
  );

  const handleCloseDialog = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
  };

  const FormDisplayBody = useMemo(() => StepToComp[activeStep], [activeStep]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit, handleWrongFormData),
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
          loading={isButtonLoading}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
