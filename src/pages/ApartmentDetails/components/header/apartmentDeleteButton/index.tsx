import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from '@/api';

interface IApartmentDeleteButtonProps {
  apartmentId?: string;
}

export const ApartmentDeleteButton: React.FC<IApartmentDeleteButtonProps> = ({
  apartmentId,
}) => {
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    try {
      if (apartmentId) {
        await api.apartment.deleteApartment(apartmentId);
        navigate(-1);
      }
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  }, [apartmentId, navigate]);

  const openDeleteDialog = useCallback(async () => {
    const isDelete = await swal({
      title: 'are you sure you want to delete this apartment',
      text: 'once its deleted there is no way to recover it',
      icon: 'warning',
      buttons: ['cancel', 'delete'],
      dangerMode: true,
    });

    if (isDelete) await handleDelete();
  }, [handleDelete]);

  return (
    <>
      <Button onClick={openDeleteDialog} variant="light">
        <DeleteIcon />
      </Button>
    </>
  );
};
