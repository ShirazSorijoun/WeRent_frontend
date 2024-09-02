import React, { useEffect, useState, useMemo } from 'react';
import { QuarterlyTenantQuestionnaireFormData } from '@/components/TenantFormQuarterly/formUtils';
import { Button, Card } from 'react-bootstrap';
import { getTenantFormQuarterlyByOwnerId } from '@/api/modelsServices/tenant-form-service';
import { QuarterlyTenantFormDialog } from '@@/TenantFormQuarterly/TenantFormDialog';
import { QuarterlyTenantFormProps } from '@/types/types';

interface IProps {
  apartmentId?: string;
  ownerId?: string;
  startDate?: Date;
}

export const QuarterlyFormSection: React.FC<IProps> = ({
  apartmentId,
  ownerId,
  startDate,
}) => {
  const [quarterlyTenantDialogOpen, setQuarterlyTenantDialogOpen] =
    useState(false);
  const [quarterlyTenantFormData, setQuarterlyTenantFormData] =
    useState<QuarterlyTenantFormProps>();

  useEffect(() => {
    const fetchFormDataQuarterly = async () => {
      if (ownerId && apartmentId) {
        try {
          const responseQuarterly = await getTenantFormQuarterlyByOwnerId(
            ownerId,
            apartmentId!,
          );

          if (responseQuarterly) setQuarterlyTenantFormData(responseQuarterly);
        } catch (error) {
          console.error('Error fetching quarterly tenant form data:', error);
        }
      }
    };

    fetchFormDataQuarterly();
  }, [apartmentId, ownerId]);

  const openQuarterlyTenantDialog = () => {
    setQuarterlyTenantDialogOpen(true);
  };

  const closeQuarterlyTenantDialog = () => {
    setQuarterlyTenantDialogOpen(false);
  };

  const handleQuarterlyFormSubmit = (
    data: QuarterlyTenantQuestionnaireFormData,
  ) => {
    setQuarterlyTenantFormData(data);
    closeQuarterlyTenantDialog();
  };
  // Function to check if the current date is within the quarter period
  const isQuarterlyDue = useMemo(() => {
    if (!startDate) return false;

    const entryDate = new Date(startDate);
    const today = new Date();
    const monthsDifference =
      (today.getFullYear() - entryDate.getFullYear()) * 12 +
      (today.getMonth() - entryDate.getMonth());

    // Show the form if the difference is a multiple of 3 (every quarter)
    return monthsDifference % 3 === 0 && monthsDifference > 0;
  }, [startDate]);

  return isQuarterlyDue ? (
    <div>
      {quarterlyTenantFormData ? (
        <div className="form-completed-message" style={{ textAlign: 'right' }}>
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
        initialData={quarterlyTenantFormData}
      />
    </div>
  ) : (
    <></>
  );
};
