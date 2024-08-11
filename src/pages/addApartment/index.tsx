import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ApartmentFormData, schema, defaultFormValues } from './formUtils';
import { useAddApartment } from './hooks/useAddApartment';

import { AddApartmentBody } from './body';
import { Box, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const AddApartment: React.FC = () => {
  const { handleSubmit, control, setError } = useForm<ApartmentFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  });

  const { handleSave, handleWrongFormData, isButtonLoading } =
    useAddApartment(setError);

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
        <CardHeader dir="rtl" title="הוספת דירה" />
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
            <span>צור דירה</span>
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};
