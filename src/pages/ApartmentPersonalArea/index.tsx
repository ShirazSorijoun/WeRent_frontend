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
} from '@/api/modelsServices/form-service';
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
      street: '123 Main St',
      city: 'Springfield',
    },
    numOfRooms: 3,
    floorNumber: 4,
  };

  const rentalInformation = {
    leaseStartDate: '2023-01-01',
    leaseEndDate: '2024-01-01',
    leaseDuration: 12,
    rentalPricePerMonth: 1000,
    paymentDate: '5th',
    paymentMethod: 'Bank Transfer',
    bankDetails: {
      name: 'Bank of Springfield',
      accountNumber: '1234567890',
      branch: 'Main Branch',
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
        <h1>Apartment Personal Area</h1>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Apartment Details</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Street: {apartmentDetails.address.street}
              </ListGroupItem>
              <ListGroupItem>
                City: {apartmentDetails.address.city}
              </ListGroupItem>
              <ListGroupItem>
                Number of Rooms: {apartmentDetails.numOfRooms}
              </ListGroupItem>
              <ListGroupItem>
                Floor Number: {apartmentDetails.floorNumber}
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="mb-4">
            <Card.Header>Important Dates</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Date of Entering: {importantDates.dateOfEntering}
              </ListGroupItem>
              <ListGroupItem>
                Option Period: {importantDates.optionPeriod.startDate} to{' '}
                {importantDates.optionPeriod.endDate}
              </ListGroupItem>
              <ListGroupItem>
                Repair Dates: {importantDates.repairDates}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Rental Information</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Lease Start Date: {rentalInformation.leaseStartDate}
              </ListGroupItem>
              <ListGroupItem>
                Lease End Date: {rentalInformation.leaseEndDate}
              </ListGroupItem>
              <ListGroupItem>
                Lease Duration: {rentalInformation.leaseDuration} months
              </ListGroupItem>
              <ListGroupItem>
                Rental Price per Month: ${rentalInformation.rentalPricePerMonth}
              </ListGroupItem>
              <ListGroupItem>
                Payment Date: {rentalInformation.paymentDate}
              </ListGroupItem>
              <ListGroupItem>
                Payment Method: {rentalInformation.paymentMethod}
              </ListGroupItem>
              <ListGroupItem>
                Bank Name: {rentalInformation.bankDetails.name}
              </ListGroupItem>
              <ListGroupItem>
                Account Number: {rentalInformation.bankDetails.accountNumber}
              </ListGroupItem>
              <ListGroupItem>
                Branch: {rentalInformation.bankDetails.branch}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Tenant Information</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Name: {tenantInformation.name}</ListGroupItem>
              <ListGroupItem>
                ID Number: {tenantInformation.idNumber}
              </ListGroupItem>
              <ListGroupItem>
                Address: {tenantInformation.address}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Owner Information</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Name: {ownerInformation.name}</ListGroupItem>
              <ListGroupItem>
                ID Number: {ownerInformation.idNumber}
              </ListGroupItem>
              <ListGroupItem>Address: {ownerInformation.address}</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header>Additional Features</Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            Pets Permissibility: {additionalFeatures.petsPermissibility}
          </ListGroupItem>
          <ListGroupItem>
            Maintenance Requests:
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
                <Card.Title>Tenant Form</Card.Title>
                <Card.Text className="success-message">
                  The form has been filled out successfully.
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
                <Card.Title>Quarterly Tenant Form</Card.Title>
                <Card.Text className="success-message">
                  The form has been filled out successfully.
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
