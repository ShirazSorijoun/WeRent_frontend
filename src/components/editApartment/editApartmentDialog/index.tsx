/* eslint-disable @typescript-eslint/ban-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import React, { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { EditApartmentFormData, schema, defaultFormValues } from '../formUtils';
import { EditApartmentFormBody } from '../EditApartmentFormBody';
import { LoadingButton } from '@mui/lab';

interface IEditApartmentDialogProps {
  isOpen: boolean;
  handleSave: Function;
  handleCancel: () => void;
}

export const EditApartmentDialog: React.FC<IEditApartmentDialogProps> = ({
  handleCancel,
  handleSave,
  isOpen,
}) => {
  const { handleSubmit, control, reset } = useForm<EditApartmentFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const handleClose = useCallback(() => {
    reset();
    handleCancel();
  }, [isOpen, reset]);

  const onSubmit = useCallback(
    async (form: FieldValues): Promise<void> => {
      handleClose();
    },
    [handleClose],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Edit Apartment</DialogTitle>
      <DialogContent>
        <EditApartmentFormBody control={control} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={handleClose}
          // disabled={isButtonLoading}
        >
          בטל
        </Button>
        <LoadingButton
          // loading={isButtonLoading}
          role="progressbar"
          variant="contained"
          color="success"
          type="submit"
        >
          <span>save</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
