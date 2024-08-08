import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { ControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage1: React.FC<ControlProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.DATE]}
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.START_DATE]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.END_DATE]}
      />
    </>
  );
};
