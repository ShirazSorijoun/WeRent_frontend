import React from "react";
import "./ReviewCard.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


interface ReviewProps {
  ownerName: string;
  ownerImage: string;
  date: string;
  description: string;
}

const ReviewCard: React.FC<ReviewProps> = ({ ownerName, ownerImage, date, description}) => {

  return (
    <div className="card-container">
      <div>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ width: 56, height: 56 }}>
              <img src={ownerImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Avatar>
            }
            title={
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                {ownerName}
              </Typography>
            }
            subheader={date}
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary" style={{ fontSize: '18px' }}>
              "{description}"
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewCard;
