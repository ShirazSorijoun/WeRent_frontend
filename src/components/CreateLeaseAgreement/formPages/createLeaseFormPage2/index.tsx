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

    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>דמי שכירות</strong>&nbsp;<strong>.5</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>5.1.</span>
      עבור שכירת הדירה במהלך תקופת השכירות ישלם השוכר לבעל הדירה דמי שכירות 
      <BasicFieldController
        control={control}
        type={EBasicFieldType.float}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />

      &nbsp;ש"ח לחודש (להלן: "דמי השכירות").
      &nbsp;דמי השכירות ישולמו כל 
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
      &nbsp; לחודש.
    </p>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>יש לבחור ולסמן אחת משתי החלופות: </strong>&nbsp;<strong>.5.2</strong>
    </p>


      <ControlledSelect
        valuesArray={paymentMethodFieldValues}
        control={control}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.PAYMENT_METHOD]
        }
      />


    <p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>***</span>
      דמי השכירות ישולמו בהעברה בנקאית שתבוצע לחשבון בנק 
      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.NAME_OF_BANK]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />

      &nbsp;מספר

      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.BANK_ACCOUNT_NUMBER
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
      &nbsp; סניף

      <BasicFieldController
        control={control}
        type={EBasicFieldType.multiLineText}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.BANK_BRANCH]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />

      &nbsp; , בכל

      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />

      &nbsp; לחודש בתקופת השכירות.
    </p>







    <p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>***</span>
      השוכר יפקיד בידי בעל הדירה במעמד  מסירת החזקה במושכר בהתאם להוראות הסכם זה 
      &nbsp; leaseAgreementFormDataObject.END_DATE - leaseAgreementFormDataObject.START_DATE &nbsp;

      &nbsp; המחאות עבור כל אחד מ

      &nbsp; leaseAgreementFormDataObject.END_DATE - leaseAgreementFormDataObject.START_DATE &nbsp;

      &nbsp; חודשי השכירות. 

      &nbsp; מוסכם על הצדדים כי רק פירעון בפועל של כל המחאה והמחאה, ייחשב כתשלום דמי השכירות (אלא אם לא תיפרע המחאה מחמת סיבה הקשורה בבעל הדירה). 
    </p>




    <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.OPTION_PERIOD]
        }
      />

    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>תקופת האופציה</strong>&nbsp;<strong>.6</strong>
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>6.1.</span>
      ניתנת בזאת לשוכר זכות ברירה (אופציה) להאריך את תקופת השכירות לתקופה נוספת אחת בלבד 
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.OPTION_PERIOD_LENGTH
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
        חודשים שתחל מיד עם תום תקופת השכירות (לעיל ולהלן: "תקופת האופציה").
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>6.4.</span>
      מימש השוכר את תקופת האופציה, יחולו כל הוראות חוזה זה כלשונן ובהתאמות המתחייבות גם בתקופת האופציה ובכל מקום בו נכתב תקופת השכירות בחוזה זה, הכוונה תהיה גם לתקופת האופציה. מובהר בזאת שבכל מקרה תקופת השכירות לפי חוזה זה, לרבות תקופת האופציה, לא תעלה על 
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
        חודשים. 
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>6.5.</span>
      מוסכם על הצדדים כי במידה שהשוכר לא מסר הודעה על מימוש תקופת האופציה במועד כאמור בסעיף 6.3.1, תסתיים תקופת השכירות במועד שנקבע בסעיף 4.1 ויחולו כל הוראות החוזה לגבי סיום חוזה זה, לרבות פינוי הדירה והחזרת החזקה לידי בעל הדירה. 
    </p>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>יידוע לקראת סוף תקופת האופציה</strong>&nbsp;<strong>.7</strong>
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>7.1.</span>
      בעל הדירה יודיע לשוכר בכתב 60 (שישים) ימים לפני תום תקופת האופציה, אם מומשה, האם בכוונתו להציע לשוכר את הדירה לתקופת שכירות נוספת ובאיזה תנאים.
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>7.2.</span>
      7.2.	השוכר יודיע לבעל הדירה בכתב לא יאוחר מ-45 (ארבעים וחמישה) ימים לפני תום תקופת האופציה, אם מומשה, האם בכוונתו לקבל את הצעת בעל הדירה כאמור בסעיף 7.1 לעיל.
    </p>

    </>
  );
};
