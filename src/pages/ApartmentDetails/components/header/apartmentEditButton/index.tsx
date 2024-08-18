import { ModeEditOutline } from '@mui/icons-material';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

interface IApartmentEditButtonProps {
  apartmentId?: string;
}

export const ApartmentEditButton: React.FC<IApartmentEditButtonProps> = ({
  apartmentId,
}) => {
  const navigate = useNavigate();

  const handleEditApartment = () => {
    navigate(`/editApartment/${apartmentId}`);
  };

  return (
    <Button
      onClick={handleEditApartment}
      variant="light"
      style={{ marginRight: 'auto' }}
    >
      <ModeEditOutline />
    </Button>
  );
};
