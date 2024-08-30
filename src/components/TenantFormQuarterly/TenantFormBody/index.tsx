import React from 'react';
import { Control } from 'react-hook-form';
import {
  quarterlyTenantQuestionnaireFormDataObject,
  ETenantQuestionnaireFields,
} from '../formUtils';
import { EBasicFieldType, IControlledSelectArray } from '@/models/forms';
import { BasicFieldController, ControlledSelect } from '@@/common/formFields';
import { style } from './style';

interface IFormTenantFormBodyProps {
  control: Control<any>;
}

const Responsetimetorequests: IControlledSelectArray<string> = [
  { display: 'תוך 24 שעות', value: 'Within 24 hours' },
  { display: '1-3 ימים', value: '1-3 days' },
  { display: '4-7 ימים', value: '4-7 days' },
  { display: 'יותר משבוע', value: 'More than a week' },
];

const renewalConsideration: IControlledSelectArray<string> = [
  { display: 'כן', value: 'Yes' },
  { display: 'לא', value: 'No' },
  { display: 'מתלבט', value: 'Undecided' },
];

const methodCommunication: IControlledSelectArray<string> = [
  { display: 'טלפון', value: 'Phone' },
  { display: 'אימייל', value: 'Email' },
  { display: 'הודעות', value: 'Text' },
  { display: 'אישי', value: 'Personal' },
];

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
      <ControlledSelect
        valuesArray={renewalConsideration}
        control={control}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RENEWAL_CONSIDERATION
          ]
        }
        formControlSX={style.selectFormInput}
      />
      <ControlledSelect
        valuesArray={Responsetimetorequests}
        control={control}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS
          ]
        }
        formControlSX={style.selectFormInput}
      />
      <ControlledSelect
        valuesArray={Responsetimetorequests}
        control={control}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.RESOLUTION_TIME
          ]
        }
        formControlSX={style.selectFormInput}
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
      <ControlledSelect
        valuesArray={methodCommunication}
        control={control}
        fieldData={
          quarterlyTenantQuestionnaireFormDataObject[
            ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD
          ]
        }
        formControlSX={style.selectFormInput}
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
