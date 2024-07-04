import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import WarningIcon from '@mui/icons-material/Warning';
import { api } from '@/api';

interface IApartmentTamaWarningProps {
  apartmentId: string;
}

export const ApartmentTamaWarning: React.FC<IApartmentTamaWarningProps> = ({
  apartmentId,
}) => {
  const [isHasTama, setIsHasTama] = useState<boolean>(false);

  useEffect(() => {
    const checkTama = async () => {
      const tamaRes =
        await api.apartment.checkTamaCloseToApartment(apartmentId);

      setIsHasTama(tamaRes);
    };

    checkTama();
  }, [apartmentId]);

  const handleTamaClick = useCallback(async () => {
    window.open(
      'https://www.govmap.gov.il/map.html?bb=1&zb=1&in=1&c=167818.55,634749.67&z=7&lay=TABA_MSBS_ITM,ADD_PROJECTS_UR_MUCHRAZ,URBANRENEWAL_SETTLMENT',
      '_blank',
    );
  }, []);

  return (
    <>
      {isHasTama && (
        <Button onClick={handleTamaClick} variant="light">
          <WarningIcon color="warning" />
        </Button>
      )}
    </>
  );
};
