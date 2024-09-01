import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { dateFormatter } from '@/utils/date';
import { Typography } from '@mui/material';
import { SignOrDisplayLease } from '@@/signOrDisplayLease';

interface IProps {
  leaseData?: ILeaseAgreement;
}

export const LeaseSection: React.FC<IProps> = ({ leaseData }) => {
  const formatDate = (date?: Date) =>
    date ? dateFormatter(date) : 'מידע לא זמין';

  return (
    <Card>
      <Card.Header
        style={{
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {leaseData && <SignOrDisplayLease lease={leaseData} />}
        <Typography>מידע על השכירות</Typography>
      </Card.Header>
      <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
        <ListGroupItem>
          תאריך תחילת השכירות: {formatDate(leaseData?.startDate)}
        </ListGroupItem>
        <ListGroupItem>
          תאריך סיום השכירות: {formatDate(leaseData?.endDate)}
        </ListGroupItem>
        <ListGroupItem>
          תקופת השכרה:{' '}
          {leaseData?.numOfDaysForRepair
            ? `${leaseData.numOfDaysForRepair} חודשים`
            : 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          סכום השכירות החודשי:
          {leaseData?.rentalPricePerMonth
            ? `${leaseData.rentalPricePerMonth}₪`
            : 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          תאריך תשלום: {leaseData?.dayOfTheMonthForPayment ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          שיטת תשלום: {leaseData?.paymentMethod ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          שם הבנק: {leaseData?.nameOfBank ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          מספר חשבון: {leaseData?.bankAccountNumber ?? 'מידע לא זמין'}
        </ListGroupItem>
        <ListGroupItem>
          סניף: {leaseData?.bankBranch ?? 'מידע לא זמין'}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
