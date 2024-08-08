import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { ControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage3: React.FC<ControlProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR
          ]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.SUBTENANT]
        }
      />
    </>
  );
};
