import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { ControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage5: React.FC<ControlProps> = ({
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
