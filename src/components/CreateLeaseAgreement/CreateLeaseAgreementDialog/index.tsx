import React, { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema, leaseAgreementDefaultValues } from '../formUtils';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { FormLeaseAgreementFormBody } from '../CreateLeaseAgreementFormBody';
import { postLeaseAgreementForm } from '../../../api/modelsServices/leaseAgreement-service';
import { toast } from 'react-toastify';

interface ILeaseAgreementFormDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => void;
}

export const LeaseAgreementFormDialog: React.FC<ILeaseAgreementFormDialogProps> = ({
  isOpen,
  handleCancel,
  completeSave,
}) => {
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: leaseAgreementDefaultValues,
  });

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
      <DialogTitle>Lease Agreement Form</DialogTitle>
      <DialogContent>
        <FormLeaseAgreementFormBody control={control} />
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
