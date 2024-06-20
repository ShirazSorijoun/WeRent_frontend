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

interface IEditApartmentFormBodyProps {
  control: Control<any>;
}

export const EditApartmentFormBody: React.FC<IEditApartmentFormBodyProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.text}
        fieldData={editFormDataObject[EEditApartmentFields.CITY]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.text}
        fieldData={editFormDataObject[EEditApartmentFields.ADDRESS]}
      />
      <ControlledSelect
        valuesArray={typeFieldValues}
        control={control}
        fieldData={editFormDataObject[EEditApartmentFields.TYPE]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.FLOOR]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.NUM_OF_FLOORS]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.SIZE_IN_SQ_METER]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.int}
        fieldData={editFormDataObject[EEditApartmentFields.PRICE]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.date}
        fieldData={editFormDataObject[EEditApartmentFields.ENTRY_DATE]}
      />
      <ControlledSelect
        valuesArray={furnitureFieldValues}
        control={control}
        fieldData={editFormDataObject[EEditApartmentFields.FURNITURE]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.text}
        fieldData={editFormDataObject[EEditApartmentFields.DESCRIPTION]}
      />
      <BasicFieldController
        isWithLabel
        control={control}
        type={EBasicFieldType.text}
        fieldData={editFormDataObject[EEditApartmentFields.PHONE]}
      />
    </>
  );
};
