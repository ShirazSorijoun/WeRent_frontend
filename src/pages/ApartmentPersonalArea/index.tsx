import React, { useEffect, useState, useMemo } from 'react';
import './style.css';
import {
  Card,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Container,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import {
  ApartmentSection,
  LeaseSection,
  QuarterlyFormSection,
  TenantFormSection,
  UserSection,
} from './components';
import { useAppSelector } from '@/hooks';
import { selectUserId } from '@/stores/user';
import { api } from '@/api';
import { IApartment } from '@/models/apartment.model';
import { Box, Button, Stack, Typography } from '@mui/material';

export const ApartmentPersonalAreaPage: React.FC = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const [leaseData, setLeaseData] = useState<ILeaseAgreement>();
  const [apartmentDetails, setApartmentDetails] = useState<IApartment>();
  const userId = useAppSelector(selectUserId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (apartmentId) {
        const apartmentData = await api.apartment.getApartmentById(apartmentId);
        setApartmentDetails(apartmentData);

        if (apartmentData?.leaseId) {
          const leaseRes = await api.leaseAgreement.getLeaseAgreementById(
            apartmentData.leaseId,
          );
          setLeaseData(leaseRes);
        }
      }
    };

    fetchData();
  }, [apartmentId]);

  const shouldDisplayForms = useMemo(
    () =>
      leaseData?.tenantId === userId &&
      new Date() >= new Date(leaseData.startDate),
    [leaseData, userId],
  );

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className="apartment-personal-area">
      <Box sx={{ right: '60px', marginTop: '17px', position: 'absolute' }}>
        <Button
          sx={{
            padding: '5px 30px',
            fontSize: '18px',
          }}
          variant="contained"
          color="inherit"
          onClick={goBack}
        >
          <Typography>חזור לעמוד הקודם</Typography>
        </Button>
      </Box>
      <div className="text-center mb-4">
        <h1>אזור אישי דירה</h1>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <ApartmentSection apartmentDetails={apartmentDetails} />
        </Col>
        <Col md={6}>
          <LeaseSection leaseData={leaseData} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <UserSection userId={leaseData?.tenantId} />
        </Col>
        <Col md={6}>
          <UserSection userId={leaseData?.apartment?.owner} isOwner />
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header style={{ textAlign: 'right' }}>תכונות נוספות</Card.Header>
        <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
          <ListGroupItem>
            {leaseData?.animal ? '✔' : '✖'} ?מותרות חיות מחמד
          </ListGroupItem>
        </ListGroup>
      </Card>

      {shouldDisplayForms && (
        <Stack spacing={2}>
          <TenantFormSection apartmentId={apartmentId} ownerId={userId} />
          <QuarterlyFormSection
            apartmentId={apartmentId}
            ownerId={userId}
            startDate={leaseData?.startDate}
          />
        </Stack>
      )}
    </Container>
  );
};
