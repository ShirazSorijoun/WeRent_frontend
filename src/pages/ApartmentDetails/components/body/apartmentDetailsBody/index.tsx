import { ApartmentProps } from '@/types/types';
import React from 'react';
import { useGetImageUrlFromName } from '@/common/hooks';
import { Card } from 'react-bootstrap';
import { ApartmentData } from '../apartmentData';
import { ApartmentImage } from '../apartmentImage';

interface IApartmentDetailsBodyProps {
  refreshApartmentDisplay: () => Promise<void>;
  apartment: ApartmentProps;
  apartmentId: string;
  isCreatedByUser: boolean;
}

export const ApartmentDetailsBody: React.FC<IApartmentDetailsBodyProps> = ({
  refreshApartmentDisplay,
  apartment,
  apartmentId,
  isCreatedByUser,
}) => {
  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);

  return (
    <Card.Body style={{ overflow: 'auto' }}>
      <div className="row g-3 card-body-div">
        <div className="css-1752boj e142rc1o2">
          <ApartmentImage
            apartmentImage={apartmentImage}
            isCreatedByUser={isCreatedByUser}
            apartmentId={apartmentId}
            refreshApartmentDisplay={refreshApartmentDisplay}
          />
          <ApartmentData apartment={apartment} />
        </div>
      </div>
    </Card.Body>
  );
};
