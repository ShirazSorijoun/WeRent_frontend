import React from 'react';
import { Control } from 'react-hook-form';
import {
  leaseAgreementFormDataObject,
  ELeaseAgreementFields,
  paymentMethodFieldValues,
  guaranteeFieldValues,
} from '../formUtils';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController, ControlledSelect } from '@@/common/formFields';

interface IFormLeaseAgreementFormBodyProps {
  control: Control<any>;
}

export const FormLeaseAgreementFormBody: React.FC<
  IFormLeaseAgreementFormBodyProps
> = ({ control }) => {
  return (
    <>
      {/* Section 1: Lease Dates */}
      <section>
        <h2>חוזה שכירות בלתי מוגנת</h2>
        <p>שנערך ונחתם ביום</p>

        <BasicFieldController
          control={control}
          type={EBasicFieldType.date}
          fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.DATE]}
        />
      </section>

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

      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.MAX_NUM_OF_MONTHS_INCLUDE_OPTION_PERIOD
          ]
        }
      />

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

      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.ANIMAL]}
      />
    </>
  );
};
