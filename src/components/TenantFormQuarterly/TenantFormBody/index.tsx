import React from 'react';
import { Control } from 'react-hook-form';
import {
  quarterlyTenantQuestionnaireFormDataObject,
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
        type={EBasicFieldType.rating}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PROPERTY_CONDITION_RATING
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.MAINTENANCE_ISSUES
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.rating}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RESPONSE_TIME_SATISFACTION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.rating}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.OWNER_RESPONSIVENESS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.enum}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RENEWAL_CONSIDERATION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.enum}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.enum}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RESOLUTION_TIME
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.ISSUES_RESOLVED_TO_SATISFACTION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.enum}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.rating}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.COMMUNICATION_SKILLS_RATING
          ]
        }
      />
    </>
  );
};
