import React, { useEffect, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  schema,
  initialTenantQuestionnaireDefaultValues,
  InitialTenantQuestionnaireFormData,
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
import { postTenantForm } from '../../../api/modelsServices/tenant-form-service';
import { toast } from 'react-toastify';

interface ITenantFormDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: (data: InitialTenantQuestionnaireFormData) => void;
  initialData?: InitialTenantQuestionnaireFormData | null;
}

export const TenantFormDialog: React.FC<ITenantFormDialogProps> = ({
  isOpen,
  handleCancel,
  completeSave,
  initialData,
}) => {
  const { handleSubmit, control, reset } =
    useForm<InitialTenantQuestionnaireFormData>({
      resolver: zodResolver(schema),
      defaultValues: initialTenantQuestionnaireDefaultValues,
    });

  const [submitting, setSubmitting] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      reset(initialData || initialTenantQuestionnaireDefaultValues);
    }
  }, [isOpen, reset, initialData]);

  const closeDialog = useCallback(() => {
    handleCancel();
  }, [handleCancel]);

  const onSubmit = useCallback(
    async (formData: InitialTenantQuestionnaireFormData) => {
      setSubmitting(true);
      try {
        await postTenantForm(formData); // Call your API function to save form data
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
      <DialogTitle>Tenant Form</DialogTitle>
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
