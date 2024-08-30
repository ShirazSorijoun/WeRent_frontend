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
import { useParams } from 'react-router';
import { getApartmentById } from '@/api/modelsServices/apartments-service';
import { getLeaseAgreementByApartmentId } from '@/api/modelsServices/leaseAgreement-service';
import { getUserById } from '@/api/modelsServices/user-service';

export const ApartmentPersonalAreaPage: React.FC = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

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

  const [hasEnteredApartment, setHasEnteredApartment] =
    useState<boolean>(false);
  const [isWithinEditPeriod, setIsWithinEditPeriod] = useState<boolean>(false);

  const [apartmentDetails, setApartmentDetails] = useState<any>(null);
  const [rentalInformation, setRentalInformation] = useState<any>(null);
  const [tenantInformation, setTenantInformation] = useState<any>(null);
  const [ownerInformation, setOwnerInformation] = useState<any>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'מידע לא זמין';
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL'); // Format the date for Hebrew locale
  };

  useEffect(() => {
    const fetchLeaseData = async () => {
      if (apartmentId) {
        const apartmentData = await getApartmentById(apartmentId);
        setApartmentDetails(apartmentData);

        console.log('apartmentId', apartmentId);
        const rentalData = await getLeaseAgreementByApartmentId(apartmentId);
        setRentalInformation(rentalData);

        const tenantData = await getUserById(
          rentalData.tenantId.toString() ?? '',
        );
        const ownerData = await getUserById(
          apartmentData.owner?.toString() ?? '',
        );

        setTenantInformation(tenantData);
        setOwnerInformation(ownerData);

        // Check if the current date is past the entry date and within one month for editing
        if (rentalData?.startDate) {
          const today = new Date();
          const entryDate = new Date(rentalData.startDate);
          const oneMonthLater = new Date(entryDate);
          oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

          setHasEnteredApartment(today >= entryDate);
          setIsWithinEditPeriod(today <= oneMonthLater);
        }
      }
    };

    const fetchFormData = async () => {
      try {
        const ownerId = localStorage.getItem('userId');
        if (ownerId) {
          try {
            const response = await getTenantFormByOwnerId(
              ownerId,
              apartmentId!,
            );

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
            const responseQuarterly = await getTenantFormQuarterlyByOwnerId(
              ownerId,
              apartmentId!,
            );

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

    fetchLeaseData();
    fetchFormData();
    fetchFormDataQuarterly();
  }, [apartmentId]);

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

  // Function to check if the current date is within the quarter period
  const isQuarterlyDue = (entryDate: Date) => {
    const today = currentDate;
    const monthsDifference =
      (today.getFullYear() - entryDate.getFullYear()) * 12 +
      (today.getMonth() - entryDate.getMonth());

    // Show the form if the difference is a multiple of 3 (every quarter)
    return monthsDifference % 3 === 0 && monthsDifference > 0;
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
                רחוב: {apartmentDetails?.address ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                עיר: {apartmentDetails?.city ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                מספר חדרים: {apartmentDetails?.numberOfFloors ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                קומה: {apartmentDetails?.floor ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                גודל הדירה: {apartmentDetails?.sizeInSqMeters ?? 'מידע לא זמין'}{' '}
                מטר
              </ListGroupItem>
              <ListGroupItem>
                ריהוט: {apartmentDetails?.furniture ?? 'מידע לא זמין'}
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
                תאריך תחילת השכירות:{' '}
                {formatDate(rentalInformation?.startDate ?? null)}
              </ListGroupItem>
              <ListGroupItem>
                תאריך סיום השכירות:{' '}
                {formatDate(rentalInformation?.endDate ?? null)}
              </ListGroupItem>
              <ListGroupItem>
                תקופת השכרה:{' '}
                {rentalInformation?.numOfDaysForRepair ?? 'מידע לא זמין'} חודשים
              </ListGroupItem>
              <ListGroupItem>
                סכום השכירות החודשי: ₪
                {rentalInformation?.rentalPricePerMonth ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                תאריך תשלום:{' '}
                {rentalInformation?.dayOfTheMonthForPayment ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                שיטת תשלום: {rentalInformation?.paymentMethod ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                שם הבנק: {rentalInformation?.nameOfBank ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                מספר חשבון:{' '}
                {rentalInformation?.bankAccountNumber ?? 'מידע לא זמין'}
              </ListGroupItem>
              <ListGroupItem>
                סניף: {rentalInformation?.bankBranch ?? 'מידע לא זמין'}
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
              <ListGroupItem>
                {tenantInformation?.firstName ?? 'מידע לא זמין'}{' '}
                {tenantInformation?.lastName ?? 'מידע לא זמין'} :שם
              </ListGroupItem>
              <ListGroupItem>
                {tenantInformation?.personalId ?? 'מידע לא זמין'} :תעודת זהות
              </ListGroupItem>
              <ListGroupItem>
                {tenantInformation?.streetAddress ?? 'מידע לא זמין'} ,{' '}
                {tenantInformation?.cityAddress ?? 'מידע לא זמין'} :כתובת
              </ListGroupItem>
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
              <ListGroupItem>
                {ownerInformation?.firstName ?? 'מידע לא זמין'}{' '}
                {ownerInformation?.lastName ?? 'מידע לא זמין'} :שם
              </ListGroupItem>
              <ListGroupItem>
                {ownerInformation?.personalId ?? 'מידע לא זמין'} :תעודת זהות
              </ListGroupItem>
              <ListGroupItem>
                {ownerInformation?.streetAddress ?? 'מידע לא זמין'},{' '}
                {ownerInformation?.cityAddress ?? 'מידע לא זמין'} :כתובת
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header style={{ textAlign: 'right' }}>תכונות נוספות</Card.Header>
        <ListGroup className="list-group-flush" style={{ textAlign: 'right' }}>
          <ListGroupItem>
            {rentalInformation?.animal ? '✔' : '✖'} ?מותרות חיות מחמד
          </ListGroupItem>
        </ListGroup>
      </Card>

      {rentalInformation &&
      localStorage.getItem('userId') &&
      rentalInformation.tenantId === localStorage.getItem('userId') &&
      hasEnteredApartment ? (
        <div>
          {formCompleted ? (
            <div
              className="form-completed-message"
              style={{ textAlign: 'right' }}
            >
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
            <Button onClick={openTenantDialog}>מלא את טופס השוכר</Button>
          )}
          <TenantFormDialog
            isOpen={tenantDialogOpen}
            handleCancel={closeTenantDialog}
            completeSave={handleFormSubmit}
            initialData={tenantFormData || undefined}
          />
        </div>
      ) : null}

      {rentalInformation &&
      localStorage.getItem('userId') &&
      rentalInformation.tenantId === localStorage.getItem('userId') &&
      hasEnteredApartment &&
      isQuarterlyDue(new Date(rentalInformation.startDate)) ? (
        <div>
          {quarterlyFormCompleted ? (
            <div
              className="form-completed-message"
              style={{ textAlign: 'right' }}
            >
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
              מלא את טופס השוכר הרבעוני
            </Button>
          )}
          <QuarterlyTenantFormDialog
            isOpen={quarterlyTenantDialogOpen}
            handleCancel={closeQuarterlyTenantDialog}
            completeSave={handleQuarterlyFormSubmit}
            initialData={quarterlyTenantFormData || undefined}
          />
        </div>
      ) : null}
    </Container>
  );
};
