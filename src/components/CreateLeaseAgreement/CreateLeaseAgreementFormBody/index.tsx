import React from 'react';
import {
  CreateLeaseAgreementFormPage1,
  CreateLeaseAgreementFormPage2,
  CreateLeaseAgreementFormPage3,
  CreateLeaseAgreementFormPage4,
  CreateLeaseAgreementFormPage5,
} from '../formPages';
import { IControlProps } from '@/models/form';
import { Box } from '@mui/material';

interface IProps extends IControlProps {
  tenantId: string;
  apartmentId: string;
  activeStep: number;
}

export const LeaseAgreementFormBody: React.FC<IProps> = ({
  control,
  activeStep,
  apartmentId,
  tenantId,
}) => {
  return (
    <>
      <Box sx={{ display: activeStep === 0 ? 'inherit' : 'none' }}>
        <CreateLeaseAgreementFormPage1
          control={control}
          apartmentId={apartmentId}
          tenantId={tenantId}
        />
      </Box>
      <Box sx={{ display: activeStep === 1 ? 'inherit' : 'none' }}>
        <CreateLeaseAgreementFormPage2 control={control} />
      </Box>
      <Box sx={{ display: activeStep === 2 ? 'inherit' : 'none' }}>
        <CreateLeaseAgreementFormPage3 control={control} />
      </Box>
      <Box sx={{ display: activeStep === 3 ? 'inherit' : 'none' }}>
        <CreateLeaseAgreementFormPage4 control={control} />
      </Box>
      <Box sx={{ display: activeStep === 4 ? 'inherit' : 'none' }}>
        <CreateLeaseAgreementFormPage5 control={control} />
      </Box>
    </>
  );
};
