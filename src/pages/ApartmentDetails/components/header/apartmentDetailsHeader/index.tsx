import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ApartmentDeleteButton } from '../apartmentDeleteButton';
import { ApartmentEditButton } from '../apartmentEditButton';
import { api } from '@/api';
import { ApartmentTamaWarning } from '../apartmentTamaWarning';

interface IApartmentDetailsHeaderProps {
  refreshApartmentDisplay: () => Promise<void>;
  apartmentId: string;
  isCreatedByUser: boolean;
}

export const ApartmentDetailsHeader: React.FC<IApartmentDetailsHeaderProps> = ({
  refreshApartmentDisplay,
  apartmentId,
  isCreatedByUser,
}) => {
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    try {
      const userData = await api.user.getUserById(
        localStorage.getItem('userId') || '',
      );
      setIsUserAdmin(!!userData?.isAdmin);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Card.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {isCreatedByUser ? (
        <ApartmentEditButton
          refreshApartmentDisplay={refreshApartmentDisplay}
        />
      ) : (
        <h1 style={{ height: '40px', marginRight: '15px' }}></h1>
      )}
      <ApartmentTamaWarning apartmentId={apartmentId} />
      {isCreatedByUser || isUserAdmin ? (
        <ApartmentDeleteButton apartmentId={apartmentId} />
      ) : (
        <h1 style={{ height: '40px' }}></h1>
      )}
    </Card.Header>
  );
};
