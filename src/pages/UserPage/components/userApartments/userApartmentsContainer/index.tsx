import { api } from '@/api';
import { IApartment } from '@/models/apartment.model';
import { IMatchMap } from '@/models/match.model';
import { OwnerApartmentCard } from '@/pages/UserPage/components/userApartments/ownerCard/ownerApartmentCard';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

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
        <h5 style={{ fontWeight: 'bold' }}>הדירות שלי</h5>
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
            userApartments?.length > 0 ? (
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
