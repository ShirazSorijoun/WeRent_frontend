import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { ILeaseAgreement } from '@/models/leaseAgreement';
import { api, serverURL } from '@/api';
import { LeaseAgreementAddSignature } from '../leaseAgreementAddSignature';

interface IProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => void;
  lease: ILeaseAgreement;
}

export const LeaseAgreementDIsplayOrSignDialog: React.FC<IProps> = ({
  handleCancel,
  completeSave,
  isOpen,
  lease,
}) => {
  const handleCloseDialog = (
    event: React.MouseEvent<HTMLButtonElement>,
    reason: string,
  ) => {
    event.stopPropagation();
    if (reason && reason === 'backdropClick') {
      return;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      fullWidth
      PaperProps={{ sx: { height: '100%' } }}
    >
      <DialogTitle>חוזה שכירות בלתי מוגנת</DialogTitle>
      <DialogContent>
        <div
          style={{
            width: '100%',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <iframe
            src={`${serverURL + api.leaseAgreement.LEASE_API_KEY}/render/${lease._id}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Lease Agreement"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <LeaseAgreementAddSignature
          handleCancel={handleCancel}
          lease={lease!}
          completeSave={completeSave}
        />
      </DialogActions>
    </Dialog>
  );
};
