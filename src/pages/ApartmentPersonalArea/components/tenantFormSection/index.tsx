import React, { useEffect, useState, useCallback } from 'react';
import { TenantFormDialog } from '@/components/TenantForm';
import { Button, Card } from 'react-bootstrap';
import { InitialTenantQuestionnaireFormData } from '@@/TenantForm/formUtils';
import { getTenantFormByOwnerId } from '@/api/modelsServices/tenant-form-service';
import { TenantFormProps } from '@/types/types';

interface IProps {
  apartmentId?: string;
  ownerId?: string;
}
export const TenantFormSection: React.FC<IProps> = ({
  apartmentId,
  ownerId,
}) => {
  const [tenantDialogOpen, setTenantDialogOpen] = useState(false);
  const [tenantFormData, setTenantFormData] = useState<TenantFormProps>();

  const fetchFormData = useCallback(async () => {
    if (ownerId && apartmentId) {
      try {
        const response = await getTenantFormByOwnerId(ownerId, apartmentId!);

        if (response) {
          setTenantFormData(response);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [apartmentId, ownerId]);

  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  const openTenantDialog = () => {
    setTenantDialogOpen(true);
  };

  const closeTenantDialog = () => {
    setTenantDialogOpen(false);
  };

  const handleFormSubmit = (data: InitialTenantQuestionnaireFormData) => {
    setTenantFormData(data);
    closeTenantDialog();
  };
  return (
    <div>
      {tenantFormData ? (
        <div className="form-completed-message" style={{ textAlign: 'right' }}>
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
        initialData={tenantFormData}
      />
    </div>
  );
};
