import './ApartmentCard.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useGetImageUrlFromName } from '@/hooks';
import { apartmentTypeObject } from '@/models/apartment.model';

interface Apartment {
  _id?: string;
  apartment_image?: string;
  price: number;
  type: string;
  rooms: number;
  floor: number;
  sizeInSqMeters: number;
  city: string;
}

interface ApartmentCardProps {
  apartment: Apartment;
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);

  return (
    <Card className="card-container">
      <Box className="image-container">
        <img src={apartmentImage} alt="Apartment" className="apartment-image" />
      </Box>
      <CardContent className="card-content">
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          className="price"
        >
          {apartment.price} ₪
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          className="details"
        >
          {apartmentTypeObject[apartment.type]} {bull} {apartment.rooms} חדרים{' '}
          {bull} קומה
          {apartment.floor} {bull} {apartment.sizeInSqMeters} מ"ר
        </Typography>
        <Typography variant="body2" color="text.secondary" className="details">
          {apartment.city}
        </Typography>
      </CardContent>
      <CardActions className="actions">
        <Link
          to={`/apartment-details/${apartment._id}`}
          style={{ textDecoration: 'none' }}
        >
          <Button size="small">ראה עוד</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ApartmentCard;
