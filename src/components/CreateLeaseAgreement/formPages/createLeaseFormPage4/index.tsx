import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController, ControlledSelect } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  guaranteeFieldValues,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { ControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage4: React.FC<ControlProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY
          ]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.PROMISSORY_NOTE]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.float}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT
          ]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.LETTER_OF_GUARANTEE
          ]
        }
      />

      <ControlledSelect
        valuesArray={guaranteeFieldValues}
        control={control}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.GUARANTEE]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.float}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.GUARANTEE_AMOUNT]
        }
      />
    </>
  );
};
