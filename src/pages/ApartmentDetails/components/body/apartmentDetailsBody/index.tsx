import React from 'react';
import { Card } from 'react-bootstrap';
import { ApartmentData } from '../apartmentData';
import { IApartment } from '@/models/apartment.model';

interface IApartmentDetailsBodyProps {
  apartment: IApartment;
  apartmentId: string;
  isCreatedByUser: boolean;
}

export const ApartmentDetailsBody: React.FC<IApartmentDetailsBodyProps> = ({
  apartment,
  apartmentId,
  isCreatedByUser,
}) => {
  return (
    <Card.Body style={{ overflow: 'auto' }}>
      <ApartmentData
        apartment={apartment}
        apartmentId={apartmentId}
        isCreatedByUser={isCreatedByUser}
      />
    </Card.Body>
  );
};
