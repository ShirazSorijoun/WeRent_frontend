import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';
import { useWatch } from 'react-hook-form';

export const CreateLeaseAgreementFormPage5: React.FC<IControlProps> = ({
  control,
}) => {
  const isAnimal = useWatch({
    control,
    name: leaseAgreementFormDataObject[ELeaseAgreementFields.ANIMAL].fieldName,
  });

  return (
    <>
      <p
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          textAlign: 'right',
        }}
      >
        <strong>כללי</strong>&nbsp;<strong>.17</strong>
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
          17.1.
        </span>
        בעל הדירה יהיה רשאי למכור את זכויותיו בדירה, להעבירן לאחר, לשעבדן ולעשות
        בהן כל פעולה שימצא לנכון ללא צורך בהסכמת השוכר וזאת בתנאי שתישמרנה כל
        זכויות השוכר על פי חוזה זה לרבות ביחס לכל חובותיו והתחייבויותיו בקשר עם
        הנהלים ו/או הנחיות חברת WERENT, ובכללן זכות השכירות של השוכר בדירה.
        במקרה של מכירת או העברת זכויותיו של בעל הדירה לאחר, יודיע בעל הדירה על
        כך 21 ימים מראש ובכתב לשוכר לפני המועד בו עליו למסור את הדירה, ובהודעה
        יפרט את פרטי הרוכש ודרכי ההתקשרות עימו.
      </p>

      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.ANIMAL]}
      />
      <p
        style={{
          textAlign: 'right',
          paddingRight: '40px',
          position: 'relative',
          direction: 'rtl',
          display: isAnimal ? 'inherit' : 'none',
        }}
      >
        <span style={{ position: 'absolute', right: '0', top: '0' }}>
          17.2.
        </span>
        השוכר מתחייב שלא להכניס בעלי חיים למושכר ללא רשותו של בעל הדירה מראש
        ובכתב.
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
          17.3.
        </span>
        מוסכם בזאת כי על אף האמור בכל דין, חובות שהצדדים לחוזה חבים זה לזה בגין
        חוזה זה אינם ניתנים לקיזוז, אלא בהסכמה של הצדדים מראש ובכתב.
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
          17.4.
        </span>
        השוכר יאפשר לבעל הדירה ו/או לבא-כוחו, בתיאום מראש ובתדירות ושעות סבירים,
        להיכנס אל הדירה על מנת לוודא קיום הוראות חוזה זה, לבצע תיקונים ולהראותה
        לשוכרים או רוכשים פוטנציאליים.
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
          17.5.
        </span>
        מוסכם על הצדדים כי תנאי חוזה זה משקפים במלואם את ההסכמות בין הצדדים
        ומבטלים כל התקשרות, התחייבות, הבטחה וחוזה שנעשו, בכתב או בעל-פה, קודם
        לחתימת חוזה זה. עוד מוסכם ומותנה בין הצדדים כי כל שינוי ו/או תוספת לחוזה
        זה לא יהיה בר תוקף אלא אם נעשה בכתב ונחתם על ידי שני הצדדים.
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
          17.6.
        </span>
        כל ויתור, ארכה או הימנעות ממימוש זכות של צד לחוזה זה, לא ייחשב כוויתור
        של אותו צד על זכות ולא ימנעו ממנו תביעה עתידית לקיום התחייבות כלשהי של
        הצד האחר כלפיו.
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
          17.7.
        </span>
        כותרות סעיפי חוזה זה הוספו למען הנוחות בלבד ואין לתת להם משמעות פרשנית
        החורגת ממטרה זו.
      </p>

      <p
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          textAlign: 'right',
        }}
      >
        <strong>ויתור והסרת אחריות</strong>&nbsp;<strong>.18</strong>
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
          18.1.
        </span>
        הואיל והסכם זה נחתם באופן דיגיטלי, מובהר ומוסכם בזאת כי אין על חברת
        WERENT כל אחריות לרבות ביחס לאימות וזיהוי הצדדים המתקשרים בהסכם זה וכי
        אלה מוותרים בזאת (לרבות מי מטעמם ו/או כאלה שייכנסו בנעליהם), באופן מלא,
        סופי, מוחלט, ובאופן בלתי מותנה ובלתי הדיר, על כל טענות, תלונות, דרישות
        ו/או תביעות, מכל מין וסוג שהם, כספיות ואחרות, כנגד WERENT ו/או כל מי
        שפעל או יפעל בשמם ו/או מטעמם לרבות מנהליהם ו/או עובדיהם.
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
          18.2.
        </span>
        מבלי לגרוע מן האמור לעיל, מוסכם כי אין על חברת WERENT משום חובה לבדוק
        ו/או לאמת את האמור ברשימת התכולה (נספח א') ו/או את מצב הדירה (נספח ב')
        ו/או לבדוק את כשרותן ו/או תוקפן של הבטוחות כאמור בסעיף 15 לעיל.
      </p>
    </>
  );
};
