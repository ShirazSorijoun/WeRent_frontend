import { api } from '@/api';
import { IApartment } from '@/models/apartment.model';
import { IMatchMap } from '@/models/match.model';
import React, { useEffect, useState } from 'react';
import { TenantApartmentCard } from '../../apartmentCards';
import { BasicUserApartmentsContainer } from '../basicUserApartmentsContainer';

interface IProps {
  matchesMap: IMatchMap;
  userId: string;
}
export const UserRentingApartmentsContainer: React.FC<IProps> = ({
  matchesMap,
  userId,
}) => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startEffect = async () => {
      try {
        const apartmentsIds: string[] = Object.entries(matchesMap)
          .filter(([apartmentId, matches]) =>
            matches.some(
              (match) => match.apartment.leaseId && match.user._id === userId,
            ),
          )
          .map(([apartmentId, matches]) => apartmentId);

        const apartmentsData: IApartment[] = apartmentsIds.length
          ? await api.apartment.getApartmentsByIds(apartmentsIds)
          : [];

        setApartments(apartmentsData);
      } catch (error) {
        console.error('Error fetching user apartments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    startEffect();
  }, [matchesMap, userId]);

  return (
    <BasicUserApartmentsContainer
      title="הדירות שאני משכיר"
      isLoading={isLoading}
    >
      {apartments?.length > 0 ? (
        <>
          {apartments.map((apartment) => (
            <TenantApartmentCard
              apartment={apartment}
              key={apartment._id}
              userId={userId}
            />
          ))}
        </>
      ) : (
        <h3>אינך שוכר דירה כרגע</h3>
      )}
    </BasicUserApartmentsContainer>
  );
};
