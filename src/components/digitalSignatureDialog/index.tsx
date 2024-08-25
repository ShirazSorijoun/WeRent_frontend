import React, { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

interface IProps {
  signature: string;
  saveSignature: (signature: string) => void;
}

export const DigitalSignatureButton: React.FC<IProps> = ({
  signature,
  saveSignature,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const handleClear = () => {
    sigCanvas.current?.clear();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleClear();
    setOpen(false);
  };

  const handleSave = () => {
    if (sigCanvas.current) {
      saveSignature(
        sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'),
      );
      setOpen(false);
    } else handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {signature ? 'שנה חתימה' : 'הוסף חתימה'}
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
        <DialogTitle>החתימה שלך</DialogTitle>
        <DialogContent>
          <SignatureCanvas
            penColor="black"
            ref={sigCanvas}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Stack direction="row" spacing={3} useFlexGap>
            <Button onClick={handleClose} variant="contained" color="error">
              בטל
            </Button>
            <Button onClick={handleClear} variant="contained" color="secondary">
              נקה
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              שמור
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
