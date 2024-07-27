import React from 'react';
import { Control } from 'react-hook-form';
import {
  initialTenantQuestionnaireFormDataObject,
  EInitialTenantQuestionnaireFields,
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
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText} // Assuming multiLineText for comments
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.PROPERTY_CONDITION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.RECEIVED_INFORMATION
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.TRANSITION_PROBLEMS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.rating}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.SATISFACTION_RATING
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.boolean}
        otherProps={{ noPlaceHolder: true }}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS
          ]
        }
      />
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          initialTenantQuestionnaireFormDataObject[
            EInitialTenantQuestionnaireFields.FIRST_IMPRESSION
          ]
        }
      />
    </>
  );
};
