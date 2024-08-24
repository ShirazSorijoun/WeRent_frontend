/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
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

  // Navigate to the personal area page when the button is clicked
  const goToPersonalArea = (): void => {
    navigate(`/ApartmentPersonalArea/${lease.apartment._id}`);
  };

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
          לצפייה בחוזה
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
            handleCancel={closeLeaseDialog}
            completeSave={completeSave}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
