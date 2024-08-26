import { api } from '@/api';
import { IApartment } from '@/models/apartment.model';
import { IMatchMap } from '@/models/match.model';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { TenantApartmentCard } from '../tenantApartmentCard';

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
    <Card
      style={{
        width: '700px',
        display: 'flex',
        margin: 'auto',
      }}
    >
      <Card.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h5 style={{ fontWeight: 'bold' }}>הדירות שבהם היה התאמה</h5>
      </Card.Header>

      <Card.Body style={{ overflowX: 'auto', display: 'flex' }}>
        <div
          className="card-body"
          style={{
            overflow: 'auto',
            display: 'flex',
            marginRight: '10px',
          }}
        >
          {!isLoading ? (
            apartments?.length > 0 ? (
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
              <h3>No posts found</h3>
            )
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
