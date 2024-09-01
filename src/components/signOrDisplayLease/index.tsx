/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { useAppSelector } from '@/hooks';
import { selectUserId } from '@/stores/user';
import { LeaseAgreementDIsplayOrSignDialog } from '@@/leaseAgreementDIsplayOrSign';

interface IProps {
  lease: ILeaseAgreement;
  refreshList?: () => void;
}

export const SignOrDisplayLease: React.FC<IProps> = ({
  lease,
  refreshList,
}) => {
  const userId = useAppSelector(selectUserId);
  const [leaseDialogOpen, setLeaseDialogOpen] = useState<boolean>(false);

  const openLeaseDialog = (): void => {
    setLeaseDialogOpen(true);
  };

  const closeLeaseDialog = (): void => {
    setLeaseDialogOpen(false);
  };

  const completeSave = useCallback(async () => {
    setLeaseDialogOpen(false);
    if (refreshList) await refreshList();
  }, [refreshList]);

  const isNeedSignature = useMemo(
    () =>
      userId === lease.tenantId
        ? !lease.tenantSignature
        : !lease.ownerSignature,
    [lease, userId],
  );

  return (
    <>
      <Button variant="contained" color="warning" onClick={openLeaseDialog}>
        {isNeedSignature ? 'לחתימה על החוזה' : 'לצפייה בחוזה'}
      </Button>
      {leaseDialogOpen && (
        <LeaseAgreementDIsplayOrSignDialog
          isOpen={leaseDialogOpen}
          lease={lease}
          handleCancel={closeLeaseDialog}
          completeSave={completeSave}
        />
      )}
    </>
  );
};
