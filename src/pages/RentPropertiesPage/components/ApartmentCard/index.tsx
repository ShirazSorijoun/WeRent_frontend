import { useNavigate } from 'react-router-dom';
import { useGetImageUrlFromName } from '@/hooks';
import { apartmentTypeObject, IApartment } from '@/models/apartment.model';
import {
  CardContent,
  Typography,
  CardActions,
  Card,
  Button,
  Stack,
  CardMedia,
} from '@mui/material';

interface ApartmentCardProps {
  apartment: IApartment;
}

export const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);

  const navigate = useNavigate();

  const goToApartmentDetails = (): void => {
    navigate(`/apartment-details/${apartment._id}`);
  };

  return (
    <Card sx={{ width: ' 340px', height: '385px', direction: 'rtl' }}>
      <CardMedia
        component="img"
        image={apartmentImage}
        alt={apartment._id}
        sx={{ height: '55%' }}
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6" children={`${apartment.price} ₪`} />
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            divider={<span>•</span>}
          >
            <Typography children={apartmentTypeObject[apartment.type]} />
            <Typography children={`${apartment.rooms} חדרים`} />
            <Typography children={`קומה ${apartment.floor}`} />
            <Typography children={`${apartment.sizeInSqMeters} מ"ר`} />
          </Stack>

          <Typography
            color="text.secondary"
            children={`${apartment.address} ${apartment.city}`}
          />
        </Stack>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={goToApartmentDetails}
          size="small"
        >
          ראה עוד
        </Button>
      </CardActions>
    </Card>
  );
};
