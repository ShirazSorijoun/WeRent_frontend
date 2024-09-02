import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

interface IProps {
  apartmentId: string;
}

export const SendToApartmentPersonalArea: React.FC<IProps> = ({
  apartmentId,
}) => {
  const navigate = useNavigate();

  const goToPersonalArea = (): void => {
    navigate(`/ApartmentPersonalArea/${apartmentId}`);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={goToPersonalArea}
      style={{ marginLeft: '20px' }}
    >
      לאזור האישי
    </Button>
  );
};
