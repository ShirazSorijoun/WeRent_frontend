import React, { useEffect, useState, useCallback } from 'react';
import { TenantFormDialog } from '@/components/TenantForm';
import { QuarterlyTenantQuestionnaireFormData } from '@/components/TenantFormQuarterly/formUtils';
import './style.css';
import { Button, Card } from 'react-bootstrap';
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

  return (
    <div className="all-reviews-container">
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
    </div>
  );
};
