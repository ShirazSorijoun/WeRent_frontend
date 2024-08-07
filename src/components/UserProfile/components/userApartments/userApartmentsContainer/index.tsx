import { api } from '@/api';
import { ApartmentProps } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { UserApartmentCard } from '../userApartmentCard';

export const UserApartmentsContainer: React.FC = () => {
  const [userApartments, setUserApartments] = useState<ApartmentProps[]>([]);
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
        height: '45%',
        display: 'flex',
        margin: 'auto',
        marginTop: '30px',
      }}
    >
      <Card.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h5 style={{ fontWeight: 'bold' }}>My apartments</h5>
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
                  <UserApartmentCard
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
