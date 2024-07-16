import { ApartmentProps } from '@/types/types';
import { Card } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetImageUrlFromName } from '@/common/hooks';

interface IUserApartmentCardProps {
  apartment: ApartmentProps;
}

export const UserApartmentCard: React.FC<IUserApartmentCardProps> = ({
  apartment,
}) => {
  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);
  return (
    <Card
      as={Link}
      to={`/apartment-details/${apartment._id}`}
      style={{
        marginRight: '10px',
        height: '180px',
        width: '200px',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <Card.Img
        variant="top"
        src={apartmentImage}
        style={{ width: '100%', height: '80%' }}
      />
      <Card.Body style={{ padding: '4px' }}>
        <Card.Text style={{ color: '#344050' }}>{apartment.city}</Card.Text>
      </Card.Body>
    </Card>
  );
};
