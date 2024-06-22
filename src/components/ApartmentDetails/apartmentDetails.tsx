import React, { useCallback, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { ApartmentProps } from '../../types/types';
import './apartmentDetails.css';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { api } from '@/api';
import {
  ApartmentDeleteButton,
  ApartmentDetailsBody,
  ApartmentEditButton,
} from './components';

const defaultApartment: ApartmentProps = {
  _id: '',
  city: '',
  address: '',
  type: '',
  owner: '',
  floor: 0,
  numberOfFloors: 0,
  rooms: 0,
  sizeInSqMeters: 0,
  price: 0,
  entryDate: new Date(),
  apartment_image: '',
  furniture: '',
  features: {
    parking: false,
    accessForDisabled: false,
    storage: false,
    dimension: false,
    terrace: false,
    garden: false,
    elevators: false,
    airConditioning: false,
  },
  description: '',
  phone: ' ',
};

const ApartmentDetails = () => {
  const apartmentId: string = useParams().apartmentId ?? '';
  const [apartment, setApartment] = useState<ApartmentProps>(defaultApartment);
  const [userRole, setUserRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const localStorageUserId = localStorage.getItem('userId');

  const isCreatedByUser = useMemo(
    () => apartment.owner === localStorageUserId,
    [apartment?.owner, localStorageUserId],
  );

  const fetchUserData = useCallback(async () => {
    try {
      const userData = await api.user.getUserById(localStorageUserId || '');
      setUserRole(userData?.roles ?? '');
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }, [localStorageUserId]);

  const fetchApartmentData = useCallback(async (): Promise<void> => {
    if (!apartmentId) return;

    try {
      const apartmentData = await api.apartment.getApartmentById(apartmentId);
      setApartment(apartmentData);
      fetchUserData();
      setLoading(false);
    } catch (error) {
      console.error('Error fetching apartment details', error);
      setLoadingError('Error fetching apartment details');
      setLoading(false);
    }
  }, [apartmentId, fetchUserData]);

  useEffect(() => {
    fetchApartmentData();
  }, [apartmentId, fetchApartmentData]);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (loadingError) {
    return <p className="text-center mt-5 text-danger">{loadingError}</p>;
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
          }}
        >
          {isCreatedByUser ? (
            <ApartmentEditButton refreshApartmentDisplay={fetchApartmentData} />
          ) : (
            <h1 style={{ height: '40px', marginRight: '15px' }}></h1>
          )}
          {isCreatedByUser || userRole === 'admin' ? (
            <ApartmentDeleteButton apartmentId={apartmentId} />
          ) : (
            <h1 style={{ height: '40px' }}></h1>
          )}
        </Card.Header>
        <Card.Body style={{ overflow: 'auto' }}>
          <ApartmentDetailsBody
            apartment={apartment}
            apartmentId={apartmentId}
            isCreatedByUser={isCreatedByUser}
            refreshApartmentDisplay={fetchApartmentData}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ApartmentDetails;
