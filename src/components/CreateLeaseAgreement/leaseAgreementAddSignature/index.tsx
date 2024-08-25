import React, { useState } from 'react';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { selectUserId } from '@/stores/user';
import { useAppSelector } from '@/hooks';
import { DigitalSignatureButton } from '@@/digitalSignatureDialog';
import { Button, Grid, Stack } from '@mui/material';

interface IProps {
  handleCancel: () => void;
  lease?: ILeaseAgreement;
}

export const LeaseAgreementAddSignature: React.FC<IProps> = ({
  handleCancel,
  lease,
}) => {
  const [signature, setSignature] = useState<string>('');
  const userId = useAppSelector(selectUserId);

  const handleSaveSignature = () => {
    handleCancel();
  };

  return (
    <Grid
      container
      sx={{ direction: 'rtl' }}
      alignItems="center"
      direction="row"
      justifyContent="space-between"
    >
      <Grid item>
        <Stack spacing={2} direction="row" useFlexGap>
          <Button variant="contained" color="inherit" onClick={handleCancel}>
            סגור חוזה
          </Button>
          <Button
            variant="contained"
            disabled={!signature}
            color="success"
            onClick={handleSaveSignature}
          >
            אשר חתימה
          </Button>
          <DigitalSignatureButton
            saveSignature={setSignature}
            signature={signature}
          />
        </Stack>
      </Grid>

      <Grid item sx={{ display: 'flex' }}>
        {signature && (
          <img
            src={signature}
            alt="Signature"
            style={{
              display: 'block',
              border: '1px solid black',
              width: 200,
              height: 80,
              marginLeft: 20,
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};
