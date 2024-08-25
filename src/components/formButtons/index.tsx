import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';

interface IProps {
  isLoading: boolean;
  handleCancel: () => void;
  handleSave: () => void;
}

export const FormButtons: React.FC<IProps> = ({
  handleCancel,
  handleSave,
  isLoading,
}) => {
  return (
    <>
      <Button variant="contained" color="error" onClick={handleCancel}>
        בטל
      </Button>
      <LoadingButton
        type="submit"
        variant="contained"
        color="success"
        loading={isLoading}
        onClick={handleSave}
      >
        שמור
      </LoadingButton>
    </>
  );
};
