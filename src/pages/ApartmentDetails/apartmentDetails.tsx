import React, { useCallback, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { IApartment, defaultApartment } from '@/models/apartment.model';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { api } from '@/api';
import {
  ApartmentDetailsHeader,
  ApartmentDetailsBody,
  ApartmentMatches,
} from './components';
import { selectIsUserAdmin, selectUserId } from '@/stores/user';
import { useAppSelector } from '@/hooks';
import { ApartmentMatchButton } from './components/header/apartmentMatchButton';

export const ApartmentDetailsPage: React.FC = () => {
  const apartmentId: string = useParams().apartmentId ?? '';
  const [apartment, setApartment] = useState<IApartment>(defaultApartment);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const loggedUser = useAppSelector(selectUserId);
  const isAdmin = useAppSelector(selectIsUserAdmin);

  const isCreatedByUser = useMemo(
    () => apartment.owner === loggedUser,
    [apartment.owner, loggedUser],
  );

  const fetchApartmentData = useCallback(async (): Promise<void> => {
    if (!apartmentId) return;

    try {
      const apartmentData = await api.apartment.getApartmentById(apartmentId);
      setApartment(apartmentData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching apartment details', error);
      setLoadingError(true);
      setLoading(false);
    }
  }, [apartmentId]);

  useEffect(() => {
    fetchApartmentData();
  }, [apartmentId, fetchApartmentData]);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (loadingError) {
    return (
      <p className="text-center mt-5 text-danger">
        Error fetching apartment details
      </p>
    );
  }

  if (!apartment) {
    return <p className="text-center mt-5">Apartment not found</p>;
  }

  return (
    <div className="container">
      <Card
        style={{
          width: '100%',
          height: '90%',
          flexDirection: 'column',
          margin: 'auto',
          marginTop: '30px',
          marginBottom: '100px',
        }}
      >
        <Card.Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '55px',
          }}
        >
          {(isCreatedByUser || isAdmin) && (
            <ApartmentDetailsHeader apartmentId={apartmentId} />
          )}
          {!isCreatedByUser && (
            <ApartmentMatchButton apartmentId={apartmentId} />
          )}
        </Card.Header>
        <ApartmentDetailsBody
          apartmentId={apartmentId}
          isCreatedByUser={isCreatedByUser}
          apartment={apartment}
        />

        {isCreatedByUser && <ApartmentMatches apartmentId={apartmentId} />}
      </Card>
    </div>
  );
};
