import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ApartmentFormData, schema, defaultFormValues } from './formUtils';
import { useAddApartment } from './hooks/useAddApartment';

import { AddApartmentBody } from './body';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';

export const AddApartment: React.FC = () => {
  const { handleSubmit, control, setError, reset } = useForm<ApartmentFormData>(
    {
      resolver: zodResolver(schema),
      defaultValues: defaultFormValues,
    },
  );

  const {
    handleSave,
    handleWrongFormData,
    getApartmentForForm,
    handleBackClick,
    isEdit,
    isButtonLoading,
  } = useAddApartment(setError);

  useEffect(() => {
    const func = async () => {
      const apartmentForForm = await getApartmentForForm();
      reset(apartmentForForm);
    };

    func();
  }, [getApartmentForForm, reset]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{ width: '80%', margin: '30px' }}
        raised
        component="form"
        onSubmit={handleSubmit(handleSave, handleWrongFormData)}
      >
        <CardHeader
          dir="rtl"
          title={`${isEdit ? 'עריכת' : 'יצירת'} דירה`}
          action={isEdit && <Button onClick={handleBackClick}>חזור</Button>}
        />
        <CardContent sx={{ padding: 0 }}>
          <AddApartmentBody control={control} />
        </CardContent>
        <CardActions dir="rtl">
          <LoadingButton
            loading={isButtonLoading}
            role="progressbar"
            variant="contained"
            color="success"
            type="submit"
          >
            <span>{isEdit ? 'ערוך' : 'צור'} דירה</span>
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};
