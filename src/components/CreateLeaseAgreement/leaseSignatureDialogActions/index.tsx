import React, { useMemo } from 'react';

import { LeaseAgreementAddSignature } from '../leaseAgreementAddSignature';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { useAppSelector } from '@/hooks';
import { selectUserId } from '@/stores/user';
import { Button } from '@mui/material';

interface IProps {
  handleCancel: () => void;
  lease?: ILeaseAgreement;
}

export const LeaseSignatureDialogActions: React.FC<IProps> = ({
  handleCancel,
  lease,
}) => {
  const userId = useAppSelector(selectUserId);

  const isNeedSignature: boolean = useMemo(
    () =>
      !!lease &&
      (userId === lease.tenantId
        ? !lease.tenantSignature
        : !lease.ownerSignature),
    [lease, userId],
  );

  return (
    <>
      {isNeedSignature ? (
        <LeaseAgreementAddSignature
          handleCancel={handleCancel}
          lease={lease!}
        />
      ) : (
        <Button variant="contained" color="inherit" onClick={handleCancel}>
          סגור חוזה
        </Button>
      )}
    </>
  );
};
