import React, { useEffect, useState } from 'react';
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


  return (
    <>
    
    <p style={{ textAlign: 'center'}}>
      שנערך ונחתם ביום    בחודש    ובשנת
      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.DATE]}
      />
      <br/>בין
    </p>

    <p style={{ textAlign: 'center'}}>
      {ownerData.firstName} {ownerData.lastName}, ת.ז מספר {ownerData.personalId} , מרחוב {ownerData.streetAddress} , ב- {ownerData.cityAddress}
      <br/> "להלן "בעל הדירה
    </p>

    <p style={{ textAlign: 'left'}}>
      מצד אחד
    </p>


    <p style={{ textAlign: 'center'}}>
      לבין
    </p>


    <p style={{ textAlign: 'center'}}>
      {tenantData.firstName} {tenantData.lastName}, ת.ז מספר {tenantData.personalId} , מרחוב {tenantData.streetAddress} , ב- {tenantData.cityAddress}
      <br/> "להלן "השוכר
    </p>

    <p style={{ textAlign: 'left'}}>
      מצד שני
    </p>

   <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>מבוא</strong>&nbsp;<strong>.1</strong>
   </p>

   <p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl' }}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>1.1.</span>
      בעל הדירה הינו בעל הזכויות הרשום של דירה בת&nbsp;{apartment.rooms}&nbsp;חדרים על הצמדותה, המצויה בקומה&nbsp;{apartment.floor}, ברחוב {apartment.address}, בעיר {apartment.city}&nbsp;(להלן "הדירה").
   </p>

   <p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl' }}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>1.2.</span>
      בעל הדירה מעוניין להשכיר את הדירה לשוכר, והשוכר מעוניין לשכור את הדירה מבעל הדירה בשכירות בלתי מוגנת, בכפוף לתנאים ולהתחייבויות המפורטים בחוזה זה להלן;
   </p>


  <p style={{ textAlign: 'center', direction: 'rtl' }}>
    <strong>לפיכך מוסכם ומותנה בין הצדדים כי:</strong>
  </p>

  <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>הצהרות הצדדים</strong>&nbsp;<strong>.2</strong>
   </p>


   <p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl'}}>
  <span style={{ position: 'absolute', right: '0', top: '0'}}>2.1.</span>
  בעל הדירה מצהיר כדלקמן:
</p>


<p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
  <span style={{ position: 'absolute', right: '0', top: '0' }}>2.1.1.</span>
  <span style={{ paddingLeft: '40px' }}>
    כי לא העניק לצד שלישי זכות חזקה נוגדת על הדירה, כי אין כל מניעה חוקית לשימוש בדירה לצרכי מגורים ולהתקשרותו של בעל הדירה בחוזה זה.
  </span>
</p>


<p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
  <span style={{ position: 'absolute', right: '0', top: '0' }}>2.1.2.</span>
  <span style={{ paddingLeft: '40px' }}>
  כי הדירה ראויה למגורים וכי הדירה נמסרת לשוכר כשהיא ריקה מכל אדם וחפץ, מלבד הפריטים המפורטים ברשימת התכולה המצורפת כנספח א' לחוזה זה (להלן: "רשימת תכולה") וכי התכולה היא חלק בלתי נפרד מן הדירה.
  </span>
</p>


<p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl'}}>
  <span style={{ position: 'absolute', right: '0', top: '0'}}>2.2.</span>
  השוכר מצהיר כדלקמן: 
</p>


<p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
  <span style={{ position: 'absolute', right: '0', top: '0' }}>2.2.1.</span>
  <span style={{ paddingLeft: '40px' }}>
  כי קרא והבין את הוראות חוזה זה וכי ראה ובדק את מצבה הפיזי של הדירה ומצא אותה במצבה כפי שהיא (As-Is) מתאימה למטרותיו ובמצב תקין וראוי לשימוש, בכפוף לפגמים המפורטים בפרוטוקול המצורף כנספח ב' לחוזה זה (להלן: "פרוטוקול מצב הדירה") והוא מוותר על כל טענה בקשר לכך.
  </span>
</p>


<p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>מטרת השכירות</strong>&nbsp;<strong>.3</strong>
   </p>

   <p style={{ textAlign: 'right', paddingRight: '20px', direction: 'rtl' }}>
  השוכר מתחייב כי בכל תקופת השכירות, השימוש אשר ייעשה בדירה (על כל חלקיה) יהיה למטרת מגורים בלבד.
</p>


<p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>תקופת השכירות</strong>&nbsp;<strong>.4</strong>
</p>

<p style={{ textAlign: 'right', paddingRight: '30px', position: 'relative', direction: 'rtl'}}>
  <span style={{ position: 'absolute', right: '0', top: '0'}}>4.1.</span>
  מוסכם על הצדדים כי תקופת השכירות בדירה תהיה בת 
  &nbsp; leaseAgreementFormDataObject.END_DATE - leaseAgreementFormDataObject.START_DATE &nbsp;
  &nbsp; חודשים,
  &nbsp; כך שתחל ביום
  &nbsp;
  <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.START_DATE]
        }
        sxStyle={{ width: '170px', height: '30px' }}
      />
  &nbsp; ותסתיים ביום
  &nbsp;
        <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.END_DATE]}
        sxStyle={{ width: '170px', height: '30px' }}
      />
  &nbsp; (להלן "תקופת השכירות").
</p>


    </>
  );
};
