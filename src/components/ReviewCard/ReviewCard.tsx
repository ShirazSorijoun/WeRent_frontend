import React, { useMemo } from 'react';
import './ReviewCard.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useGetImageUrlFromName } from '@/hooks';
import { ReviewProps } from '@/types/types';
import { dateFormatter } from '@/utils/date';

interface ReviewCardProps {
  review: ReviewProps;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const ownerImage = useGetImageUrlFromName(review.user.profile_image);
  const ownerName = useMemo(
    () => `${review.user?.firstName ?? ''} ${review.user?.lastName ?? ''}`,
    [review.user],
  );
  const formattedDate = useMemo(
    () => dateFormatter(review.date),
    [review.date],
  );
  return (
    <div className="card-container">
      <div>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ width: 56, height: 56 }}>
                <img
                  src={ownerImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Avatar>
            }
            title={
              <Typography
                variant="h6"
                sx={{ fontSize: '18px', fontWeight: 'bold' }}
              >
                {ownerName}
              </Typography>
            }
            subheader={formattedDate}
          />
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ fontSize: '18px' }}
            >
              "{review.description}"
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewCard;
