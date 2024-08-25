import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { selectUserId } from '@/stores/user';
import { useAppSelector } from '@/hooks';

interface IProps {
  handleCancel: () => void;
  lease?: ILeaseAgreement;
}

export const LeaseAgreementFormDigitalSignature: React.FC<IProps> = ({
  handleCancel,
  lease,
}) => {
  const userId = useAppSelector(selectUserId);

  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const closeCard = () => {
    sigCanvas.current?.clear();
    handleCancel();
  };

  const saveSignature = () => {
    if (sigCanvas.current?.isEmpty()) {
      toast.error('Please provide a signature first.');
      return;
    }
    const signatureData = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL('image/png');
    if (signatureData) {
      // onSave(signatureData);
    }
  };

  return !lease ? (
    <Button variant="outlined" color="secondary" onClick={closeCard}>
      סגור
    </Button>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        width: '100%',
        maxWidth: 400,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Please Sign Below
      </Typography>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
        backgroundColor="#f5f5f5"
        penColor="black"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={saveSignature}>
          שמור חתימה
        </Button>
        <Button variant="outlined" color="secondary" onClick={closeCard}>
          חזור
        </Button>
      </Box>
    </Box>
  );
};
