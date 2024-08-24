import React, { useEffect, useState, useCallback } from 'react';
import { TenantFormDialog } from '@/components/TenantForm';
import { QuarterlyTenantQuestionnaireFormData } from '@/components/TenantFormQuarterly/formUtils';
import './style.css';
import {
  Button,
  Card,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Container,
} from 'react-bootstrap';
import { InitialTenantQuestionnaireFormData } from '@@/TenantForm/formUtils';
import {
  getTenantFormByOwnerId,
  getTenantFormQuarterlyByOwnerId,
} from '@/api/modelsServices/tenant-form-service';
import { QuarterlyTenantFormDialog } from '@@/TenantFormQuarterly/TenantFormDialog';

export const ApartmentPersonalAreaPage: React.FC = () => {
  const [tenantDialogOpen, setTenantDialogOpen] = useState(false);
  const [tenantFormData, setTenantFormData] =
    useState<InitialTenantQuestionnaireFormData | null>(null);
  const [formCompleted, setFormCompleted] = useState<boolean>(false);

  const [quarterlyTenantDialogOpen, setQuarterlyTenantDialogOpen] =
    useState(false);
  const [quarterlyTenantFormData, setQuarterlyTenantFormData] =
    useState<QuarterlyTenantQuestionnaireFormData | null>(null);
  const [quarterlyFormCompleted, setQuarterlyFormCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const ownerId = localStorage.getItem('userId');
        if (ownerId) {
          try {
            const response = await getTenantFormByOwnerId(ownerId);

            if (response) {
              setFormCompleted(true);
            } else {
              setTenantFormData(null);
              setFormCompleted(false);
            }
          } catch (error) {
            if ((error as any).response?.status === 404) {
              setTenantFormData(null);
              setFormCompleted(false);
            } else {
              console.error('Error fetching tenant form data:', error);
              setTenantFormData(null);
              setFormCompleted(false);
            }
          }
        }
      } catch (error) {
        console.error('Error retrieving user ID from localStorage:', error);
        setTenantFormData(null);
        setFormCompleted(false);
      }
    };

    const fetchFormDataQuarterly = async () => {
      try {
        const ownerId = localStorage.getItem('userId');
        if (ownerId) {
          try {
            const responseQuarterly =
              await getTenantFormQuarterlyByOwnerId(ownerId);

            if (responseQuarterly) {
              setQuarterlyFormCompleted(true);
            } else {
              setQuarterlyTenantFormData(null);
              setQuarterlyFormCompleted(false);
            }
          } catch (error) {
            if ((error as any).response?.status === 404) {
              setQuarterlyTenantFormData(null);
              setQuarterlyFormCompleted(false);
            } else {
              console.error(
                'Error fetching quarterly tenant form data:',
                error,
              );
              setQuarterlyTenantFormData(null);
              setQuarterlyFormCompleted(false);
            }
          }
        }
      } catch (error) {
        console.error('Error retrieving user ID from localStorage:', error);
        setQuarterlyTenantFormData(null);
        setQuarterlyFormCompleted(false);
      }
    };

    fetchFormData();
    fetchFormDataQuarterly();
  }, []);

  const openTenantDialog = useCallback(() => {
    setTenantDialogOpen(true);
  }, []);

  const closeTenantDialog = useCallback(() => {
    setTenantDialogOpen(false);
  }, []);

  const openQuarterlyTenantDialog = useCallback(() => {
    setQuarterlyTenantDialogOpen(true);
  }, []);

  const closeQuarterlyTenantDialog = useCallback(() => {
    setQuarterlyTenantDialogOpen(false);
  }, []);

  const handleFormSubmit = useCallback(
    (data: InitialTenantQuestionnaireFormData) => {
      setTenantFormData(data);
      setFormCompleted(true);
      closeTenantDialog();
    },
    [closeTenantDialog],
  );

  const handleQuarterlyFormSubmit = useCallback(
    (data: QuarterlyTenantQuestionnaireFormData) => {
      setQuarterlyTenantFormData(data);
      setQuarterlyFormCompleted(true);
      closeQuarterlyTenantDialog();
    },
    [closeQuarterlyTenantDialog],
  );

  const apartmentDetails = {
    address: {
      street: 'ברק 4',
      city: 'לוד',
    },
    numOfRooms: 3,
    floorNumber: 4,
  };

  const rentalInformation = {
    leaseStartDate: '2023-01-01',
    leaseEndDate: '2024-01-01',
    leaseDuration: 12,
    rentalPricePerMonth: 1000,
    paymentDate: '5',
    paymentMethod: 'הוראת קבע',
    bankDetails: {
      name: 'דיסקונט',
      accountNumber: '1234567890',
      branch: '59',
    },
  };

  const tenantInformation = {
    name: 'Jane Smith',
    idNumber: 'T123456',
    address: '456 Elm St, Springfield',
  };

  const ownerInformation = {
    name: 'John Doe',
    idNumber: 'O123456',
    address: '789 Oak St, Springfield',
  };

  const importantDates = {
    dateOfEntering: '2023-01-01',
    optionPeriod: {
      startDate: '2024-01-01',
      endDate: '2025-01-01',
    },
    repairDates: '2023-06-01',
  };

  const additionalFeatures = {
    petsPermissibility: 'Yes',
    maintenanceRequests: [
      {
        id: 1,
        date: '2023-06-01',
        description: 'Leaky faucet',
        status: 'Completed',
      },
      {
        id: 2,
        date: '2023-07-15',
        description: 'Broken window',
        status: 'Pending',
      },
    ],
    renewalConsideration: 'Undecided',
  };

  return (
    <Container className="apartment-personal-area">
      <div className="text-center mb-4">
        <h1>אזור אישי דירה</h1>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header style={{ textAlign: 'right' }}>פרטי דירה</Card.Header>
            <ListGroup
              className="list-group-flush"
              style={{ textAlign: 'right' }}
            >
              <ListGroupItem>
                רחוב: {apartmentDetails.address.street}
              </ListGroupItem>
              <ListGroupItem>
                עיר: {apartmentDetails.address.city}
              </ListGroupItem>
              <ListGroupItem>
                מספר חדרים: {apartmentDetails.numOfRooms}
              </ListGroupItem>
              <ListGroupItem>
                קומה: {apartmentDetails.floorNumber}
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="mb-4">
            <Card.Header style={{ textAlign: 'right' }}>
              תאריכים חשובים
            </Card.Header>
            <ListGroup
              className="list-group-flush"
              style={{ textAlign: 'right' }}
            >
              <ListGroupItem>
                תאריך כניסה: {importantDates.dateOfEntering}
              </ListGroupItem>
              <ListGroupItem>
                אופציה להארכה: {importantDates.optionPeriod.startDate} עד{' '}
                {importantDates.optionPeriod.endDate}
              </ListGroupItem>
              <ListGroupItem>
                תאריך תיקון: {importantDates.repairDates}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header style={{ textAlign: 'right' }}>
              מידע על השכירות
            </Card.Header>
            <ListGroup
              className="list-group-flush"
              style={{ textAlign: 'right' }}
            >
              <ListGroupItem>
                תאריך תחילת השכירות: {rentalInformation.leaseStartDate}
              </ListGroupItem>
              <ListGroupItem>
                תאריך סיום השכירות: {rentalInformation.leaseEndDate}
              </ListGroupItem>
              <ListGroupItem>
                תקופת השכרה: {rentalInformation.leaseDuration} חודשים
              </ListGroupItem>
              <ListGroupItem>
                סכום השכירות החודשי: ${rentalInformation.rentalPricePerMonth}
              </ListGroupItem>
              <ListGroupItem>
                תאריך תשלום: {rentalInformation.paymentDate}
              </ListGroupItem>
              <ListGroupItem>
                שיטת תשלום: {rentalInformation.paymentMethod}
              </ListGroupItem>
              <ListGroupItem>
                שם הבנק: {rentalInformation.bankDetails.name}
              </ListGroupItem>
              <ListGroupItem>
                מספר חשבון: {rentalInformation.bankDetails.accountNumber}
              </ListGroupItem>
              <ListGroupItem>
                סניף: {rentalInformation.bankDetails.branch}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4" style={{ textAlign: 'right' }}>
            <Card.Header>מידע על השוכר</Card.Header>
            <ListGroup
              className="list-group-flush"
              style={{ textAlign: 'right' }}
            >
              <ListGroupItem>{tenantInformation.name} :שם</ListGroupItem>
              <ListGroupItem>
                {tenantInformation.idNumber} :תעודת זהות
              </ListGroupItem>
              <ListGroupItem>{tenantInformation.address} :כתובת</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4" style={{ textAlign: 'right' }}>
            <Card.Header>מידע על הבעלים</Card.Header>
            <ListGroup
              className="list-group-flush"
              style={{ textAlign: 'right' }}
            >
              <ListGroupItem>{ownerInformation.name} :שם</ListGroupItem>
              <ListGroupItem>
                {ownerInformation.idNumber} :תעודת זהות
              </ListGroupItem>
              <ListGroupItem>{ownerInformation.address} :כתובת</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header style={{ textAlign: 'right' }}>תכונות נוספות</Card.Header>
        <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
          <ListGroupItem>
            {additionalFeatures.petsPermissibility} ?מותרות חיות מחמד
          </ListGroupItem>
          <ListGroupItem>
            :בקשות תחזוקה
            <ul>
              {additionalFeatures.maintenanceRequests.map((request) => (
                <li key={request.id}>
                  {request.date} - {request.description} ({request.status})
                </li>
              ))}
            </ul>
          </ListGroupItem>
          <ListGroupItem>
            Renewal Consideration: {additionalFeatures.renewalConsideration}
          </ListGroupItem>
        </ListGroup>
      </Card>

      <div>
        {formCompleted ? (
          <div className="form-completed-message">
            <Card>
              <Card.Body>
                <Card.Title>טופס שוכר ראשוני</Card.Title>
                <Card.Text className="success-message">
                  הטופס מולא בהצלחה.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <Button onClick={openTenantDialog}>Open Tenant Form</Button>
        )}
        <TenantFormDialog
          isOpen={tenantDialogOpen}
          handleCancel={closeTenantDialog}
          completeSave={handleFormSubmit}
          initialData={tenantFormData || undefined}
        />
      </div>

      <div>
        {quarterlyFormCompleted ? (
          <div className="form-completed-message">
            <Card>
              <Card.Body>
                <Card.Title>טופס שוכר רבעוני</Card.Title>
                <Card.Text className="success-message">
                  הטופס מולא בהצלחה.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <Button onClick={openQuarterlyTenantDialog}>
            Open Quarterly Tenant Form
          </Button>
        )}
        <QuarterlyTenantFormDialog
          isOpen={quarterlyTenantDialogOpen}
          handleCancel={closeQuarterlyTenantDialog}
          completeSave={handleQuarterlyFormSubmit}
          initialData={quarterlyTenantFormData || undefined}
        />
      </div>
    </Container>
  );
};
