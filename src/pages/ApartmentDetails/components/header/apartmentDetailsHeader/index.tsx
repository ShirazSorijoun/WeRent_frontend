import React from 'react';
import { Card } from 'react-bootstrap';
import { ApartmentDeleteButton } from '../apartmentDeleteButton';
import { ApartmentEditButton } from '../apartmentEditButton';
import { useAppSelector } from '@/hooks/store';
import { selectIsUserAdmin } from '@/stores/user';

interface IApartmentDetailsHeaderProps {
  apartmentId: string;
  isCreatedByUser: boolean;
}

export const ApartmentDetailsHeader: React.FC<IApartmentDetailsHeaderProps> = ({
  apartmentId,
  isCreatedByUser,
}) => {
  const isAdmin = useAppSelector(selectIsUserAdmin);

  return (
    <Card.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {isCreatedByUser ? (
        <ApartmentEditButton apartmentId={apartmentId} />
      ) : (
        <h1 style={{ height: '40px', marginRight: '15px' }}></h1>
      )}
      {isCreatedByUser || isAdmin ? (
        <ApartmentDeleteButton apartmentId={apartmentId} />
      ) : (
        <h1 style={{ height: '40px' }}></h1>
      )}
    </Card.Header>
  );
};
