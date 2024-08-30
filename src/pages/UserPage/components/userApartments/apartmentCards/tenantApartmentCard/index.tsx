import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IApartment } from '@/models/apartment.model';
import { Typography } from '@mui/material';
import { api } from '@/api';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { SignOrDisplayLease } from '@@/signOrDisplayLease';
import { SendToApartmentPersonalArea } from '@@/sendToApartmentPersonalArea';
import { BasicUserApartmentCard } from '../basicUserApartmentCard';

interface IUserApartmentCardProps {
  apartment: IApartment;
  userId: string;
}

export const TenantApartmentCard: React.FC<IUserApartmentCardProps> = ({
  apartment,
  userId,
}) => {
  const [leaseData, setLeaseData] = useState<ILeaseAgreement>();

  const fetchLeaseData = useCallback(async (): Promise<void> => {
    if (apartment._id && userId) {
      try {
        const res =
          await api.leaseAgreement.getLeaseAgreementByApartmentAndTenant(
            userId,
            apartment._id,
          );
        setLeaseData(res);
      } catch (error) {
        console.error('Error fetching tenant data for lease form', error);
      }
    }
  }, [apartment._id, userId]);

  useEffect(() => {
    if (!apartment.leaseId) fetchLeaseData();
  }, [apartment.leaseId, fetchLeaseData]);

  const cardActions = useMemo(() => {
    if (apartment.leaseId)
      return <SendToApartmentPersonalArea apartmentId={apartment._id} />;
    else if (leaseData)
      return (
        <SignOrDisplayLease lease={leaseData} refreshList={fetchLeaseData} />
      );
    else return <Typography>עדיין לא נוצר חוזה</Typography>;
  }, [apartment._id, apartment.leaseId, fetchLeaseData, leaseData]);

  return (
    <BasicUserApartmentCard apartment={apartment} cardActions={cardActions} />
  );
};
