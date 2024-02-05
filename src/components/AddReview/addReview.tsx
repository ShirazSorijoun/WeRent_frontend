/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ReviewProps } from "../../types/types";
import reviewService from "../../services/review-service";
import "./addReview.css";
import { refreshAccessToken } from "../../services/user-service";

const AddReview: React.FC = () => {
  const [review, setReview] = React.useState<ReviewProps>({
    ownerName: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken === null) {
        console.error("Access token not found in local storage");
        return;
      }

      const token: string = storedToken;
      try {
        const { req } = reviewService.postReview(review, token);
        const response = await req;

        console.log("Review submitted successfully:", response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          try {
            const { accessToken, refreshToken } = await refreshAccessToken(
              localStorage.getItem("refreshToken") || ""
            );

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            const { req } = reviewService.postReview(review, accessToken);
            const retryResponse = await req;

            console.log("Review submitted successfully after token refresh:",retryResponse);
          } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
            throw refreshError;
          }
        } else {
          console.error("Error submitting review:", error);
        }
      }
    } catch (error) {
      console.error("General error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-3">
        <h2>Create a review</h2>
        <hr></hr>
        <p className="contact">
          Thank you for choosing to share with us what you think of the site,
          your response will help us if necessary to improve and provide a
          better response
        </p>
        <p className="contact">
          Our email:{" "}
          <a href="mailto:weRent@gmail.com" data-turbo="false" target="_blank">
            weRent@gmail.com
          </a>
        </p>
        <form
          method="post"
          className="row p-3 gx-4 gy-3 mt-0 needs-validation"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Personal message"
              value={review.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <button type="submit" className="button-71">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
