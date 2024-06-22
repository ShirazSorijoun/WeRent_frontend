import { ReviewProps } from '@/types/types';
import { axiosInstance } from '../api';

const REVIEW_API_KEY = '/userReview';

const getAllReviews = async (): Promise<ReviewProps[]> =>
  (await axiosInstance.get(REVIEW_API_KEY)).data;

const postReview = async (review: ReviewProps): Promise<ReviewProps> =>
  (
    await axiosInstance.post(`${REVIEW_API_KEY}/create`, {
      review: review,
    })
  ).data;

export const reviewAPI = { getAllReviews, postReview };
