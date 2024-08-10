import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { api } from '@/api';
import { useAppDispatch } from '@/hooks/store';
import { userLogin } from '@/stores/user';
import {
  editFormDataObject,
  EPostGoogleRegisterFields,
  PostGoogleRegisterFormData,
  schema,
} from './formUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicFieldController } from '@@/common/formFields';
import { toast } from 'react-toastify';

export const PostGoogleRegister: React.FC = () => {
  const { handleSubmit, control, setError } =
    useForm<PostGoogleRegisterFormData>({
      resolver: zodResolver(schema),
    });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUpdateProfile = async (form: PostGoogleRegisterFormData) => {
    try {
      await api.apartment.getAddressCoordinates(
        form[EPostGoogleRegisterFields.ADDRESS]!,
        form[EPostGoogleRegisterFields.CITY]!,
      );
    } catch (error) {
      const errorMsg = 'העיר או הכתובת אינם תקניים';
      setError(EPostGoogleRegisterFields.ADDRESS, {
        type: 'manual',
        message: errorMsg,
      });
      setError(EPostGoogleRegisterFields.CITY, {
        type: 'manual',
        message: errorMsg,
      });
      return;
    }

    try {
      const userId: string = await api.user.updateOwnProfile({
        phoneNumber: form[EPostGoogleRegisterFields.PHONE],
        personalId: form[EPostGoogleRegisterFields.ID],
        streetAddress: form[EPostGoogleRegisterFields.ADDRESS],
        cityAddress: form[EPostGoogleRegisterFields.CITY],
      });

      await dispatch(userLogin(userId));
      toast.success('הפרופיל נשמר בהצלחה');

      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      console.log('Failed to update profile');
    }
  };

  return (
    <div style={{ marginTop: '30px', marginBottom: '200px' }}>
      <div style={{ marginTop: '30px' }}>
        <Card
          style={{
            width: '700px',
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
          }}
        >
          <Card.Header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h5 style={{ fontWeight: 'bold' }}>השלם פרטי פרופיל</h5>
          </Card.Header>

          <Card.Body style={{ overflow: 'auto' }}>
            <BasicFieldController
              control={control}
              fieldData={editFormDataObject[EPostGoogleRegisterFields.PHONE]}
              sxStyle={{ marginBottom: '20px' }}
            />
            <BasicFieldController
              control={control}
              fieldData={editFormDataObject[EPostGoogleRegisterFields.ID]}
              sxStyle={{ marginBottom: '20px' }}
            />
            <BasicFieldController
              control={control}
              fieldData={editFormDataObject[EPostGoogleRegisterFields.ADDRESS]}
              sxStyle={{ marginBottom: '20px' }}
            />
            <BasicFieldController
              control={control}
              fieldData={editFormDataObject[EPostGoogleRegisterFields.CITY]}
              sxStyle={{ marginBottom: '20px' }}
            />

            <Button
              style={{
                backgroundColor: '#6C757D',
                borderColor: '#6C757D',
                color: '#FFFFFF',
              }}
              variant="primary1"
              onClick={handleSubmit(handleUpdateProfile)}
            >
              Save
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
