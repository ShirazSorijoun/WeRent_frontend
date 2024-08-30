import React, { useCallback, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { IApartment, defaultApartment } from '@/models/apartment.model';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { api } from '@/api';
import {
  ApartmentHeaderContainer,
  ApartmentDetailsBody,
  ApartmentMatches,
} from './components';
import { selectUserId } from '@/stores/user';
import { useAppSelector } from '@/hooks';

export const ApartmentDetailsPage: React.FC = () => {
  const apartmentId: string = useParams().apartmentId ?? '';
  const [apartment, setApartment] = useState<IApartment>(defaultApartment);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const loggedUserId = useAppSelector(selectUserId);

  const isCreatedByUser = useMemo(
    () => apartment.owner === loggedUserId,
    [apartment.owner, loggedUserId],
  );

  const isHasLease: boolean = !!apartment.leaseId;

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
    return <p className="text-center mt-5">טוען...</p>;
  }

  if (loadingError) {
    return (
      <p className="text-center mt-5 text-danger">
        הייתה שגיאה בטעינת המידע על הדירה
      </p>
    );
  }

  if (!apartment) {
    return <p className="text-center mt-5">הדירה אינה קיימת</p>;
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
        <ApartmentHeaderContainer
          apartmentId={apartmentId}
          isCreatedByUser={isCreatedByUser}
          isHasLease={isHasLease}
        />

        <ApartmentDetailsBody
          apartmentId={apartmentId}
          isCreatedByUser={isCreatedByUser}
          apartment={apartment}
        />

        {isCreatedByUser && !isHasLease && (
          <ApartmentMatches apartmentId={apartmentId} />
        )}
      </Card>
    </div>
  );
};
