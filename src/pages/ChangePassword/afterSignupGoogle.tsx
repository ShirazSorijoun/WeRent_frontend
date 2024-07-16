import { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { api } from '@/api';
import { useAppDispatch } from '@/hooks/store';
import { userLogin } from '@/stores/user';

export const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChangePassword = async () => {
    try {
      // Check if the new password has at least 6 characters
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      } else {
        setPasswordError(null);
      }

      const userId: string = await api.user.updateOwnProfile({ password });

      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
      console.log('Password updated successfully!');
      await dispatch(userLogin(userId));
      navigate('/');
    } catch (error) {
      console.log('fail change password');
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
            <h5 style={{ fontWeight: 'bold' }}>Choose Password and Role</h5>
          </Card.Header>

          <Card.Body style={{ overflow: 'auto' }}>
            <div className="col-lg-6" style={{ marginBottom: '20px' }}>
              <label className="form-label" htmlFor="NewPassword">
                Please choose a new password
              </label>
              <input
                type="password"
                className="form-control"
                id="NewPassword"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>

            <div style={{ marginTop: '20px' }}></div>
            <Button
              style={{
                backgroundColor: '#6C757D',
                borderColor: '#6C757D',
                color: '#FFFFFF',
              }}
              variant="primary1"
              onClick={handleChangePassword}
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
        Password changed successfully!
      </Alert>
    </div>
  );
};

export default ChangePassword;
