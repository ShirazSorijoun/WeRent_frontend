import React, { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { api } from '@/api';
import { useAppDispatch } from '@/hooks/store';
import { userLogin } from '@/stores/user';

export const PostGoogleRegister: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [id, setId] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUpdateProfile = async () => {
    try {
      // Validate the input fields
      if (!phoneNumber || !id || !street || !city) {
        setError('All fields are required');
        return;
      } else {
        setError(null);
      }

      const userId: string = await api.user.updateOwnProfile({
        phoneNumber,
        personalId: id,
        streetAddress: street,
        cityAddress: city,
      });

      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
      console.log('Profile updated successfully!');
      await dispatch(userLogin(userId));
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
            <h5 style={{ fontWeight: 'bold' }}>Update Profile</h5>
          </Card.Header>

          <Card.Body style={{ overflow: 'auto' }}>
            <div className="col-lg-6" style={{ marginBottom: '20px' }}>
              <label className="form-label" htmlFor="PhoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="PhoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="col-lg-6" style={{ marginBottom: '20px' }}>
              <label className="form-label" htmlFor="ID">
                ID
              </label>
              <input
                type="text"
                className="form-control"
                id="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="col-lg-6" style={{ marginBottom: '20px' }}>
              <label className="form-label" htmlFor="Street">
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="col-lg-6" style={{ marginBottom: '20px' }}>
              <label className="form-label" htmlFor="City">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}

            <Button
              style={{
                backgroundColor: '#6C757D',
                borderColor: '#6C757D',
                color: '#FFFFFF',
              }}
              variant="primary1"
              onClick={handleUpdateProfile}
            >
              Save
            </Button>
          </Card.Body>
        </Card>
      </div>

      {/* Alert for success */}
      <Alert
        variant="success"
        show={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        dismissible
        style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 9999 }}
      >
        Profile updated successfully!
      </Alert>
    </div>
  );
};
