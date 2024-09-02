import React, { useEffect, useMemo, useState } from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';
import { api } from '@/api';
import { IUserData, defaultUserData } from '@/models';
import { IApartment, defaultApartment } from '@/models/apartment.model';
import { selectUser } from '@/stores/user';
import { useAppSelector } from '@/hooks';
import { Box, Stack, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { differenceInMonths } from 'date-fns';

interface IProps extends IControlProps {
  tenantId: string;
  apartmentId: string;
}

export const CreateLeaseAgreementFormPage1: React.FC<IProps> = ({
  control,
  tenantId,
  apartmentId,
}) => {
  const [apartment, setApartment] = useState<IApartment>(defaultApartment);
  const [tenantData, setTenantData] = useState<IUserData>(defaultUserData);
  const ownerData = useAppSelector(selectUser);

  useEffect(() => {
    const fetchApartmentData = async (): Promise<void> => {
      if (apartmentId) {
        try {
          const apartmentData =
            await api.apartment.getApartmentById(apartmentId);
          setApartment(apartmentData);
        } catch (error) {
          console.error('Error fetching tenant data for lease form', error);
        }
      }
    };
    fetchApartmentData();
  }, [apartmentId]);

  useEffect(() => {
    const fetchTenantData = async () => {
      if (tenantId) {
        try {
          const tenant = await api.user.getUserById(tenantId);
          setTenantData(tenant);
        } catch (error) {
          console.error('Error fetching tenant data', error);
        }
      }
    };

    fetchTenantData();
  }, [tenantId]);

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

  const monthDifference = useMemo(
    () =>
      endDate && startDate
        ? `${differenceInMonths(endDate, startDate)} חודשים`
        : '(בחר תאריכים על מנת להציג)',

    [endDate, startDate],
  );

  return (
    <Box sx={{ direction: 'rtl' }}>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.DATE]}
      />
      <Typography align="center">בין</Typography>
      <Stack alignItems="center">
        <Typography>
          {ownerData.firstName} {ownerData.lastName},
        </Typography>
        <Typography>ת.ז מספר: {ownerData.personalId},</Typography>
        <Typography>
          מרחוב {ownerData.streetAddress}, ב- {ownerData.cityAddress}
        </Typography>
        <Typography> "להלן "בעל הדירה</Typography>
      </Stack>
      <Typography>מצד אחד</Typography>
      <Typography align="center">לבין</Typography>
      <Stack alignItems="center">
        <Typography>
          {tenantData.firstName} {tenantData.lastName},
        </Typography>
        <Typography>ת.ז מספר: {tenantData.personalId},</Typography>
        <Typography>
          מרחוב {tenantData.streetAddress}, ב- {tenantData.cityAddress}
        </Typography>
        <Typography> "להלן "השוכר</Typography>
      </Stack>
      <Typography sx={{ marginBottom: '60px' }}>מצד שני</Typography>

      <Typography fontWeight="bold">1. מבוא</Typography>
      <Typography
        sx={{
          paddingRight: '30px',
        }}
      >
        1.1. בעל הדירה הינו בעל הזכויות הרשום של דירה בת {apartment.rooms} חדרים
        על הצמדותה, המצויה בקומה {apartment.floor}, ברחוב {apartment.address},
        בעיר {apartment.city} (להלן "הדירה").
      </Typography>
      <Typography
        sx={{
          paddingRight: '30px',
        }}
      >
        2.1. בעל הדירה מעוניין להשכיר את הדירה לשוכר, והשוכר מעוניין לשכור את
        הדירה מבעל הדירה בשכירות בלתי מוגנת, בכפוף לתנאים ולהתחייבויות המפורטים
        בחוזה זה להלן;
      </Typography>

      <Typography align="center" fontWeight="bold" sx={{ margin: '10px' }}>
        לפיכך מוסכם ומותנה בין הצדדים כי:
      </Typography>

      <Typography fontWeight="bold">2. הצהרות הצדדים</Typography>

      <Typography
        sx={{
          paddingRight: '30px',
        }}
      >
        1.2. בעל הדירה מצהיר כדלקמן:
      </Typography>
      <Typography
        sx={{
          paddingRight: '45px',
        }}
      >
        1.1.2. כי לא העניק לצד שלישי זכות חזקה נוגדת על הדירה, כי אין כל מניעה
        חוקית לשימוש בדירה לצרכי מגורים ולהתקשרותו של בעל הדירה בחוזה זה.
      </Typography>
      <Typography
        sx={{
          paddingRight: '45px',
        }}
      >
        2.1.2. כי הדירה ראויה למגורים וכי הדירה נמסרת לשוכר כשהיא ריקה מכל אדם
        וחפץ, מלבד הפריטים המפורטים ברשימת התכולה המצורפת כנספח א' לחוזה זה
        (להלן: "רשימת תכולה") וכי התכולה היא חלק בלתי נפרד מן הדירה.
      </Typography>
      <Typography
        sx={{
          paddingRight: '30px',
        }}
      >
        2.2. השוכר מצהיר כדלקמן:
      </Typography>
      <Typography
        sx={{
          paddingRight: '45px',
          marginBottom: '30px',
        }}
      >
        1.2.2. כי קרא והבין את הוראות חוזה זה וכי ראה ובדק את מצבה הפיזי של
        הדירה ומצא אותה במצבה כפי שהיא (As-Is) מתאימה למטרותיו ובמצב תקין וראוי
        לשימוש, בכפוף לפגמים המפורטים בפרוטוקול המצורף כנספח ב' לחוזה זה (להלן:
        "פרוטוקול מצב הדירה") והוא מוותר על כל טענה בקשר לכך.
      </Typography>

      <Typography fontWeight="bold">3. מטרת השכירות</Typography>

      <Typography
        sx={{
          paddingRight: '20px',
          marginBottom: '30px',
        }}
      >
        השוכר מתחייב כי בכל תקופת השכירות, השימוש אשר ייעשה בדירה (על כל חלקיה)
        יהיה למטרת מגורים בלבד.
      </Typography>

      <Typography fontWeight="bold">4. תקופת השכירות</Typography>

      <Typography
        sx={{
          paddingRight: '30px',
        }}
      >
        1.4. מוסכם על הצדדים כי תקופת השכירות בדירה תהיה בת {monthDifference},
      </Typography>
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
      <Typography>(להלן "תקופת השכירות").</Typography>
    </Box>
  );
};
