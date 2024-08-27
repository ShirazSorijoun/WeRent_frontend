import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetImageUrlFromName } from '@/hooks';
import { IApartment } from '@/models/apartment.model';
import {
  CardMedia,
  CardContent,
  Typography,
  Card,
  CardActions,
} from '@mui/material';
import { api } from '@/api';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { SignOrDisplayLease } from '@@/signOrDisplayLease';

interface IUserApartmentCardProps {
  apartment: IApartment;
  userId: string;
}

export const TenantApartmentCard: React.FC<IUserApartmentCardProps> = ({
  apartment,
  userId,
}) => {
  const navigate = useNavigate();
  const [leaseData, setLeaseData] = useState<ILeaseAgreement>();

  const fetchLeaseData = useCallback(async (): Promise<void> => {
    if (apartment._id && userId) {
      try {
        const res = await api.leaseAgreement.getLeaseAgreement(
          userId,
          apartment._id,
        );
        setLeaseData(res);
      } catch (error) {
        console.error('Error fetching tenant data for lease form', error);
      }
    }
  }, [apartment._id, userId]);

  useEffect(() => {
    fetchLeaseData();
  }, [fetchLeaseData]);

  const handleClick = () => {
    navigate(`/apartment-details/${apartment._id}`);
  };

  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);
  return (
    <Card
      sx={{
        marginRight: '10px',
        height: '200px',
        width: '200px',
        position: 'relative',
        flexShrink: 0,
        textDecoration: 'none',
        direction: 'rtl',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        onClick={handleClick}
        component="img"
        image={apartmentImage}
        alt={apartment.city}
        sx={{ width: '100%', height: '60%' }}
      />
      <CardContent
        onClick={handleClick}
        sx={{ padding: '4px', display: 'flex', justifyContent: 'space-around' }}
      >
        <Typography variant="body2">{apartment.address}</Typography>
        <Typography variant="body2">{apartment.city}</Typography>
        <Typography variant="body2">קומה {apartment.floor}</Typography>
      </CardContent>
      <CardActions>
        {leaseData ? (
          <SignOrDisplayLease lease={leaseData} refreshList={fetchLeaseData} />
        ) : (
          <Typography>עדיין לא נוצר חוזה</Typography>
        )}
      </CardActions>
    </Card>
  );
};
