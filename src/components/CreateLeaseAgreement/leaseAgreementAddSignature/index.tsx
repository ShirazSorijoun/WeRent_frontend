import React, { useState } from 'react';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { DigitalSignatureButton } from '@@/digitalSignatureDialog';
import { Button, Grid, Stack } from '@mui/material';
import { api } from '@/api';

interface IProps {
  handleCancel: () => void;
  lease: ILeaseAgreement;
}

export const LeaseAgreementAddSignature: React.FC<IProps> = ({
  handleCancel,
  lease,
}) => {
  const [signature, setSignature] = useState<string>('');

  const handleSaveSignature = async () => {
    const signatureBlob: Promise<Blob> = (await fetch(signature)).blob();

    const signatureBlobValue = await signatureBlob;

    const signatureAsFile = new File([signatureBlobValue], 'signature.png', {
      type: 'image/png',
    });

    const signatureUrl = await api.file.uploadImage(signatureAsFile);
    await api.leaseAgreement.addSignatureToLease(signatureUrl, lease._id);
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
