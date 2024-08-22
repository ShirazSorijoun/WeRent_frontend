import { EBasicFieldType } from '@/models';
import {
  BasicFieldController,
  ControlledMultiCheckedBox,
} from '@@/common/formFields';
import { apartmentFormDataObject, EApartmentFields } from '../../formUtils';
import React from 'react';
import { Control } from 'react-hook-form';
import { apartmentFeatures } from '@/models/apartment.model';

interface IProps {
  control: Control<any>;
}

export const AddApartmentBodyLeft: React.FC<IProps> = ({ control }) => {
  return (
    <>
      <ControlledMultiCheckedBox
        options={apartmentFeatures}
        control={control}
        fieldData={apartmentFormDataObject[EApartmentFields.FEATURES]}
        optionsColumns={3}
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={apartmentFormDataObject[EApartmentFields.DESCRIPTION]}
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.image}
        fieldData={apartmentFormDataObject[EApartmentFields.IMAGE]}
      />
    </>
  );
};
