import React from 'react';
import { Control } from 'react-hook-form';
import {
  tenantQuestionnaireFormDataObject,
  ETenantQuestionnaireFields,
} from '../formUtils';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';

interface IFormTenantFormBodyProps {
  control: Control<any>;
}

export const FormTenantFormBody: React.FC<IFormTenantFormBodyProps> = ({
  control,
}) => {
  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RENTAL_AGREEMENT
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText} // Assuming multiLineText for comments
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_INFORMATION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.QUESTIONS_ADDRESSED
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_CONDITION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RECEIVED_INFORMATION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.TRANSITION_PROBLEMS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.rating}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.SATISFACTION_RATING
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.MAINTENANCE_REQUESTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.FIRST_IMPRESSION
          ]
        }
      />
    </>
  );
};
