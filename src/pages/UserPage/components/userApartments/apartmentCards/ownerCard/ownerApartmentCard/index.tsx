import React, { useMemo } from 'react';
import { IApartment } from '@/models/apartment.model';

import { OwnerApartmentMatches } from '../ownerApartmentMatches';
import { IMatch } from '@/models/match.model';
import { BasicUserApartmentCard } from '../../basicUserApartmentCard';
import { SendToApartmentPersonalArea } from '@@/sendToApartmentPersonalArea';

interface IUserApartmentCardProps {
  apartment: IApartment;
  matchesList: IMatch[];
  refreshData?: () => void;
}

export const OwnerApartmentCard: React.FC<IUserApartmentCardProps> = ({
  apartment,
  matchesList,
  refreshData,
}) => {
  const cardActions = useMemo(
    () =>
      apartment.leaseId ? (
        <SendToApartmentPersonalArea apartmentId={apartment._id} />
      ) : (
        <OwnerApartmentMatches
          matchesList={matchesList}
          refreshData={refreshData}
        />
      ),
    [apartment, matchesList, refreshData],
  );

  return (
    <BasicUserApartmentCard apartment={apartment} cardActions={cardActions} />
  );
};
