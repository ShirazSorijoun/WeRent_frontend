import React from 'react';
import { IApartment } from '@/models/apartment.model';

import { OwnerApartmentMatches } from '../ownerApartmentMatches';
import { IMatch } from '@/models/match.model';
import { BasicUserApartmentCard } from '../../basicUserApartmentCard';

interface IUserApartmentCardProps {
  apartment: IApartment;
  matchesList: IMatch[];
}

export const OwnerApartmentCard: React.FC<IUserApartmentCardProps> = ({
  apartment,
  matchesList,
}) => {
  return (
    <BasicUserApartmentCard
      apartment={apartment}
      cardActions={<OwnerApartmentMatches matchesList={matchesList} />}
    />
  );
};
