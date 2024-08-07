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
          alt="Home listing image"
        />
        <img
          loading="lazy"
          src={unsplash}
          className="header-img"
          alt="Unsplash Home listing image"
        />
        <div className="header-title">Beautiful homes made for you</div>
        <div className="header-description">
          The WeRent website, which is updated daily, provides a variety of real
          estate ads from all over the country and of all types. The site also
          offers you fast legal services. Enter now all the information about
          the comparable properties!
        </div>
      </header>

      <div className="listings-container">
        <span className="link1">
          <Link to="/googlemap" className="button">
            Look where there is a National Outline Plan
          </Link>
          <div className="img-container">
            <img
              loading="lazy"
              src={tellow}
              className="img-3"
              alt="Listing image"
            />
          </div>
        </span>
      </div>

      <div className="Secondary-container">
        <div className="image-wrapper">
          <div className="column">
            <img loading="lazy" src={goodHands} alt="In Good Hands" />
          </div>
          <div className="column-2">
            <span className="caption">
              <img
                loading="lazy"
                src={rectangle}
                className="img-2"
                alt="Rectangle"
              />
              <div className="description">You're in good hands</div>
              <div className="text">
                <p>
                  Welcome to our real estate platform, where dreams find their
                  perfect home.
                </p>
                <p>
                  At WeRent, we understand that finding the ideal property is
                  more than just a transaction;
                </p>
                it's about finding the place where memories are made, where
                families grow, and where individuals thrive.
                <p>
                  With a commitment to excellence and personalized service, we
                  strive to connect buyers and sellers to their ideal properties
                  seamlessly.
                </p>
                Our team of experienced professionals is dedicated to guiding
                you through every step of the real estate journey, ensuring that
                each transaction is smooth, transparent, and tailored to your
                unique needs. Whether you're searching for your dream home or
                looking to list your property, trust us to be your partner in
                realizing your real estate aspirations.
              </div>
              <span className="link2">
                <div className="button">Learn more</div>
                <div className="img-container">
                  <img
                    loading="lazy"
                    src={tellow}
                    className="img-3"
                    alt="Listing image"
                  />
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="Box">
        <img loading="lazy" src={rectangle} className="img-2" alt="Rectangle" />
      </div>

      <div className="Quote">
        "The secret to succeeding at something is to just start doing it."
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
