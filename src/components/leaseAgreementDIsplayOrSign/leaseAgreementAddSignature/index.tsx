import React, { useMemo, useState } from 'react';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { DigitalSignatureButton } from '@@/digitalSignatureDialog';
import { Button, Grid, Stack } from '@mui/material';
import { api } from '@/api';
import { useAppSelector } from '@/hooks';
import { selectUserId } from '@/stores/user';
import { imageUrlToFile } from '@/utils/files';
import { getStringOfUrl } from '@/utils/image';

interface IProps {
  handleCancel: () => void;
  completeSave: () => void;
  lease: ILeaseAgreement;
}

export const LeaseAgreementAddSignature: React.FC<IProps> = ({
  handleCancel,
  lease,
  completeSave,
}) => {
  const [signature, setSignature] = useState<string>();

  const userId = useAppSelector(selectUserId);

  const isTenant: boolean = useMemo(
    () => userId === lease?.tenantId,
    [lease, userId],
  );

  const isNeedSignature: boolean = useMemo(
    () =>
      !!lease && (isTenant ? !lease.tenantSignature : !lease.ownerSignature),
    [isTenant, lease],
  );

  const signatureForDisplay = useMemo(
    () =>
      signature ||
      getStringOfUrl(isTenant ? lease.tenantSignature : lease.ownerSignature),
    [isTenant, lease, signature],
  );

  const handleSaveSignature = async () => {
    if (!signature) return;

    const signatureAsFile = await imageUrlToFile(signature);
    const signatureUrl = await api.file.uploadImage(signatureAsFile);
    await api.leaseAgreement.addSignatureToLease(signatureUrl, lease._id);
    completeSave();
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
          {isNeedSignature && (
            <>
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
                signature={signature ?? ''}
              />
            </>
          )}
        </Stack>
      </Grid>

      <Grid item sx={{ display: 'flex' }}>
        {signatureForDisplay && (
          <img
            src={signatureForDisplay}
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
