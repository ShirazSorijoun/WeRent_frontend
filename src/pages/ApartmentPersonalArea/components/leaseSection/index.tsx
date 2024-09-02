import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { dateFormatter } from '@/utils/date';
import { Box, Typography } from '@mui/material';
import { SignOrDisplayLease } from '@@/leaseAgreementDIsplayOrSign';

interface IProps {
  leaseData?: ILeaseAgreement;
}

export const LeaseSection: React.FC<IProps> = ({ leaseData }) => {
  const formatDate = (date?: Date) =>
    date ? dateFormatter(date) : 'מידע לא זמין';

  return (
    <Card style={{ textAlign: 'right', direction: 'rtl' }}>
      <Card.Header
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ marginLeft: '15px' }}>מידע על השכירות</Typography>
        {leaseData && <SignOrDisplayLease lease={leaseData} />}
      </Card.Header>
      <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>
              תאריך תחילת השכירות:
            </Typography>
            <Typography>{formatDate(leaseData?.startDate)}</Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>
              תאריך סיום השכירות:
            </Typography>
            <Typography>{formatDate(leaseData?.endDate)}</Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>תקופת השכרה:</Typography>
            <Typography>
              {leaseData?.numOfDaysForRepair
                ? `${leaseData.numOfDaysForRepair} חודשים`
                : 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>
              סכום השכירות החודשי:
            </Typography>
            <Typography>
              {leaseData?.rentalPricePerMonth
                ? `${leaseData.rentalPricePerMonth}₪`
                : 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>תאריך תשלום:</Typography>
            <Typography>
              {leaseData?.dayOfTheMonthForPayment ?? 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>שיטת תשלום:</Typography>
            <Typography>
              {leaseData?.paymentMethod ?? 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>שם הבנק:</Typography>
            <Typography>{leaseData?.nameOfBank ?? 'מידע לא זמין'}</Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>מספר חשבון:</Typography>
            <Typography>
              {leaseData?.bankAccountNumber ?? 'מידע לא זמין'}
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Box display="flex">
            <Typography sx={{ marginLeft: '5px' }}>סניף:</Typography>
            <Typography>{leaseData?.bankBranch ?? 'מידע לא זמין'}</Typography>
          </Box>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
