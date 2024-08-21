import React, { useEffect, useState } from 'react';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import {
  ELeaseAgreementFields,
  leaseAgreementFormDataObject,
} from '@@/CreateLeaseAgreement/formUtils';
import { IControlProps } from '@/models/form';
import { api } from '@/api';
import { IUserData, defaultUserData } from '@/models';
import { IApartment, defaultApartment } from '@/models/apartment.model';

interface IProps extends IControlProps {
  tenantId: string;
  apartmentId: string;
}

export const CreateLeaseAgreementFormPage1: React.FC<IProps> = ({
  control,
  tenantId,
  apartmentId,
}) => {
  const [apartment, setApartment] = useState<IApartment>(defaultApartment);
  const [tenantData, setTenantData] = useState<IUserData>(defaultUserData);

  useEffect(() => {
    const fetchApartmentData = async (): Promise<void> => {
      if (apartmentId) {
        try {
          const apartmentData =
            await api.apartment.getApartmentById(apartmentId);
          setApartment(apartmentData);
        } catch (error) {
          console.error('Error fetching tenant data for lease form', error);
        }
      }
    };
    fetchApartmentData();
  }, [apartmentId]);

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (tenantId) {
        try {
          const owner = await api.user.getUserById(tenantId);
          setTenantData(owner);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };

    fetchOwnerData();
  }, [tenantId]);

  return (
    <>
      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.DATE]}
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={
          leaseAgreementFormDataObject[ELeaseAgreementFields.START_DATE]
        }
      />

      <BasicFieldController
        control={control}
        type={EBasicFieldType.date}
        fieldData={leaseAgreementFormDataObject[ELeaseAgreementFields.END_DATE]}
      />
    </>
  );
};
