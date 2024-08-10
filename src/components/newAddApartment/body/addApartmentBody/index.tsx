import { Grid } from '@mui/material';
import React from 'react';
import { Control } from 'react-hook-form';
import { AddApartmentBodyRight } from '../addApartmentBodyRight';
import { AddApartmentBodyLeft } from '../addApartmentLeft';
import { style } from './style';

interface IProps {
  control: Control<any>;
}

export const AddApartmentBody: React.FC<IProps> = ({ control }) => {
  return (
    <Grid container direction="row">
      <Grid item flex={1} sx={style.formGridItem}>
        <AddApartmentBodyRight control={control} />
      </Grid>
      <Grid item flex={1} sx={style.formGridItem}>
        <AddApartmentBodyLeft control={control} />
      </Grid>
    </Grid>
  );
};
