import { api } from '@/api';
import React, { useEffect, useState } from 'react';
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

  const ownerName: string =
    !ownerInformation?.firstName || ownerInformation?.lastName
      ? 'מידע לא זמין'
      : `${ownerInformation.firstName} ${ownerInformation.lastName}`;

  const ownerAddress: string =
    !ownerInformation?.streetAddress || ownerInformation?.cityAddress
      ? 'מידע לא זמין'
      : `${ownerInformation.cityAddress} ${ownerInformation.streetAddress}`;

  return (
    <Card className="mb-4" style={{ textAlign: 'right' }}>
      <Card.Header>מידע על {isOwner ? 'הבעלים' : 'השוכר'}</Card.Header>
      <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
        <ListGroupItem>שם: {ownerName}</ListGroupItem>
        <ListGroupItem>
          תעודת זהות: {ownerInformation?.personalId ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>כתובת: {ownerAddress}</ListGroupItem>
      </ListGroup>
    </Card>
  );
};
