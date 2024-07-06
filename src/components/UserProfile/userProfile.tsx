/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { ModeEditOutline } from '@mui/icons-material';
import './userProfile.css';
import { ApartmentProps } from '@/types/types';
import { IUserData } from '@/models';
import { api } from '@/api';
import { useGetImageUrlFromName } from '@/common/hooks';
import { UserApartmentCard } from './components';
import { TenantFormDialog } from '@/components/TenantForm';

const defaultUserProfile: IUserData = { email: '', name: '', password: '' };
const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<IUserData>(defaultUserProfile);
  const [userApartments, setUserApartments] = useState<ApartmentProps[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempUserProfile, setTempUserProfile] =
    useState<IUserData>(defaultUserProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordError2, setPasswordError2] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    try {
      setLoading(true);
      const userData: IUserData = await api.user.getUserById(userId);
      setUserProfile(userData);
      setTempUserProfile(userData);
      const userApartmentsData = await api.user.getUserApartments();
      setUserApartments(userApartmentsData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let photoUrl = userProfile?.profile_image;

      if (selectedFile) {
        const imageResponse = await api.file.uploadImage(selectedFile);
        photoUrl = imageResponse;
        console.log(photoUrl);
      }

      await api.user.updateOwnProfile({
        ...tempUserProfile,
        profile_image: photoUrl,
      });

      setUserProfile({ ...tempUserProfile });
      handleCloseEditModal();
      fetchUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTempUserProfile({ ...tempUserProfile, [e.target.id]: e.target.value });
  };

  const imageSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleChangePassword = async () => {
    try {
      // Check if the new password has at least 6 characters
      if (newPassword.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      } else {
        setPasswordError(null);
      }
      const isValid = await api.user.checkOldPassword(oldPassword);
      //console.log(isValid)
      if (isValid) {
        await api.user.updateOwnProfile({
          ...tempUserProfile,
          password: newPassword,
        });
        setUserProfile({ ...tempUserProfile });
        fetchUserProfile();
        setPasswordError2(null);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
        console.log('Password updated successfully!');
      } else {
        setPasswordError2('Not valid password');
        console.log('not valid password');
      }
    } catch (error) {
      console.log('fail chnge password');
    }
  };

  const profileImage = useGetImageUrlFromName(userProfile?.profile_image);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          position: 'relative',
          marginLeft: '10px',
          marginBottom: '20px',
          alignSelf: 'flex-end',
        }}
      >
        <Button
          style={{
            backgroundColor: '#6C757D',
            borderColor: '#6C757D',
            padding: '5px 30px',
            fontSize: '18px',
          }}
          onClick={() => (window.location.href = '/addreview')}
        >
          Add Review
        </Button>
      </div>
      <div>
        {/* Button to trigger the TenantForm dialog */}
        <Button onClick={openDialog}>Open Tenant Form</Button>
        <Modal show={dialogOpen} onHide={closeDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Tenant Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Content of your TenantForm dialog */}
            <TenantFormDialog
              isOpen={dialogOpen}
              handleCancel={closeDialog}
              completeSave={() => {
                closeDialog();
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Close
            </Button>
            {/* Additional buttons or actions for the dialog */}
          </Modal.Footer>
        </Modal>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          style={{
            width: '500px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          <Card.Header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              onClick={handleEditProfile}
              variant="light"
              style={{ marginRight: '15px' }}
            >
              <ModeEditOutline />
            </Button>
            <h5 style={{ fontWeight: 'bold', marginLeft: '90px' }}>
              Account details
            </h5>
          </Card.Header>

          <Card.Body style={{ overflow: 'auto' }}>
            <div
              className="row g-3"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px',
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                  alignItems: 'center',
                }}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label" htmlFor="AccountInput_Name">
                Name
              </label>
              <input
                className="form-control"
                id="AccountInput_Name"
                value={userProfile?.name}
                readOnly
              ></input>
            </div>
            <div className="col-lg-6">
              <label className="form-label" htmlFor="AccountInput_Email">
                Email
              </label>
              <input
                className="form-control"
                id="AccountInput_Email"
                value={userProfile?.email}
                readOnly
              ></input>
            </div>
          </Card.Body>
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="profile_image">
                  <Form.Label>Profile Photo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={imageSelected}
                  />
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={tempUserProfile?.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={tempUserProfile?.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: '#6C757D',
                  borderColor: '#6C757D',
                  color: '#FFFFFF',
                }}
                variant="primary1"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>

        <div style={{ marginTop: '30px', marginBottom: '20px' }}>
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
                {passwordError2 && (
                  <p className="text-danger">{passwordError2}</p>
                )}
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
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}
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
          {userProfile?.roles === 'owner' && (
            <Card
              style={{
                width: '700px',
                height: '45%',
                display: 'flex',
                margin: 'auto',
                marginTop: '30px',
              }}
            >
              <Card.Header
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h5 style={{ fontWeight: 'bold' }}>My apartments</h5>
              </Card.Header>

              <Card.Body style={{ overflowX: 'auto', display: 'flex' }}>
                <div
                  className="card-body"
                  style={{
                    overflow: 'auto',
                    display: 'flex',
                    marginRight: '10px',
                  }}
                >
                  {userProfile ? (
                    userApartments?.length > 0 ? (
                      <>
                        {userApartments.map((apartment) => (
                          <UserApartmentCard
                            apartment={apartment}
                            key={apartment._id}
                          />
                        ))}
                      </>
                    ) : (
                      <h3>No posts found</h3>
                    )
                  ) : (
                    <h3>Loading...</h3>
                  )}
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
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

export default UserProfile;
