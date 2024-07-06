import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema, tenantQuestionnaireDefaultValues } from '../formUtils';
import { LoadingButton } from '@mui/lab';
import { useTenantForm } from './hooks/useTenantForm';
import { FormTenantFormBody } from '../TenantFormBody';

interface ITenantFormDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => Promise<void>;
}

export const TenantFormDialog: React.FC<ITenantFormDialogProps> = ({
  handleCancel,
  completeSave,
  isOpen,
}) => {
  const { saveTenantForm, isButtonLoading } = useTenantForm();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: tenantQuestionnaireDefaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      reset(tenantQuestionnaireDefaultValues);
    }
  }, [isOpen, reset]);

  const closeDialog = useCallback(() => {
    reset();
    handleCancel();
  }, [handleCancel, reset]);

  const handleCloseDialog = () => {
    // Handle dialog close event
  };

  const onSubmit = useCallback(
    async (formData: any) => {
      const isSaved = await saveTenantForm(formData);
      if (isSaved) {
        completeSave();
      }
    },
    [completeSave, saveTenantForm],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
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
        <Button
          variant="contained"
          color="error"
          onClick={closeDialog}
          disabled={isButtonLoading}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={isButtonLoading}
          role="progressbar"
          variant="contained"
          color="success"
          type="submit"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
