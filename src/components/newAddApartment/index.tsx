import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ApartmentFormData, schema, defaultFormValues } from './formUtils';
import { useEditApartment } from './hooks/useEditApartmentDialog';

import { AddApartmentBody } from './body';
import { Box, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const NewAddApartment: React.FC = () => {
  const { handleSubmit, control, reset, setError } = useForm<ApartmentFormData>(
    {
      resolver: zodResolver(schema),
      defaultValues: defaultFormValues,
      resetOptions: {
        keepDirtyValues: false,
        keepErrors: true,
      },
    },
  );

  const { handleSave, handleWrongFormData, isButtonLoading } =
    useEditApartment(setError);

  const closeLogic = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    async (form: ApartmentFormData): Promise<void> => {
      // const isSaved = await handleSave(form);
    },
    [handleSave],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
      }}
    >
      <Card
        sx={{ width: '60%', margin: '30px' }}
        raised
        component="form"
        onSubmit={handleSubmit(onSubmit, handleWrongFormData)}
      >
        <CardHeader title="הוספת דירה" />
        <CardContent sx={{ padding: 0 }}>
          <AddApartmentBody control={control} />
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={isButtonLoading}
            role="progressbar"
            variant="contained"
            color="success"
            type="submit"
          >
            <span>צור דירה</span>
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};
