import { EBasicFieldType } from '@/models';
import {
  BasicFieldController,
  ControlledMultiCheckedBox,
} from '@@/common/formFields';

import {
  apartmentFormDataObject,
  EApartmentFields,
  apartmentFeatures,
} from '@@/newAddApartment/formUtils';
import React from 'react';
import { Control } from 'react-hook-form';

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
