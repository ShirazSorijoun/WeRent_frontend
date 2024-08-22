import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetImageUrlFromName } from '@/hooks';
import { IApartment } from '@/models/apartment.model';
import { CardMedia, CardContent, Typography, Card } from '@mui/material';

interface IUserApartmentCardProps {
  apartment: IApartment;
}

export const UserApartmentCard: React.FC<IUserApartmentCardProps> = ({
  apartment,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/apartment-details/${apartment._id}`);
  };
  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);
  return (
    <Card
      onClick={handleClick}
      sx={{
        marginRight: '10px',
        height: '180px',
        width: '200px',
        position: 'relative',
        flexShrink: 0,
        textDecoration: 'none',
        direction: 'rtl',
      }}
    >
      <CardMedia
        component="img"
        image={apartmentImage}
        alt={apartment.city}
        sx={{ width: '100%', height: '80%' }}
      />
      <CardContent
        sx={{ padding: '4px', display: 'flex', justifyContent: 'space-around' }}
      >
        <Typography variant="body2" color="textSecondary">
          {apartment.address}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {apartment.city}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          קומה {apartment.floor}
        </Typography>
      </CardContent>
    </Card>
  );
};
