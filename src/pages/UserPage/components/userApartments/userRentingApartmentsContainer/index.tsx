import { api } from '@/api';
import { IApartment } from '@/models/apartment.model';
import { ILeaseAgreementMap } from '@/models/leaseAgreement';
import { UserApartmentCard } from '@@/userApartmentCard';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

interface IProps {
  leaseMap: ILeaseAgreementMap;
  userId: string;
}
export const UserRentingApartmentsContainer: React.FC<IProps> = ({
  leaseMap,
  userId,
}) => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startEffect = async () => {
      try {
        const apartmentsIds: string[] = Object.values(leaseMap)
          .filter((lease) => lease.tenantId === userId)
          .map((lease) => lease.apartment._id);

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
  }, [leaseMap, userId]);

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
        <h5 style={{ fontWeight: 'bold' }}>הדירות שאני משכיר</h5>
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
