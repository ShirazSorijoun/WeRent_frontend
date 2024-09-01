import React from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';

export const CreateLeaseAgreementFormPage3: React.FC<IControlProps> = ({
  control,
}) => {
  return (
    <>

    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>מיסים ותשלומים שוטפים</strong>&nbsp;<strong>.8</strong>
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>8.1.</span>
      בנוסף על דמי השכירות השוכר מתחייב: 
    </p>


    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>8.1.1.</span>
      <span style={{ paddingLeft: '40px' }}>
      לשאת בכל התשלומים השוטפים הנובעים משימוש שוטף בדירה, הכוללים בין היתר: חשמל, מים, ארנונה, גז וועד-בית (להלן: "התשלומים השוטפים"). 
      </span>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>8.1.2.</span>
      <span style={{ paddingLeft: '40px' }}>
      כי בתוך 30 ימים ממועד מסירת החזקה במושכר לידי השוכר, יעביר על שמו את החשבונות של התשלומים השוטפים החלים על הדירה, יעביר אסמכתא על כך לבעל הדירה וישאיר את רישום חשבונות אלו על שמו למשך כל תקופת השכירות. 
      </span>
    </p>


    
    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>8.1.3.</span>
      <span style={{ paddingLeft: '40px' }}>
      לשלם את כל התשלומים השוטפים במועד. בעל הדירה רשאי, אחרי שנתן לשוכר התראה בכתב לפחות 14 (ארבעה עשר) ימים מראש, לשלם במקום השוכר כל תשלום שוטף שלא שולם במועד. השוכר מתחייב להחזיר לבעל הדירה כל סכום ששולם לפי סעיף זה תוך זמן סביר ממועד דרישה ראשונה בכתב. 
      </span>
    </p>

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>8.2.</span>
      בעל הדירה מתחייב:
    </p>


    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>8.2.1.</span>
      <span style={{ paddingLeft: '40px' }}>
      לשאת בתשלום כל המיסים, האגרות וההיטלים והתשלומים אשר חלים על פי דין או מטבעם על בעל דירה.
      </span>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '45px', position: 'relative', direction: 'rtl' ,  textIndent: '20px', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0' }}>8.2.2.</span>
      <span style={{ paddingLeft: '40px' }}>
      למען הסר ספק, תשלומים החורגים מתשלומי ועד בית השוטפים, והנדרשים ע"י ועד הבית לשם תחזוקת הבניין בו נמצאת הדירה יחולו על בעל הדירה. 
      </span>
    </p>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>תיקונים ושמירה על הדירה</strong>&nbsp;<strong>.9</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>9.1.</span>
      השוכר מתחייב לשמור על הדירה במשך כל תקופת השכירות במצבה כפי שהצהיר בסעיף 2.2 וכפי שמפורט בפרוטוקול מצב הדירה, זאת בכפוף לבלאי הנובע משימוש סביר. 
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>9.2.</span>
      בעל הדירה מתחייב לתקן כל קלקול, תקלה או פגם בדירה ובמחובר אליה חיבור של קבע על חשבונו ואשר נגרמו כתוצאה מבלאי סביר, לרבות ומבלי לגרוע מכך, במערכות החשמל, האינסטלציה והמים, בדוד המים, במזגנים, בקירות הבית, בחלונות ובדלתות. התיקון יבוצע לא יאוחר מ
      <BasicFieldController
        control={control}
        type={EBasicFieldType.int}
        fieldData={
          leaseAgreementFormDataObject[
            ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR
          ]
        }
        sxStyle={{ width: '60px', height: '40px' }}
      />
      ימים ממועד הודעת השוכר על כך.
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>9.3.</span>
      על אף האמור בסעיף 9.2, אם מדובר בקלקול, תקלה או פגם שתיקונם דחוף (אינם מאפשרים מגורים בדירה באופן סביר), מתחייב בעל הדירה לתקנם באופן מיידי ובכל מקרה לא יאוחר מ-3 (שלושה) ימים ממועד הודעת השוכר על כך.
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>9.4.</span>
      מבלי להוריד מאחריות בעל הדירה, השוכר מתחייב לתקן כל תקלה או פגם שנגרמו לדירה ולמחובר אליה חיבור של קבע כתוצאה משימוש לא סביר או רשלני של השוכר.
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>9.5.</span>
      מוסכם על הצדדים כי, במידה שלא נכתב אחרת ברשימת התכולה המצורפת כנספח א', תחול האחריות לתיקון התכולה על בעל הדירה.
    </p>

    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>שינויים בדירה</strong>&nbsp;<strong>.10</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>10.1.</span>
      השוכר מתחייב שלא לבצע כל שינוי פנימי או חיצוני בדירה, שלא להוסיף עליה כל תוספת, שלא להרוס כל חלק מהדירה או ממתקניה ושלא להרשות ולהתיר כל שינוי, תוספת או הריסה, אלא באישור מראש ובכתב של בעל הדירה. 
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>10.2.</span>
      במקרה בו השוכר יבצע שינויים בדירה למרות האמור בסעיף 10.1, ומבלי לגרוע מיתר זכויות בעל הדירה, יוכל בעל הדירה לבחור, לפי שיקול דעתו הבלעדי, אם לדרוש מהשוכר להחזיר את המצב בדירה לקדמותו על חשבון השוכר או להותיר את השינויים או התוספות בדירה והם יהפכו לרכושו של בעל הדירה מבלי שיהיה עליו לשלם תמורה על כך. 
    </p>



    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>ביטוח דירה</strong>&nbsp;<strong>.11</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl', marginBottom: '60px'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>11.1.</span>
        בעל הדירה יערוך, יקיים ויישא בעלויות של פוליסת ביטוח לדירה אשר תכלול כיסוי למבנה הבניין וכל מערכותיו וזאת למשך כל תקופת השכירות. פוליסת הביטוח תכלול סעיף ויתור על זכות תחלוף (שיבוב) כלפי השוכר וכל הבא מטעמו. האחריות לעריכת ביטוח תכולה וצד ג' תחול על השוכר בלבד ולשיקול דעתו. 
    </p>


    <p style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
      <strong>העברת זכות השכירות בדירה אחרת</strong>&nbsp;<strong>.12</strong>
    </p>


    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>12.1.</span>
      ידוע לשוכר כי זכות השכירות שלו הינה אישית והוא מתחייב לא להעביר, לשעבד או למסור לאחר את זכויותיו לפי חוזה זה. 
    </p>


      <BasicFieldController
        control={control}
        type={EBasicFieldType.switch}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.SUBTENANT]
        }
      />

    <p style={{ textAlign: 'right', paddingRight: '40px', position: 'relative', direction: 'rtl'}}>
      <span style={{ position: 'absolute', right: '0', top: '0'}}>12.2.</span>
      על אף האמור בסעיף 12.1, מוסכם כי בכפוף להסכמתו של בעל הדירה מראש ובכתב יהיה השוכר רשאי להעביר את זכות השכירות לאחר, וזאת בכפוף למציאת שוכר חלופי (להלן: "השוכר החלופי"). השוכר החלופי ייכנס לנעליו של השוכר בחוזה זה, יקבל על עצמו את כל התחייבויותיו למשך תקופת השכירות הנותרת ויפקיד בטחונות חלופיים זהים לאלו שהפקיד. כמו כן, השוכר החלופי ייכנס בנעלי השוכר ביחס לכל חובותיו והתחייבויותיו בקשר עם הנהלים ו/או הנחיות חברת WERENT ומחויב בזאת לחתום על כל מסמך ו/או לעמוד בהוראות תקנון החברה אשר יכול יעודכן מעת לעת. מוסכם על הצדדים כי בעל הדירה יהיה רשאי לסרב להעברת הזכויות לפי חוזה זה לידי השוכר החלופי וזאת מנימוקים סבירים. 
    </p>


    </>
  );
};
