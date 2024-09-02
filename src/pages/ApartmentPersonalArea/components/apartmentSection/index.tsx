import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { apartmentFurnitureObject, IApartment } from '@/models/apartment.model';
import { Box, Typography } from '@mui/material';

interface IProps {
  apartmentDetails?: IApartment;
}
export const ApartmentSection: React.FC<IProps> = ({ apartmentDetails }) => {
  return (
    <Card style={{ textAlign: 'right', direction: 'rtl' }}>
      <Card.Header style={{ textAlign: 'right' }}>פרטי דירה</Card.Header>
      <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>רחוב:</Typography>
            <Typography>
              {apartmentDetails?.address ?? 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>עיר:</Typography>
            <Typography>{apartmentDetails?.city ?? 'מידע לא זמין'}</Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>מספר חדרים:</Typography>
            <Typography>
              {apartmentDetails?.numberOfFloors ?? 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>קומה:</Typography>
            <Typography>{apartmentDetails?.floor ?? 'מידע לא זמין'}</Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>גודל הדירה:</Typography>
            <Typography>
              {apartmentDetails?.sizeInSqMeters !== undefined
                ? `${apartmentDetails.sizeInSqMeters} מטר`
                : 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>ריהוט:</Typography>
            <Typography>
              {apartmentDetails?.furniture
                ? apartmentFurnitureObject[apartmentDetails.furniture]
                : 'מידע לא זמין'}{' '}
            </Typography>
          </Box>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
