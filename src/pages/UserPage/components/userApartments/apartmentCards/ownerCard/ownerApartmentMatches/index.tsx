import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { IMatch } from '@/models/match.model';
import { toast } from 'react-toastify';
import { ApartmentMatchItem } from '@@/apartmentMatchItem';
interface IApartmentDataProps {
  matchesList: IMatch[];
  refreshData?: () => void;
}
export const OwnerApartmentMatches: React.FC<IApartmentDataProps> = ({
  matchesList,
  refreshData,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.stopPropagation();

    if (matchesList.length) setOpen(true);
    else toast.info('אין שום התאמות לדירה זו');
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {`ההתאמות של דירה זו (${matchesList.length})`}
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        sx={{ direction: 'rtl' }}
      >
        <DialogTitle>ההתאמות של דירה זו</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            {matchesList.map((match) => (
              <ApartmentMatchItem
                key={match._id}
                match={match}
                refreshData={refreshData}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Stack direction="row" spacing={3} useFlexGap>
            <Button onClick={handleClose} variant="contained" color="inherit">
              סגור
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
