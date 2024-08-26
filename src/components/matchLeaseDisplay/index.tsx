import { api } from '@/api';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { LeaseAgreementFormDialog } from '@@/CreateLeaseAgreement';
import { Button } from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';

interface IProps {
  tenantId: string;
  apartmentId: string;
}

export const MatchLeaseDisplay: FC<IProps> = ({ apartmentId, tenantId }) => {
  const [leaseDialogOpen, setLeaseDialogOpen] = useState<boolean>(false);
  const [leaseData, setLeaseData] = useState<ILeaseAgreement>();

  const fetchLeaseData = useCallback(async (): Promise<void> => {
    if (apartmentId && tenantId) {
      try {
        const res = await api.leaseAgreement.getLeaseAgreement(
          tenantId,
          apartmentId,
        );
        setLeaseData(res);
      } catch (error) {
        console.error('Error fetching tenant data for lease form', error);
      }
    }
  }, [apartmentId, tenantId]);

  useEffect(() => {
    fetchLeaseData();
  }, [fetchLeaseData]);

  const openLeaseDialog = (): void => {
    setLeaseDialogOpen(true);
  };

  const closeLeaseDialog = (): void => {
    setLeaseDialogOpen(false);
  };

  const completeSave = useCallback(async () => {
    setLeaseDialogOpen(false);
    await fetchLeaseData();
  }, [fetchLeaseData]);

  return (
    <>
      <Button variant="contained" onClick={openLeaseDialog}>
        {leaseData ? 'ערוך' : 'צור'} חוזה
      </Button>
      {leaseDialogOpen &&
        (leaseData ? (
          <LeaseAgreementFormDialog
            isOpen={leaseDialogOpen}
            lease={leaseData}
            handleCancel={closeLeaseDialog}
            completeSave={completeSave}
          />
        ) : (
          <LeaseAgreementFormDialog
            tenantId={tenantId}
            apartmentId={apartmentId}
            isOpen={leaseDialogOpen}
            handleCancel={closeLeaseDialog}
            completeSave={completeSave}
          />
        ))}
    </>
  );
};