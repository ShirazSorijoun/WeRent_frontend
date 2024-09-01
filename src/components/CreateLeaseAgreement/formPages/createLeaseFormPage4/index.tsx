import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController, ControlledSelect } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  guaranteeFieldValues,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage4: React.FC<IControlProps> = ({
  control,
}) => {
  return (
    <>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>החזרת הדירה</strong>&nbsp;<strong>.13</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>13.1.</span>
      בתום תקופת השכירות, יהיה השוכר חייב למסור לבעל הדירה את הדירה כשהיא פנויה מכל אדם ומכל חפץ שאינו חלק מן התכולה, כשהיא במצבה כפי שהצהיר בסעיף 2.2, וזאת בכפוף לבלאי הנובע משימוש סביר.
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>13.2.</span>
      13.2.	מבלי לפגוע בהוראות סעיף 13.1 ו/או בזכויותיו של בעל הדירה עפ"י דין או הסכם, מוסכם כי במידה שהשוכר לא יפנה את הדירה כאמור בסעיף 13.1 לעיל, יהיה השוכר חייב לשלם לבעל הדירה עבור כל יום בו לא יפנה את הדירה, פיצוי מוסכם בסך השווה לפי-שלושה מדמי השכירות היומיים בהתאם לחוזה זה. הצדדים אומדים סכום זה כפיצוי סביר ביחס לנזק שניתן לראותו מראש כתוצאה מסתברת מאי קיום הוראות סעיף 13.1 ע"י השוכר.
    </p>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>הפרת חוזה</strong>&nbsp;<strong>.14</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>14.1.</span>
      מוסכם על הצדדים כי הוראות חוק החוזים (תרופות בשל הפרת חוזה), תשל"א-1970 יחולו בכל הנוגע לחוזה זה.
    </p>



    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>14.2.</span>
      מבלי לגרוע מן האמור לעיל, מוסכם על הצדדים כי ההפרות שלהלן יהוו הפרה יסודית של חוזה זה:
    </p>

    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>14.2.1.</span>
      <span style={{ paddingLeft: '40px' }}>
      עיכוב של מעל ל
      </span>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
      ימים בתשלום דמי השכירות במלואם.
    </p>



    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>14.2.2.</span>
      <span style={{ paddingLeft: '40px' }}>
      אי פינוי הדירה בתום תקופת השכירות או האופציה אם מומשה בהתאם להוראות חוזה זה.
      </span>
    </p>



    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>14.3.</span>
      מוסכם בין הצדדים כי במקרה שהשוכר יפר הפרה יסודית של חוזה זה ולא יתקן את ההפרה תוך 
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
      ימים מהיום שנדרש לעשות כן בכתב, תהיה לבעל הדירה זכות לבטל את החוזה ולדרוש מהשוכר לפנות מיד את הדירה ולהחזיר את החזקה בה לבעל הדירה כשהיא פנויה מכל אדם וחפץ שאינו שייך לבעל הדירה ובמצב כפי שהצהיר השוכר בסעיף 2.2. 
    </p>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>בטחונות</strong>&nbsp;<strong>.15</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>15.1.</span>
      15.1.	השוכר מפקיד במעמד  מסירת החזקה במושכר בידי בעל הדירה כנגד מסירת המפתח לשוכר את המסמכים כדלקמן:
    </p>


      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.PROMISSORY_NOTE]
        }
      />

<p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>15.1.1.</span>
      <span style={{ paddingLeft: '40px' }}>
      שטר חוב חתום בנוסח המצורף לחוזה זה כנספח ד' לטובת בעל הדירה על סך של 
      </span>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.float}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT
          ]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
      שקלים חדשים (עד גובה של 6 חודשי שכירות)
    </p>



      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.LETTER_OF_GUARANTEE
          ]
        }
      />

<p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>15.1.2.</span>
      <span style={{ paddingLeft: '40px' }}>
      כתב ערבות חתום בנוסח המצורף לחוזה זה כנספח ג'. לכתב הערבות יצורף צילום תעודת זהות. 
      </span>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>15.1.3.</span>
      <span style={{ paddingLeft: '40px' }}> </span>
      <ControlledSelect
        valuesArray={guaranteeFieldValues}
        control={control}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.GUARANTEE]
        }
      />
      לטובת בעל הדירה בסך של 
      <BasicFieldController
        control={control}
        type={EBasicFieldType.float}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.GUARANTEE_AMOUNT]
        }
        sxStyle={{ width: '200px', height: '50px' }}
      />
(לא יותר מ- 3 חודשי שכירות) שתהיה בתוקף במהלך כל תקופת השכירות וכן במשך 30 (שלושים) ימים לאחר סיומה של תקופת השכירות. 
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>15.2.</span>
      מוסכם על הצדדים כי בעל הדירה יהיה רשאי לעשות שימוש בבטחונות המפורטים בסעיף זה בכל מקרה של הפרה יסודית מצד השוכר וזאת בכפוף להתראה של 14 (ארבע-עשרה) ימים בכתב בה יודיע בעל הדירה על כוונתו ויאפשר לשוכר לתקן את ההפרה הנטענת.
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>15.3.</span>
      בעל הדירה ישיב לשוכר את הביטחונות שהפקיד בידיו לפי סעיף 15.1 לא יאוחר מ-30 (שלושים) ימים מתום תקופת השכירות, בכפוף להצגת אישורים על היעדר חובות בגין תשלומים שוטפים עבור תקופת השכירות. 
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>15.4.</span>
      15.4.	יובהר כי במקרה של שוכרים-שותפים שיידרשו להמציא ערב כאמור בחלופה הראשונה בסעיף ‎15.1, ימציא כל אחד מהשוכרים-שותפים ערב אחד ובמקרה של הפרה, יעשה בעל הדירה שימוש ראשית בערבות עבור השותף המפר. 
    </p>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>אי-תחולת דיני הגנת הדייר</strong>&nbsp;<strong>.16</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>16.1.</span>
      השוכר מצהיר בזאת כי ידוע לו שהדירה הינה בגדר דירה פנויה מכל דייר הזכאי להחזיק בה לאחר תאריך כ"ו באב תשכ"ח 20 באוגוסט 1968 ולכן לא יחולו על שכירות זו הוראות חוק הגנת הדייר )נוסח משולב) תשל"ב – 1972 (להלן: "חוק הגנת הדייר") ו/או כל דין אחר אשר יבוא במקומו.
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>16.2.</span>
      השוכר מצהיר ומסכים כי פרט לדמי השכירות לא שילם השוכר לבעל הדירה או לכל אדם אחר דמי מפתח או כל תמורה אחרת בגין השכירות וכי השוכר לא יהיה זכאי לדמי מפתח לצורך פינוי הדירה וכי אין לראות בכל תמורה שתשולם לפי חוזה זה כדמי מפתח.
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>16.3.</span>
      השוכר מצהיר ומתחייב, כי כל השקעה שישקיע בדירה, ככל שישקיע ו/או כל שיפוץ שיערוך בדירה, אם יערוך, לא יקנו לו כל זכות כלשהי על פי חוק הגנת הדייר.
    </p>

    </>
  );
};
