import React, { useEffect, useState, useCallback } from 'react';
import { TenantFormDialog } from '@/components/TenantForm';
import './style.css';
import { Button, Card } from 'react-bootstrap';
import { TenantQuestionnaireFormData } from '@@/TenantForm/formUtils';
import { getTenantFormByOwnerId } from '@/api/modelsServices/form-service';

export const ApartmentPersonalAreaPage: React.FC = () => {
  const [tenantDialogOpen, setTenantDialogOpen] = useState(false);
  const [tenantFormData, setTenantFormData] =
    useState<TenantQuestionnaireFormData | null>(null);
  const [formCompleted, setFormCompleted] = useState<boolean>(false);

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
              // Handle 404 error specifically
              setTenantFormData(null);
              setFormCompleted(false);
            } else {
              // Handle other errors
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

    fetchFormData();
  }, []);

  const openTenantDialog = useCallback(() => {
    setTenantDialogOpen(true);
  }, []);

  const closeTenantDialog = useCallback(() => {
    setTenantDialogOpen(false);
  }, []);

  const handleFormSubmit = useCallback(
    (data: TenantQuestionnaireFormData) => {
      setTenantFormData(data);
      setFormCompleted(true);
      closeTenantDialog();
    },
    [closeTenantDialog],
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
    </div>
  );
};
