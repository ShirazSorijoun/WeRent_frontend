import { getToken } from '@/api';
import { deleteApartment } from '@/services/apartments-service';
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import DeleteIcon from '@mui/icons-material/Delete';

interface IApartmentDeleteButtonProps {
  apartmentId: string;
}

export const ApartmentDeleteButton: React.FC<IApartmentDeleteButtonProps> = ({
  apartmentId,
}) => {
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    const token: string | null = await getToken();
    if (!token) return;

    try {
      if (apartmentId) {
        await deleteApartment(apartmentId, token || '');
        navigate('/');
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
      <Button onClick={openDeleteDialog} variant="light" style={{}}>
        <DeleteIcon />
      </Button>
    </>
  );
};
