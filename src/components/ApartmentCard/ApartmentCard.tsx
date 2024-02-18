import "./ApartmentCard.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';



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
    return (
        <Card className="card-container">
            <Box className="image-container">
                <img src={apartment.apartment_image} alt="Apartment" className="apartment-image" />
            </Box>
            <CardContent className="card-content">
                <Typography variant="h6" color="text.secondary" gutterBottom className="price">
                    {apartment.price} ₪
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom className="details">
                    {apartment.type} {bull} {apartment.rooms} rooms {bull} Floor {apartment.floor} {bull} {apartment.sizeInSqMeters} sqm
                </Typography>
                <Typography variant="body2" color="text.secondary" className="details">
                    {apartment.city}
                </Typography>
            </CardContent>
            <CardActions className="actions">
                <Link to={`/apartment-details/${apartment._id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small">Learn More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default ApartmentCard;
