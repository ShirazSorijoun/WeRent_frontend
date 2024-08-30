import { api } from '@/api';
import { IApartment } from '@/models/apartment.model';
import { IMatchMap } from '@/models/match.model';
import React, { useEffect, useState } from 'react';
import { OwnerApartmentCard } from '../../apartmentCards';
import { BasicUserApartmentsContainer } from '../basicUserApartmentsContainer';

interface IProps {
  matchesMap: IMatchMap;
}

export const UserApartmentsContainer: React.FC<IProps> = ({ matchesMap }) => {
  const [userApartments, setUserApartments] = useState<IApartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startEffect = async () => {
      try {
        const userApartmentsData = await api.user.getUserApartments();
        setUserApartments(userApartmentsData);
      } catch (error) {
        console.error('Error fetching user apartments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    startEffect();
  }, []);

  return (
    <BasicUserApartmentsContainer title="הדירות שלי" isLoading={isLoading}>
      {userApartments?.length > 0 ? (
        <>
          {userApartments.map((apartment) => (
            <OwnerApartmentCard
              matchesList={matchesMap[apartment._id] ?? []}
              apartment={apartment}
              key={apartment._id}
            />
          ))}
        </>
      ) : (
        <h3>לא פרסמת אף דירה</h3>
      )}
    </BasicUserApartmentsContainer>
  );
};
