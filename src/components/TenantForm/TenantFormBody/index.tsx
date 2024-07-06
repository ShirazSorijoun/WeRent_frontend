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
        type={EBasicFieldType.text} // Assuming it's a select for yes/no
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RENTAL_AGREEMENT
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a textarea for comments
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a select for yes/no
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_INFORMATION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a textarea for comments
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a select for yes/no
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a textarea for comments
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a select for yes/no
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.QUESTIONS_ADDRESSED
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a textarea for comments
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a select for yes/no
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_CONDITION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a textarea for comments
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a select for yes/no
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RECEIVED_INFORMATION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a textarea for comments
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.TRANSITION_PROBLEMS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.SATISFACTION_RATING
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text} // Assuming it's a select for yes/no
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.MAINTENANCE_REQUESTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.text}
        fieldData={
          tenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.FIRST_IMPRESSION
          ]
        }
      />
    </>
  );
};

export default FormTenantFormBody;
