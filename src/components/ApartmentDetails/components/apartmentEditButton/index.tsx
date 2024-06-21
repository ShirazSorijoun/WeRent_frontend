import { EditApartmentDialog } from '@@/editApartment';
import { ModeEditOutline } from '@mui/icons-material';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

interface IApartmentEditButtonProps {
  refreshApartmentDisplay: () => Promise<void>;
}

export const ApartmentEditButton: React.FC<IApartmentEditButtonProps> = ({
  refreshApartmentDisplay,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditApartment = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const completeUpdate = async (): Promise<void> => {
    handleCloseEditModal();
    await refreshApartmentDisplay();
  };

  return (
    <>
      <Button
        onClick={handleEditApartment}
        variant="light"
        style={{ marginRight: 'auto' }}
      >
        <ModeEditOutline />
      </Button>

      <EditApartmentDialog
        handleCancel={handleCloseEditModal}
        isOpen={showEditModal}
        completeSave={completeUpdate}
      />
    </>
  );
};
