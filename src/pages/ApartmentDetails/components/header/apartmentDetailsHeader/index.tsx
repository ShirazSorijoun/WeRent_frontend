import React from 'react';
import { ApartmentDeleteButton } from '../apartmentDeleteButton';
import { ApartmentEditButton } from '../apartmentEditButton';

interface IApartmentDetailsHeaderProps {
  apartmentId: string;
}

export const ApartmentDetailsHeader: React.FC<IApartmentDetailsHeaderProps> = ({
  apartmentId,
}) => {
  return (
    <>
      <ApartmentEditButton apartmentId={apartmentId} />
      <ApartmentDeleteButton apartmentId={apartmentId} />
    </>
  );
};
