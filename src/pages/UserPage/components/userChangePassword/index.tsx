import { api } from '@/api';
import { useAppDispatch } from '@/hooks/store';
import { updateUser } from '@/stores/user';
import React, { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const UserChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordError2, setPasswordError2] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      // Check if the new password has at least 6 characters
      if (newPassword.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      } else {
        setPasswordError(null);
      }
      const newPassHash = await api.user.updateUserPass(
        oldPassword,
        newPassword,
      );

      if (newPassHash) {
        dispatch(updateUser({ password: newPassHash }));

        setPasswordError2(null);
        toast.success('Password changed successfully!');
        console.log('Password updated successfully!');
      } else {
        setPasswordError2('Not valid password');
        console.log('not valid password');
      }
    } catch (error) {
      console.log('fail chnge password');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <h5 style={{ fontWeight: 'bold' }}>Change Password</h5>
      </Card.Header>

      <Card.Body style={{ overflow: 'auto' }}>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="OldPassword">
            Old password
          </label>
          <input
            type="password"
            className="form-control"
            id="OldPassword"
            onChange={(e) => setOldPassword(e.target.value)}
          ></input>
          {passwordError2 && <p className="text-danger">{passwordError2}</p>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="NewPassword">
            New password
          </label>
          <input
            type="password"
            className="form-control"
            id="NewPassword"
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          {passwordError && <p className="text-danger">{passwordError}</p>}
        </div>
        <div style={{ marginTop: '20px' }}></div>
        <Button
          style={{ backgroundColor: '#6C757D', borderColor: '#6C757D' }}
          variant="primary"
          onClick={handleChangePassword}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
        </Button>
      </Card.Body>
    </Card>
  );
};
