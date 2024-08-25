import React, { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  schema,
  FIFTH_STEP_NAME,
  FIRST_STEP_NAME,
  FORTH_STEP_NAME,
  SECOND_STEP_NAME,
  THIRD_STEP_NAME,
  leaseAgreementFormData,
  buildLeaseDataForForm,
} from '../formUtils';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { IFormSteps } from '@/models';

import { FormStepper } from '@@/common/formStepper';
import { useLeaseAgreementForm } from './hooks/useCreateLeaseAgreementDialog';
import { LeaseAgreementFormBody } from '../CreateLeaseAgreementFormBody';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { FormButtons } from '../../formButtons';
import { LeaseSignatureDialogActions } from '../leaseSignatureDialogActions';

interface IBasicProps {
  isOpen: boolean;
  handleCancel: () => void;
  completeSave: () => void;
  isForSignature?: boolean;
}

interface ICreateProps extends IBasicProps {
  tenantId: string;
  apartmentId: string;
  lease?: never;
}

interface IEditProps extends IBasicProps {
  lease: ILeaseAgreement;
  tenantId?: never;
  apartmentId?: never;
}
const steps: IFormSteps = [
  { label: '1', stepIdentifier: FIRST_STEP_NAME },
  { label: '2', stepIdentifier: SECOND_STEP_NAME },
  { label: '3', stepIdentifier: THIRD_STEP_NAME },
  { label: '4', stepIdentifier: FORTH_STEP_NAME },
  { label: '5', stepIdentifier: FIFTH_STEP_NAME },
];
type MyComponentProps = ICreateProps | IEditProps;

export const LeaseAgreementFormDialog: React.FC<MyComponentProps> = ({
  handleCancel,
  completeSave,
  apartmentId,
  tenantId,
  lease,
  isForSignature = false,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    disabled: isForSignature,
    resolver: zodResolver(schema),
    defaultValues: buildLeaseDataForForm(lease),
    reValidateMode: 'onChange',
  });

  const { handleSave, handleWrongFormData, isButtonLoading } =
    useLeaseAgreementForm();

  const [activeStep, setActiveStep] = useState<number>(0);

  const calcApartmentId = useMemo(
    () => lease?.apartment._id ?? apartmentId!,
    [apartmentId, lease?.apartment._id],
  );
  const calcTenantId = useMemo(
    () => lease?.tenantId ?? tenantId!,
    [lease?.tenantId, tenantId],
  );

  const onSubmit = async (formData: leaseAgreementFormData) => {
    const isSaved = await handleSave(
      formData,
      calcTenantId,
      calcApartmentId,
      lease?._id,
    );
    if (isSaved) completeSave();
  };

  const handleCloseDialog = (event: any, reason: string) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
  };

  return (
    <Dialog open={true} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>חוזה שכירות בלתי מוגנת</DialogTitle>
      <DialogContent>
        <FormStepper
          activeStep={activeStep}
          errors={errors}
          setActiveStep={setActiveStep}
          steps={steps}
        >
          <LeaseAgreementFormBody
            activeStep={activeStep}
            apartmentId={calcApartmentId}
            control={control}
            tenantId={calcTenantId}
          />
        </FormStepper>
      </DialogContent>
      <DialogActions>
        {isForSignature ? (
          <LeaseSignatureDialogActions
            handleCancel={handleCancel}
            lease={lease}
          />
        ) : (
          <FormButtons
            handleCancel={handleCancel}
            handleSave={handleSubmit(onSubmit, handleWrongFormData)}
            isLoading={isButtonLoading}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};
