import React from 'react';
import { EEditUserFields, editUserDataObject } from '../formUtils';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import { IControlProps } from '@/models/form';

export const EditUserFormBody: React.FC<IControlProps> = ({ control }) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editUserDataObject[EEditUserFields.FIRST_NAME]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editUserDataObject[EEditUserFields.LAST_NAME]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editUserDataObject[EEditUserFields.PHONE]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editUserDataObject[EEditUserFields.CITY]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={editUserDataObject[EEditUserFields.ADDRESS]}
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.image}
        fieldData={editUserDataObject[EEditUserFields.IMAGE]}
      />
    </>
  );
};
