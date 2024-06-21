/* eslint-disable @typescript-eslint/ban-types */
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
import { EditApartmentFormData, schema, defaultFormValues } from '../formUtils';
import { EditApartmentFormBody } from '../editApartmentFormBody';
import { LoadingButton } from '@mui/lab';
import { useEditApartment } from './hooks/useEditApartmentDialog';

interface IEditApartmentDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => Promise<void>;
}

export const EditApartmentDialog: React.FC<IEditApartmentDialogProps> = ({
  handleCancel,
  completeSave,
  isOpen,
}) => {
  const {
    getApartmentForForm,
    handleSave,
    handleWrongFormData,
    isButtonLoading,
  } = useEditApartment();

  const { handleSubmit, control, reset } = useForm<EditApartmentFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    const func = async () => {
      if (isOpen) {
        const apartmentForForm = await getApartmentForForm();
        reset(apartmentForForm);
      }
    };

    func();
  }, [getApartmentForForm, isOpen, reset]);

  const handleClose = useCallback(() => {
    reset();
    handleCancel();
  }, [handleCancel, reset]);

  const onSubmit = useCallback(
    async (form: EditApartmentFormData): Promise<void> => {
      const isSaved = await handleSave(form);
      if (isSaved) completeSave();
    },
    [completeSave, handleSave],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit, handleWrongFormData),
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
          disabled={isButtonLoading}
        >
          cancel
        </Button>
        <LoadingButton
          loading={isButtonLoading}
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
