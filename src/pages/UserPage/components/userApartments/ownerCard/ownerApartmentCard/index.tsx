import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetImageUrlFromName } from '@/hooks';
import { IApartment } from '@/models/apartment.model';
import {
  CardMedia,
  CardContent,
  Typography,
  Card,
  CardActions,
} from '@mui/material';
import { OwnerApartmentMatches } from '../ownerApartmentMatches';
import { IMatch } from '@/models/match.model';

interface IUserApartmentCardProps {
  apartment: IApartment;
  matchesList: IMatch[];
}

export const OwnerApartmentCard: React.FC<IUserApartmentCardProps> = ({
  apartment,
  matchesList,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/apartment-details/${apartment._id}`);
  };
  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);
  return (
    <Card
      sx={{
        marginRight: '10px',
        height: '200px',
        width: '200px',
        position: 'relative',
        flexShrink: 0,
        textDecoration: 'none',
        direction: 'rtl',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        onClick={handleClick}
        component="img"
        image={apartmentImage}
        alt={apartment.city}
        sx={{ width: '100%', height: '60%' }}
      />
      <CardContent
        onClick={handleClick}
        sx={{ padding: '4px', display: 'flex', justifyContent: 'space-around' }}
      >
        <Typography variant="body2">{apartment.address}</Typography>
        <Typography variant="body2">{apartment.city}</Typography>
        <Typography variant="body2">קומה {apartment.floor}</Typography>
      </CardContent>
      <CardActions>
        <OwnerApartmentMatches matchesList={matchesList} />
      </CardActions>
    </Card>
  );
};
