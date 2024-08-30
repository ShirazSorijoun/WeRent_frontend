import React from 'react';
import { Card } from 'react-bootstrap';
import { ApartmentMatchButton } from '../apartmentMatchButton';
import { useAppSelector } from '@/hooks';
import { selectIsUserAdmin } from '@/stores/user';
import { SendToApartmentPersonalArea } from '@@/sendToApartmentPersonalArea';
import { ApartmentEditButton } from '../apartmentEditButton';
import { ApartmentDeleteButton } from '../apartmentDeleteButton';

interface IProps {
  apartmentId: string;
  isCreatedByUser: boolean;
  isHasLease: boolean;
}

export const ApartmentHeaderContainer: React.FC<IProps> = ({
  apartmentId,
  isCreatedByUser,
  isHasLease,
}) => {
  const isAdmin = useAppSelector(selectIsUserAdmin);

  const HeaderDisplay = (): React.ReactNode => {
    if (isHasLease)
      return <SendToApartmentPersonalArea apartmentId={apartmentId} />;

    if (isCreatedByUser || isAdmin)
      return (
        <>
          <ApartmentEditButton apartmentId={apartmentId} />
          <ApartmentDeleteButton apartmentId={apartmentId} />
        </>
      );

    if (!isCreatedByUser)
      return <ApartmentMatchButton apartmentId={apartmentId} />;

    return <></>;
  };

  return (
    <Card.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '55px',
      }}
    >
      <HeaderDisplay />
    </Card.Header>
  );
};
