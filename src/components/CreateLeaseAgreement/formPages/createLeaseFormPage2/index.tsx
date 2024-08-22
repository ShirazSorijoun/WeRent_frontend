import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController, ControlledSelect } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
  paymentMethodFieldValues,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage2: React.FC<IControlProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.float}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH
          ]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT
          ]
        }
      />

      <ControlledSelect
        valuesArray={paymentMethodFieldValues}
        control={control}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.PAYMENT_METHOD]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.NAME_OF_BANK]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.BANK_ACCOUNT_NUMBER
          ]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.BANK_BRANCH]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.OPTION_PERIOD]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.OPTION_PERIOD_LENGTH
          ]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE
          ]
        }
      />
    </>
  );
};
