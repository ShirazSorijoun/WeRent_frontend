/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { useAppSelector } from '@/hooks';
import { selectUserId } from '@/stores/user';
import { LeaseAgreementFormDialog } from '@@/CreateLeaseAgreement';
import { useNavigate } from 'react-router';

interface IProps {
  lease: ILeaseAgreement;
  refreshList: () => void;
}

export const DocumentsListItem: React.FC<IProps> = ({ lease, refreshList }) => {
  const navigate = useNavigate();

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

<<<<<<< HEAD
  const isNeedSignature = useMemo(
    () =>
      userId === lease.tenantId
        ? !lease.tenantSignature
        : !lease.ownerSignature,
    [lease, userId],
  );
=======
  // Navigate to the personal area page when the button is clicked
  const goToPersonalArea = (): void => {
    navigate(`/ApartmentPersonalArea/${lease.apartment._id}`);
  };
>>>>>>> 8829f9ff04420374725de24d93421c1c2282bf1d

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
        <Button
          variant="contained"
          color="primary"
          onClick={goToPersonalArea}
          style={{ marginLeft: '20px' }}
        >
          לאזור האישי
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
