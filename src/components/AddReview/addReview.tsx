/* eslint-disable @typescript-eslint/no-explicit-any */
import React ,{useState} from "react";
import { ReviewProps } from "../../types/types";
import reviewService from "../../services/review-service";
import "./addReview.css";
//import { refreshAccessToken } from "../../services/user-service";
import { handleRequestWithToken } from "../../services/handleRequestWithToken";
import {Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddReview: React.FC = () => {
  const [review, setReview] = React.useState<ReviewProps>({
    ownerName: "",
    ownerImage: "",
    date: "",
    description: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
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

    const tokenRefreshed = await handleRequestWithToken();

    if (!tokenRefreshed) {
      console.log("Token refresh failed");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      const { req } = reviewService.postReview(review, token || "");
      const response = await req;

      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
      navigate("/allReviews");

      console.log("Review submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
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
        <Alert
          variant="success"
          show={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          dismissible
          style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 9999 }}
        >
          Review added successfully!
        </Alert>
    </div>
  );
};

export default AddReview;
