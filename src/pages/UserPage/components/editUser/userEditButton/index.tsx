import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ModeEditOutline } from '@mui/icons-material';
import { EditUserDialog } from '../editUserDialog';
import { IUserData } from '@/models';

interface IUserEditButtonProps {
  userData: IUserData;
}

export const UserEditButton: React.FC<IUserEditButtonProps> = ({
  userData,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenEditModal}
        variant="light"
        style={{ marginRight: '15px' }}
      >
        <ModeEditOutline />
      </Button>
      <EditUserDialog
        userData={userData}
        handleCancel={handleCloseEditModal}
        isOpen={showEditModal}
        completeSave={handleCloseEditModal}
      />
    </>
  );
};
