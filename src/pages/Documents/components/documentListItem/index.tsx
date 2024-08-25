/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { useAppSelector } from '@/hooks';
import { selectUserId } from '@/stores/user';
import { LeaseAgreementFormDialog } from '@@/CreateLeaseAgreement';

interface IProps {
  lease: ILeaseAgreement;
  refreshList: () => void;
}

export const DocumentsListItem: React.FC<IProps> = ({ lease, refreshList }) => {
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
    await refreshList();
  }, [refreshList]);

  const isNeedSignature = useMemo(
    () =>
      userId === lease.tenantId
        ? !lease.tenantSignature
        : !lease.ownerSignature,
    [lease, userId],
  );

  return (
    <TableRow key={lease._id}>
      <TableCell align="right">
        {lease.apartment.owner === userId ? 'משכיר' : 'שוכר'}
      </TableCell>
      <TableCell align="right">
        {lease.apartment.city + ' ' + lease.apartment.address}
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={openLeaseDialog}>
          {isNeedSignature ? 'לחתימה על החוזה' : 'לצפייה בחוזה'}
        </Button>
        {leaseDialogOpen && (
          <LeaseAgreementFormDialog
            isOpen={leaseDialogOpen}
            lease={lease}
            isForSignature
            handleCancel={closeLeaseDialog}
            completeSave={completeSave}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
