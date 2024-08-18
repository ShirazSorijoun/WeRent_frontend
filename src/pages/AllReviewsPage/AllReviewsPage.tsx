import React, { useEffect, useState } from 'react';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { ReviewProps } from '../../types/types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AllReviewsPage.css';
import { api } from '@/api';
import { AddReviewDialog } from '@@/addReview';
import { Box } from '@mui/material';

export const AllReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const insertReviews = async () => {
    try {
      setIsLoading(true);
      const reviewsRes = await api.review.getAllReviews();
      setReviews(reviewsRes.reverse());
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    insertReviews();
  }, []);

  return (
    <>
      <Box sx={{ right: '60px', marginTop: '40px', position: 'absolute' }}>
        <AddReviewDialog completeSave={insertReviews} />
      </Box>
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
              {reviews.map((review, index) => (
                <Col key={index}>
                  <ReviewCard key={review._id} review={review} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </>
  );
};
