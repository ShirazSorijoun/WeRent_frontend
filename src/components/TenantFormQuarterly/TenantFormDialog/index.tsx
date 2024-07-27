import React, { useEffect, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  schema,
  quarterlyTenantQuestionnaireDefaultValues,
  QuarterlyTenantQuestionnaireFormData,
} from '../formUtils';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { FormTenantFormBody } from '../TenantFormBody';
import { api } from '@/api';
import { toast } from 'react-toastify';

interface ITenantFormDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: (data: QuarterlyTenantQuestionnaireFormData) => void;
  initialData?: QuarterlyTenantQuestionnaireFormData | null;
}

export const QuarterlyTenantFormDialog: React.FC<ITenantFormDialogProps> = ({
  isOpen,
  handleCancel,
  completeSave,
  initialData,
}) => {
  const { handleSubmit, control, reset } =
    useForm<QuarterlyTenantQuestionnaireFormData>({
      resolver: zodResolver(schema),
      defaultValues: quarterlyTenantQuestionnaireDefaultValues,
    });

  const [submitting, setSubmitting] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      reset(initialData || quarterlyTenantQuestionnaireDefaultValues);
    }
  }, [isOpen, reset, initialData]);

  const closeDialog = useCallback(() => {
    handleCancel();
  }, [handleCancel]);

  const onSubmit = useCallback(
    async (formData: QuarterlyTenantQuestionnaireFormData) => {
      setSubmitting(true);
      try {
        await api.tenantForm.postTeantFormQuarterly(formData); // Call your API function to save form data
        console.log('Form data saved:', formData);
        completeSave(formData); // Notify parent component about successful save
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
      <DialogTitle>Quarterly Tenant Form</DialogTitle>
      <DialogContent>
        <FormTenantFormBody control={control} />
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
