import React, { useCallback, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { ApartmentProps, defaultApartment } from '../../types/types';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { api } from '@/api';
import './apartmentDetails.css';
import { ApartmentDetailsHeader, ApartmentDetailsBody } from './components';

export const ApartmentDetailsPage: React.FC = () => {
  const apartmentId: string = useParams().apartmentId ?? '';
  const [apartment, setApartment] = useState<ApartmentProps>(defaultApartment);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const isCreatedByUser = useMemo(
    () => apartment.owner === localStorage.getItem('userId'),
    [apartment?.owner],
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
        <ApartmentDetailsHeader
          apartmentId={apartmentId}
          isCreatedByUser={isCreatedByUser}
          refreshApartmentDisplay={fetchApartmentData}
        />
        <ApartmentDetailsBody
          apartmentId={apartmentId}
          isCreatedByUser={isCreatedByUser}
          refreshApartmentDisplay={fetchApartmentData}
          apartment={apartment}
        />
      </Card>
    </div>
  );
};
