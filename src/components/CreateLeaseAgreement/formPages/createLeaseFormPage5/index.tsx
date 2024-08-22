import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage5: React.FC<IControlProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.ANIMAL]}
      />
    </>
  );
};
