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
export const UserInterestedApartmentsContainer: React.FC<IProps> = ({
  matchesMap,
  userId,
}) => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startEffect = async () => {
      try {
        const apartmentsIds: string[] = Object.entries(matchesMap)
          .filter(([apartmentId, matches]) => {
            const isRented = matches.some(
              (match) => match.apartment.leaseId && match.user._id === userId,
            );
            if (isRented) return false;
            else
              return matches.some(
                (match) => match.user._id === userId && match.accepted,
              );
          })
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
      title="הדירות שבהם היה התאמה"
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
        <h3>אין כרגע התאמות קיימות עם דירות</h3>
      )}
    </BasicUserApartmentsContainer>
  );
};
