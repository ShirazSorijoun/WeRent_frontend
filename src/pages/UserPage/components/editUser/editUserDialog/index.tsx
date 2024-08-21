import { IUserData } from '@/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EditUserFormData, schema } from '../formUtils';
import { EditUserFormBody } from '../editUserFormBody';
import { useEditUser } from './hooks/useEditUser';

interface IEditUserDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  userData: IUserData;
  completeSave: () => void;
}

export const EditUserDialog: React.FC<IEditUserDialogProps> = ({
  handleCancel,
  isOpen,
  userData,
  completeSave,
}) => {
  const { handleSubmit, control, setError, reset } = useForm<EditUserFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => reset(userData), [userData]);
  const { handleSave, handleWrongFormData, isButtonLoading } =
    useEditUser(setError);

  const handleCloseDialog = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
  };

  const onSubmit = useCallback(
    async (formData: EditUserFormData) => {
      const isSaved = await handleSave(formData);
      if (isSaved) completeSave();
    },
    [completeSave, handleSave],
  );

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
      <DialogTitle
        sx={{
          direction: 'rtl',
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.175)',
          paddingBottom: '5px',
          marginBottom: '10px',
        }}
      >
        עריכת פרטים אישיים
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <EditUserFormBody control={control} />
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
