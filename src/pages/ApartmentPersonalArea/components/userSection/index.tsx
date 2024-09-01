import { api } from '@/api';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

interface IProps {
  userId?: string;
  isOwner?: boolean;
}

export const UserSection: React.FC<IProps> = ({ userId, isOwner = false }) => {
  const [ownerInformation, setOwnerInformation] = useState<any>(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (userId) {
        const ownerData = await api.user.getUserById(userId);
        setOwnerInformation(ownerData);
      }
    };

    fetchOwnerData();
  }, [userId]);

  const ownerName: string = useMemo(() => {
    if (!ownerInformation?.firstName || !ownerInformation?.lastName)
      return 'מידע לא זמין';
    else return `${ownerInformation.firstName} ${ownerInformation.lastName}`;
  }, [ownerInformation]);

  const ownerAddress: string = useMemo(() => {
    if (!ownerInformation?.cityAddress || !ownerInformation?.streetAddress)
      return 'מידע לא זמין';
    else
      return `${ownerInformation.cityAddress} ${ownerInformation.streetAddress}`;
  }, [ownerInformation]);

  return (
    <Card className="mb-4" style={{ textAlign: 'right', direction: 'rtl' }}>
      <Card.Header>מידע על {isOwner ? 'הבעלים' : 'השוכר'}</Card.Header>
      <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}> שם:</Typography>
            <Typography> {ownerName}</Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}> תעודת זהות: </Typography>
            <Typography>
              {ownerInformation?.personalId ?? 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}> כתובת: </Typography>
            <Typography>{ownerAddress}</Typography>
          </Box>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
