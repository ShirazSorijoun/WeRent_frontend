/* eslint-disable @typescript-eslint/ban-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { EBasicFieldType, IFormField } from '@/models';
import { z } from 'zod';
import { BasicFieldController } from '@@/common/formFields';
import { api } from '@/api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/hooks';
import { updateUser } from '@/stores/user';

const oldPassFieldName = 'oldPass';
const newPassFieldName = 'newPass';

const requireErrorText = 'סיסמה חייבת להיות לפחות באורך של 6 תווים';

const oldPassFormField: IFormField = {
  fieldName: oldPassFieldName,
  label: 'סיסמה ישנה',
  requireError: requireErrorText,
};
const newPassFormField: IFormField = {
  fieldName: newPassFieldName,
  label: 'סיסמה חדשה',
  requireError: requireErrorText,
};

const schema = z.object({
  [oldPassFieldName]: z
    .string({ required_error: oldPassFormField.requireError })
    .min(6, oldPassFormField.requireError),
  [newPassFieldName]: z
    .string({ required_error: newPassFormField.requireError })
    .min(6, newPassFormField.requireError),
});

type schemaType = z.infer<typeof schema>;

export const ChangePassword: React.FC = () => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset, setError } = useForm<schemaType>({
    resolver: zodResolver(schema),
    resetOptions: {
      keepDirtyValues: false,
      keepErrors: true,
    },
  });

  const closeLogic = useCallback(() => {
    reset();
    setIsOpen(false);
  }, [reset]);

  const handleSave = useCallback(
    async (formData: schemaType): Promise<void> => {
      setIsButtonLoading(true);
      try {
        const newPassHash = await api.user.updateUserPass(
          formData[oldPassFieldName],
          formData[newPassFieldName],
        );

        if (newPassHash) {
          dispatch(updateUser({ password: newPassHash }));

          toast.success('הסיסמה הוחלפה בהצלחה!');
          console.log('הסיסמה הוחלפה בהצלחה!');
        } else {
          setError(oldPassFieldName, {
            type: 'manual',
            message: 'הסיסמה אינה נכונה',
          });
        }
      } catch (error) {
        console.error('Error saving review:', error);
        toast.error('הייתה שגיאה בשמירת הסיסמה החדשה');
      } finally {
        setIsButtonLoading(false);
      }
    },
    [dispatch, setError],
  );

  const handleCloseDialog = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
  };

  return (
    <>
      <Button
        sx={{
          padding: '5px 30px',
          fontSize: '18px',
        }}
        variant="contained"
        color="secondary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Typography>החלף סיסמה</Typography>
      </Button>
      <Dialog
        sx={{ direction: 'rtl' }}
        open={isOpen}
        onClose={handleCloseDialog}
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(handleSave),
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
          החלף את הסיסמה הישנה שלך
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.password}
            fieldData={oldPassFormField}
          />
          <BasicFieldController
            control={control}
            type={EBasicFieldType.password}
            fieldData={newPassFormField}
          />
        </DialogContent>
        <DialogActions sx={{ direction: 'ltr' }}>
          <Button
            variant="contained"
            color="error"
            onClick={closeLogic}
            disabled={isButtonLoading}
          >
            בטל
          </Button>
          <LoadingButton
            loading={isButtonLoading}
            role="progressbar"
            variant="contained"
            color="success"
            type="submit"
          >
            <span>שמור</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
