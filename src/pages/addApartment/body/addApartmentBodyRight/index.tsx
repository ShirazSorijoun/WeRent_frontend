import { EBasicFieldType } from '@/models';
import { ControlledSelect, BasicFieldController } from '@@/common/formFields';
import { apartmentFormDataObject, EApartmentFields } from '../../formUtils';
import { style } from './style';
import { Grid } from '@mui/material';
import React from 'react';
import { Control } from 'react-hook-form';
import {
  apartmentFurnitureFieldValues,
  apartmentTypeFieldValues,
} from '@/models/apartment.model';

interface IProps {
  control: Control<any>;
}

export const AddApartmentBodyRight: React.FC<IProps> = ({ control }) => {
  return (
    <Grid container direction="column">
      <Grid item container direction="row" justifyContent="space-between">
        <Grid item sx={style.numApartmentDetailsRowItem}>
          <BasicFieldController
            control={control}
            fieldData={apartmentFormDataObject[EApartmentFields.CITY]}
          />
        </Grid>
        <Grid item sx={style.numApartmentDetailsRowItem}>
          <BasicFieldController
            control={control}
            fieldData={apartmentFormDataObject[EApartmentFields.ADDRESS]}
          />
        </Grid>
        <Grid item sx={style.numApartmentDetailsRowItem}>
          <ControlledSelect
            valuesArray={apartmentTypeFieldValues}
            control={control}
            fieldData={apartmentFormDataObject[EApartmentFields.TYPE]}
            formControlSX={style.selectFormInput}
          />
        </Grid>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between">
        <Grid item sx={style.numApartmentDetailsRowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.int}
            fieldData={apartmentFormDataObject[EApartmentFields.FLOOR]}
          />
        </Grid>
        <Grid item sx={style.numApartmentDetailsRowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.int}
            fieldData={apartmentFormDataObject[EApartmentFields.NUM_OF_FLOORS]}
          />
        </Grid>
        <Grid item sx={style.numApartmentDetailsRowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.int}
            fieldData={apartmentFormDataObject[EApartmentFields.NUM_OF_ROOMS]}
          />
        </Grid>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between">
        <Grid item>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.int}
            fieldData={
              apartmentFormDataObject[EApartmentFields.SIZE_IN_SQ_METER]
            }
          />
        </Grid>
        <Grid item>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.int}
            fieldData={apartmentFormDataObject[EApartmentFields.PRICE]}
          />
        </Grid>
      </Grid>
      <Grid item>
        <BasicFieldController
          control={control}
          type={EBasicFieldType.date}
          fieldData={apartmentFormDataObject[EApartmentFields.ENTRY_DATE]}
        />
      </Grid>
      <Grid item>
        <ControlledSelect
          valuesArray={apartmentFurnitureFieldValues}
          control={control}
          fieldData={apartmentFormDataObject[EApartmentFields.FURNITURE]}
          formControlSX={style.selectFormInput}
        />
      </Grid>
    </Grid>
  );
};
