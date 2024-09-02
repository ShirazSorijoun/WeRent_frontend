import React, { useMemo } from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController, ControlledSelect } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
  paymentMethodFieldValues,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';
import { Box, Stack, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { differenceInMonths } from 'date-fns';

export const CreateLeaseAgreementFormPage2: React.FC<IControlProps> = ({
  control,
}) => {
  const startDate = useWatch({
    control,
    name: leaseAgreementFormDataObject[ELeaseAgreementFields.START_DATE]
      .fieldName,
  });

  const endDate = useWatch({
    control,
    name: leaseAgreementFormDataObject[ELeaseAgreementFields.END_DATE]
      .fieldName,
  });

  const paymentMethod = useWatch({
    control,
    name: leaseAgreementFormDataObject[ELeaseAgreementFields.PAYMENT_METHOD]
      .fieldName,
  });

  const isOptionPeriod = useWatch({
    control,
    name: leaseAgreementFormDataObject[ELeaseAgreementFields.OPTION_PERIOD]
      .fieldName,
  });

  const isCheck = paymentMethod === 'Checks';
  const monthDifference = useMemo(
    () =>
      endDate && startDate
        ? `${differenceInMonths(endDate, startDate)} חודשים`
        : '(בחר תאריכים על מנת להציג)',

    [endDate, startDate],
  );

  return (
    <Box sx={{ direction: 'rtl' }}>
      <Typography fontWeight="bold">5. דמי שכירות</Typography>

      <Stack direction="row" sx={{ marginBottom: '30px' }}>
        <Typography>1.5.</Typography>
        <Box sx={{ paddingRight: '30px' }}>
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
        </Box>
      </Stack>

      <Typography fontWeight="bold">
        2.5. יש לבחור ולסמן אחת משתי החלופות:
      </Typography>

      <ControlledSelect
        valuesArray={paymentMethodFieldValues}
        control={control}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.PAYMENT_METHOD]
        }
      />

      <Stack
        direction="row"
        sx={{ marginBottom: '30px', display: isCheck ? 'none' : 'inherit' }}
      >
        <Typography>***</Typography>
        <Box sx={{ paddingRight: '10px' }}>
          דמי השכירות ישולמו בהעברה בנקאית שתבוצע לחשבון בנק
          <BasicFieldController
            control={control}
            type={EBasicFieldType.multiLineText}
            fieldData={
              leaseAgreementFormDataObject[ELeaseAgreementFields.NAME_OF_BANK]
            }
            sxStyle={{ width: '200px', height: '50px' }}
          />
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
          <BasicFieldController
            control={control}
            type={EBasicFieldType.multiLineText}
            fieldData={
              leaseAgreementFormDataObject[ELeaseAgreementFields.BANK_BRANCH]
            }
            sxStyle={{ width: '200px', height: '50px' }}
          />
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
        </Box>
      </Stack>

      <Stack
        direction="row"
        sx={{ marginBottom: '30px', display: isCheck ? 'inherit' : 'none' }}
      >
        <Typography>***</Typography>
        <Typography sx={{ paddingRight: '10px' }}>
          השוכר יפקיד בידי בעל הדירה במעמד מסירת החזקה במושכר בהתאם להוראות הסכם
          זה {monthDifference} המחאות עבור כל אחד מ{monthDifference} חודשי
          השכירות. &nbsp; מוסכם על הצדדים כי רק פירעון בפועל של כל המחאה והמחאה,
          ייחשב כתשלום דמי השכירות (אלא אם לא תיפרע המחאה מחמת סיבה הקשורה בבעל
          הדירה).
        </Typography>
      </Stack>

      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.OPTION_PERIOD]
        }
      />

      <Box sx={{ display: isOptionPeriod ? 'inherit' : 'none' }}>
        <Typography fontWeight="bold">6. תקופת האופציה</Typography>
        <p
          style={{
            textAlign: 'right',
            paddingRight: '40px',
            position: 'relative',
            direction: 'rtl',
          }}
        >
          <span style={{ position: 'absolute', right: '0', top: '0' }}>
            6.1.
          </span>
          ניתנת בזאת לשוכר זכות ברירה (אופציה) להאריך את תקופת השכירות לתקופה
          נוספת אחת בלבד
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

        <p
          style={{
            textAlign: 'right',
            paddingRight: '40px',
            position: 'relative',
            direction: 'rtl',
          }}
        >
          <span style={{ position: 'absolute', right: '0', top: '0' }}>
            6.4.
          </span>
          מימש השוכר את תקופת האופציה, יחולו כל הוראות חוזה זה כלשונן ובהתאמות
          המתחייבות גם בתקופת האופציה ובכל מקום בו נכתב תקופת השכירות בחוזה זה,
          הכוונה תהיה גם לתקופת האופציה. מובהר בזאת שבכל מקרה תקופת השכירות לפי
          חוזה זה, לרבות תקופת האופציה, לא תעלה על
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

        <p
          style={{
            textAlign: 'right',
            paddingRight: '40px',
            position: 'relative',
            direction: 'rtl',
            marginBottom: '60px',
          }}
        >
          <span style={{ position: 'absolute', right: '0', top: '0' }}>
            6.5.
          </span>
          מוסכם על הצדדים כי במידה שהשוכר לא מסר הודעה על מימוש תקופת האופציה
          במועד כאמור בסעיף 6.3.1, תסתיים תקופת השכירות במועד שנקבע בסעיף 4.1
          ויחולו כל הוראות החוזה לגבי סיום חוזה זה, לרבות פינוי הדירה והחזרת
          החזקה לידי בעל הדירה.
        </p>

        <Typography fontWeight="bold">
          7. יידוע לקראת סוף תקופת האופציה
        </Typography>

        <p
          style={{
            textAlign: 'right',
            paddingRight: '40px',
            position: 'relative',
            direction: 'rtl',
          }}
        >
          <span style={{ position: 'absolute', right: '0', top: '0' }}>
            7.1.
          </span>
          בעל הדירה יודיע לשוכר בכתב 60 (שישים) ימים לפני תום תקופת האופציה, אם
          מומשה, האם בכוונתו להציע לשוכר את הדירה לתקופת שכירות נוספת ובאיזה
          תנאים.
        </p>

        <p
          style={{
            textAlign: 'right',
            paddingRight: '40px',
            position: 'relative',
            direction: 'rtl',
          }}
        >
          <span style={{ position: 'absolute', right: '0', top: '0' }}>
            7.2.
          </span>
          השוכר יודיע לבעל הדירה בכתב לא יאוחר מ-45 (ארבעים וחמישה) ימים לפני
          תום תקופת האופציה, אם מומשה, האם בכוונתו לקבל את הצעת בעל הדירה כאמור
          בסעיף 7.1 לעיל.
        </p>
      </Box>
    </Box>
  );
};
