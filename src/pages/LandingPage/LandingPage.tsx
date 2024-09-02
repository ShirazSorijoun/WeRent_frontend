import './LandingPage.css';
import Reviews from '../../components/ReviewCard/ReviewCard';
import { useEffect, useState } from 'react';
import { ReviewProps } from '../../types/types';
import { Link } from 'react-router-dom';
import landingPageImg from '../../assets/landing page image.png';
import unsplash from '../../assets/landing page image - unsplash.png';
import tellow from '../../assets/Arrow Tellow.svg';
import goodHands from '../../assets/landing page - in good hands.png';
import rectangle from '../../assets/Rectangle.png';
import { api } from '@/api';

export const LandingPage: React.FC = () => {
  const [lastThreeReviews, setLastThreeReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const setReviews = async () => {
      try {
        const reviewsData = await api.review.getAllReviews(); // Get the last 3 reviews
        console.log(reviewsData);
        setLastThreeReviews(reviewsData.slice(-3));
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    setReviews();
  }, []);

  return (
    <div className="main-container">
      <header className="header">
        <img
          loading="lazy"
          src={landingPageImg}
          className="header-img"
          alt="תמונת נכס"
        />
        <img
          loading="lazy"
          src={unsplash}
          className="header-img"
          alt="תמונת נכס מאתר Unsplash"
        />
        <div className="header-title">בתים יפים בשבילך</div>
        <div className="header-description">
          האתר WeRent, שמתעדכן על בסיס יומי, מספק מגוון רחב של מודעות נדל"ן מכל
          רחבי הארץ ולכל סוגי הנכסים. האתר מציע גם שירותים משפטיים מהירים.
          היכנסו עכשיו וקבלו את כל המידע על הנכסים המשווים!
        </div>
      </header>

      <div className="listings-container">
        <span className="link1">
          <Link to="/googlemap" className="button">
            בדוק איפה יש תוכנית תמ"א ארצית
          </Link>
          <div className="img-container">
            <img
              loading="lazy"
              src={tellow}
              className="img-3"
              alt="תמונת נכס"
            />
          </div>
        </span>
      </div>

      <div className="Secondary-container">
        <div className="image-wrapper">
          <div className="column">
            <img loading="lazy" src={goodHands} alt="בידיים טובות" />
          </div>
          <div className="column-2">
            <span className="caption">
              <img
                loading="lazy"
                src={rectangle}
                className="img-2"
                alt="מלבן"
              />
              <div className="description">אתם בידיים טובות</div>
              <div className="text">
                <p>
                  ברוכים הבאים לפלטפורמת הנדל"ן שלנו, שם חלומות מוצאים את ביתם
                  המושלם.
                </p>
                <p>
                  ב-WeRent, אנו מבינים כי מציאת הנכס האידיאלי היא יותר מאשר
                  עסקה.{' '}
                </p>
                זהו תהליך של מציאת מקום שבו נוצרים זיכרונות, שבו משפחות גדלות,
                ושבו אנשים פורחים.
                <p>
                  עם מחויבות למצוינות ושירות אישי, אנו שואפים לחבר בין קונים
                  ומוכרים לנכסים האידיאליים שלהם בצורה חלקה.
                </p>
                הצוות שלנו מורכב מאנשי מקצוע מנוסים, שמסורים להדרכתכם בכל שלב
                בתהליך הנדל"ן, ולהבטיח שכל עסקה תתנהל בצורה חלקה, שקופה ומותאמת
                לצרכים הייחודיים שלכם.
                <p>
                  בין אם אתם מחפשים את בית החלומות שלכם או מעוניינים לפרסם נכס,
                  סמכו עלינו כשותפים שלכם בהגשמת שאיפות הנדל"ן שלכם.
                </p>
              </div>
              <span className="link2">
                <div className="button">למידע נוסף</div>
                <div className="img-container">
                  <img
                    loading="lazy"
                    src={tellow}
                    className="img-3"
                    alt="תמונת נכס"
                  />
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="Box">
        <img loading="lazy" src={rectangle} className="img-2" alt="מלבן" />
      </div>

      <div className="Quote">
        "הסוד להצלחה במשהו הוא פשוט להתחיל לעשות אותו."
      </div>

      <div className="Reviews">
        {lastThreeReviews.length > 0 && (
          <div className="review-cards-container">
            {lastThreeReviews.map((review) => (
              <Reviews key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
