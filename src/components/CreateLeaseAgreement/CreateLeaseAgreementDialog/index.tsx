import React, { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  schema,
  FIFTH_STEP_NAME,
  FIRST_STEP_NAME,
  FORTH_STEP_NAME,
  SECOND_STEP_NAME,
  THIRD_STEP_NAME,
  leaseAgreementFormData,
  buildLeaseDataForForm,
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

import { FormStepper } from '@@/common/formStepper';
import { useLeaseAgreementForm } from './hooks/useCreateLeaseAgreementDialog';
import { LeaseAgreementFormBody } from '../CreateLeaseAgreementFormBody';
import { ILeaseAgreementForm } from '@/models/leaseAgreement';

interface ILeaseAgreementFormDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => void;
  tenantId: string;
  apartmentId: string;
  lease?: ILeaseAgreementForm;
}

const steps: IFormSteps = [
  { label: '1', stepIdentifier: FIRST_STEP_NAME },
  { label: '2', stepIdentifier: SECOND_STEP_NAME },
  { label: '3', stepIdentifier: THIRD_STEP_NAME },
  { label: '4', stepIdentifier: FORTH_STEP_NAME },
  { label: '5', stepIdentifier: FIFTH_STEP_NAME },
];

export const LeaseAgreementFormDialog: React.FC<
  ILeaseAgreementFormDialogProps
> = ({ handleCancel, completeSave, apartmentId, tenantId, lease }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: buildLeaseDataForForm(lease),
    reValidateMode: 'onChange',
  });

  const { handleSave, handleWrongFormData, isButtonLoading } =
    useLeaseAgreementForm();

  const [activeStep, setActiveStep] = useState<number>(0);

  const onSubmit = useCallback(
    async (formData: leaseAgreementFormData) => {
      const isSaved = await handleSave(
        formData,
        tenantId,
        apartmentId,
        lease?._id,
      );
      if (isSaved) completeSave();
    },
    [apartmentId, completeSave, handleSave, lease?._id, tenantId],
  );

  const handleCloseDialog = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
  };

  return (
    <Dialog
      open={true}
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
        >
          <LeaseAgreementFormBody
            activeStep={activeStep}
            apartmentId={apartmentId}
            control={control}
            tenantId={tenantId}
          />
        </FormStepper>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleCancel}>
          בטל
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          color="success"
          loading={isButtonLoading}
        >
          שמור
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
