import { api } from '@/api';
import { IApartment } from '@/models/apartment.model';
import { ILeaseAgreementMap } from '@/models/leaseAgreement';
import { UserApartmentCard } from '@@/userApartmentCard';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

interface IProps {
  leaseMap: ILeaseAgreementMap;
}

export const UserApartmentsContainer: React.FC<IProps> = ({ leaseMap }) => {
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
