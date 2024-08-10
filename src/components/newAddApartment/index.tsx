import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ApartmentFormData, schema, defaultFormValues } from './formUtils';
import { useEditApartment } from './hooks/useEditApartmentDialog';

import { AddApartmentBody } from './body';

export const NewAddApartment: React.FC = () => {
  const { handleSubmit, control, reset, setError } = useForm<ApartmentFormData>(
    {
      resolver: zodResolver(schema),
      defaultValues: defaultFormValues,
      resetOptions: {
        keepDirtyValues: false,
        keepErrors: true,
      },
    },
  );

  const {
    getApartmentForForm,
    handleSave,
    handleWrongFormData,
    isButtonLoading,
  } = useEditApartment(setError);

  useEffect(() => {
    const func = async () => {
      const apartmentForForm = await getApartmentForForm();
      reset(apartmentForForm);
    };

    func();
  }, [getApartmentForForm, reset]);

  const closeLogic = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    async (form: ApartmentFormData): Promise<void> => {
      const isSaved = await handleSave(form);
    },
    [handleSave],
  );

  return (
    <div className="container mt-5">
      <div className="col-sm-11 col-lg-11 col-xxl-11">
        <div className="card theme-wizard mb-5">
          <div className="card-header theme-wizard pt-3 pb-2 custom-header">
            <span className="d-none d-md-block mt-1 fs--1">
              Apartment details
            </span>
          </div>

          <div className="card-body py-3">
            <div className="row">
              <AddApartmentBody control={control} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
