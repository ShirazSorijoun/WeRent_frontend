import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController, ControlledSelect } from '@@/common/formFields';
import React from 'react';
import { Control } from 'react-hook-form';
import {
  editFormDataObject,
  EEditApartmentFields,
  furnitureFieldValues,
  typeFieldValues,
} from '../formUtils';
import { style } from './style';

interface IEditApartmentFormBodyProps {
  control: Control<any>;
}

export const EditApartmentFormBody: React.FC<IEditApartmentFormBodyProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editFormDataObject[EEditApartmentFields.CITY]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editFormDataObject[EEditApartmentFields.ADDRESS]}
      />
      <ControlledSelect
        valuesArray={typeFieldValues}
        control={control}
        fieldData={editFormDataObject[EEditApartmentFields.TYPE]}
        formControlSX={style.selectFormInput}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.FLOOR]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.NUM_OF_FLOORS]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.SIZE_IN_SQ_METER]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.PRICE]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={editFormDataObject[EEditApartmentFields.ENTRY_DATE]}
      />
      <ControlledSelect
        valuesArray={furnitureFieldValues}
        control={control}
        fieldData={editFormDataObject[EEditApartmentFields.FURNITURE]}
        formControlSX={style.selectFormInput}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={editFormDataObject[EEditApartmentFields.DESCRIPTION]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editFormDataObject[EEditApartmentFields.PHONE]}
      />
    </>
  );
};
