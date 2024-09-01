import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { apartmentFurnitureObject, IApartment } from '@/models/apartment.model';

interface IProps {
  apartmentDetails?: IApartment;
}
export const ApartmentSection: React.FC<IProps> = ({ apartmentDetails }) => {
  return (
    <Card>
      <Card.Header style={{ textAlign: 'right' }}>פרטי דירה</Card.Header>
      <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
        <ListGroupItem>
          רחוב: {apartmentDetails?.address ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          עיר: {apartmentDetails?.city ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          מספר חדרים: {apartmentDetails?.numberOfFloors ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          קומה: {apartmentDetails?.floor ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          גודל הדירה:{' '}
          {apartmentDetails?.sizeInSqMeters
            ? `${apartmentDetails?.sizeInSqMeters} מטר`
            : 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          ריהוט:{' '}
          {apartmentDetails?.furniture
            ? apartmentFurnitureObject[apartmentDetails.furniture]
            : 'מידע לא זמין'}{' '}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
