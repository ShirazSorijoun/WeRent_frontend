import React from 'react';
import axios from 'axios';

type ReviewProps = {
  description: string;
}

const ReviewForm: React.FC<ReviewProps> = ({
    description,
  } : ReviewProps) => {

    const [review, setReview] = React.useState<ReviewProps>({
        description: description || '',
      });
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        //We need to change that it will take after logging in from the local user
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFjMWZmM2YwYTcwZWJkY2IzODViZGEiLCJpYXQiOjE3MDU3NzkxODd9.8iR0W4VORKgO0sWV68Kc-7F07VciSYTlUe2fBQ1r7mI"

      const response = await axios.post(
        'http://localhost:3000/userReview/create',
        { review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Review submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="הודעה אישית"
            value={review.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};


export default ReviewForm;


