/* eslint-disable @typescript-eslint/ban-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
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

const reviewFieldName = 'review';
const formField: IFormField = {
  fieldName: reviewFieldName,
  label: 'איך החוויה באתר',
  requireError: 'חובה למלא משהו על מנת לשתף',
};

const schema = z.object({
  [reviewFieldName]: z.string().min(1, formField.requireError),
});

type schemaType = z.infer<typeof schema>;

interface IProps {
  completeSave: () => Promise<void>;
}

export const AddReviewDialog: React.FC<IProps> = ({ completeSave }) => {
  const { handleSubmit, control, reset } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: { review: '' },
    resetOptions: {
      keepDirtyValues: false,
      keepErrors: true,
    },
  });

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeLogic = useCallback(() => {
    reset();
    setIsOpen(false);
  }, [reset]);

  const handleSave = useCallback(
    async (reviewForm: schemaType): Promise<void> => {
      setIsButtonLoading(true);
      try {
        await api.review.postReview(reviewForm[reviewFieldName]);

        setIsButtonLoading(false);
        toast.success('הביקורת נשמרה בהצלחה');
        closeLogic();
        completeSave();
      } catch (error) {
        console.error('Error saving review:', error);
        setIsButtonLoading(false);
        toast.error('הייתה שגיאה בשמירת הביקורת');
      }
    },
    [closeLogic, completeSave],
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
        <Typography>הוסף ביקורת</Typography>
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
        <DialogTitle>יצירת ביקורת </DialogTitle>
        <DialogContent>
          <Stack spacing={4}>
            <Typography>
              תודה שבחרת לשתף אותנו במה אתה חושב על האתר, התגובה שלך תעזור לנו
              במידת הצורך לשפר ולספק תגובה טובה יותר.
            </Typography>
            <Typography style={{ color: '#5E6E82' }}>
              המייל שלנו:{' '}
              <a
                href="mailto:weRent@gmail.com"
                data-turbo="false"
                target="_blank"
              >
                weRent@gmail.com
              </a>
            </Typography>
            <BasicFieldController
              control={control}
              type={EBasicFieldType.multiLineText}
              fieldData={formField}
            />
          </Stack>
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
