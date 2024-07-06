import React, { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema, tenantQuestionnaireDefaultValues } from '../formUtils';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
} from '@mui/material';
import { FormTenantFormBody } from '../TenantFormBody';
import { postTeantForm } from '../../../api/modelsServices/form-service';

interface ITenantFormDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => void;
}

export const TenantFormDialog: React.FC<ITenantFormDialogProps> = ({
  isOpen,
  handleCancel,
  completeSave,
}) => {
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: tenantQuestionnaireDefaultValues,
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      reset(tenantQuestionnaireDefaultValues);
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
        await postTeantForm(formData); // Call your API function to save form data
        console.log('Form data saved:', formData);
        completeSave(); // Notify parent component about successful save
      } catch (err) {
        setError('Failed to save form data. Please try again.');
        console.error('Error saving form data:', error);
      } finally {
        setSubmitting(false);
      }
    },
    [completeSave],
  );

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Dialog open={isOpen} onClose={closeDialog} fullWidth>
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
          onClick={handleSubmit(onSubmit)}
          loading={submitting}
        >
          Save
        </LoadingButton>
      </DialogActions>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </Dialog>
  );
};

export default TenantFormDialog;
