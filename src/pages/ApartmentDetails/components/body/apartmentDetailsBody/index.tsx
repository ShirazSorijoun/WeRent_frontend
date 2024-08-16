import React, { useEffect, useState } from 'react';
import { useGetImageUrlFromName } from '@/hooks';
import { Card } from 'react-bootstrap';
import { ApartmentData } from '../apartmentData';
import Button from '@mui/material/Button';
import { api } from '@/api';
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
  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);
  const [isMatched, setIsMatched] = React.useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const fetchMatchingList = async () => {
    const matchingListFromBE = await api.apartment.getMatchingList(apartmentId);
    setIsAccepted(
      matchingListFromBE.some(
        (match) =>
          match.user._id === localStorage.getItem('userId') && match.accepted,
      ),
    );
  };

  const matchApartment = async () => {
    const userId = localStorage.getItem('userId')!;
    await api.apartment.matchApartment(apartmentId, userId);
    setIsMatched(true);
  };

  useEffect(() => {
    fetchMatchingList();
  }, []);

  return (
    <Card.Body style={{ overflow: 'auto' }}>
      <div className="row g-3 card-body-div">
        <div className="css-1752boj e142rc1o2">
          {!isCreatedByUser &&
            !isAccepted &&
            (!isMatched ? (
              <Button onClick={matchApartment}>I like this apartment!</Button>
            ) : (
              'You have already matched with this apartment!'
            ))}
          {isAccepted && <div>You have been accepted to this apartment! </div>}
          <div className="col-md-6">
            <img
              src={apartmentImage}
              alt="Apartment"
              className="img-fluid mb-4"
            />
          </div>

          <ApartmentData
            apartment={apartment}
            apartmentId={apartmentId}
            isCreatedByUser={isCreatedByUser}
          />
        </div>
      </div>
    </Card.Body>
  );
};
