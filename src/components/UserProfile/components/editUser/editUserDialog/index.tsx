import { api } from '@/api';
import { useAppDispatch } from '@/hooks/store';
import { defaultUserData, IUserData } from '@/models';
import { updateUser } from '@/stores/user';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

interface IEditUserDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  userData: IUserData;
}

export const EditUserDialog: React.FC<IEditUserDialogProps> = ({
  handleCancel,
  isOpen,
  userData,
}) => {
  const [tempUserProfile, setTempUserProfile] =
    useState<IUserData>(defaultUserData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTempUserProfile({ ...userData });
  }, [userData]);

  const handleSubmit = async () => {
    try {
      const userToSend: IUserData = { ...tempUserProfile };
      if (selectedFile) {
        const imageResponse = await api.file.uploadImage(selectedFile);
        userToSend.profile_image = imageResponse;
        console.log(imageResponse);
      }

      await api.user.updateOwnProfile(userToSend);

      dispatch(updateUser(userToSend));
      handleCancel();
    } catch (error) {
      console.error('Error updating profile:', error);
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

  return (
    <Modal show={isOpen} onHide={handleCancel}>
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
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={tempUserProfile?.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={tempUserProfile?.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="personalId">
            <Form.Label>Personal Id Number</Form.Label>
            <Form.Control
              type="text"
              value={tempUserProfile?.personalId}
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
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={tempUserProfile?.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="streetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              value={tempUserProfile?.streetAddress}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="cityAddress">
            <Form.Label>City Address</Form.Label>
            <Form.Control
              type="text"
              value={tempUserProfile?.cityAddress}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
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
  );
};
