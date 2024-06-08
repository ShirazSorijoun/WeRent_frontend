import apiClient, { CanceledError } from './api-client';
import { ReviewProps } from '../types/types';

export { CanceledError };

const getAllReviews = () => {
  const abortController = new AbortController();
  const req = apiClient.get<ReviewProps[]>('userReview', {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

const postReview = (review: ReviewProps, token: string) => {
  const abortController = new AbortController();
  const req = apiClient.post(
    'userReview/create',
    {
      review: review,
    },
    {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return { req, abort: () => abortController.abort() };
};

export default { getAllReviews, postReview };
