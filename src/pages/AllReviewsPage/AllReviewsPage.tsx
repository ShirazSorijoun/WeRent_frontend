import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import reviewService from "../../services/review-service";
import { ReviewProps } from '../../types/types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AllReviewsPage.css';


const RentPropertiesPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);



  useEffect(() => {
    const { req, abort } = reviewService.getAllReviews();

    req.then(response => {
      setReviews(response.data.reverse());
    }).catch(error => {
        if (error && error.code === 'ERR_CANCELED'){
            console.log('Fetch request was cancelled');
        } else {
            console.error('Error fetching apartments:', error);
        }
        setIsLoading(false);
    });

    return () => abort();
  }, []);




  return (
    <div className="all-reviews-container">
      <div className="all-reviews-title"> What Our Clients Say About Us </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="no-reviews-message">
          <p>No reviews available.</p>
        </div>
      ) : (
        <div className="review-cards-container">
          <Row>
              {reviews.map((review,index) => (
                <Col key={index}>
                  <ReviewCard
                    key={review._id}
                    review={review}
                  />
                </Col>
              ))}
          </Row>
        </div>
      )}

    </div>
  );
};

export default RentPropertiesPage;
