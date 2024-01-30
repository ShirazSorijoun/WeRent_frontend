import React, { useEffect, useState } from "react";
import reviewService from "../../services/review-service";
import { ReviewProps } from "../../types/types";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { req } = reviewService.getAllReviews();
        const response = await req;
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className="list-group">
          {reviews.map((review, index) => (
            <li key={index} className="list-group-item">
              <h5 className="mb-1">Name: {review.ownerName}</h5>
              <p className="mb-1">Review: {review.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;


