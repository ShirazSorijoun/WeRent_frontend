import React, { useCallback, useEffect, useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { api } from '@/api';
import { ICoordinates } from '@/models/addressCheck';
import { convertUTMToITM } from '@/utils/coordinates';
import { Button, Tooltip } from '@mui/material';

interface IApartmentTamaWarningProps {
  apartmentId?: string;
  coordinates?: ICoordinates;
}

export const ApartmentTamaWarning: React.FC<IApartmentTamaWarningProps> = ({
  apartmentId,
  coordinates,
}) => {
  const [isHasTama, setIsHasTama] = useState<boolean>(false);

  useEffect(() => {
    const checkTama = async () => {
      const tamaRes = apartmentId
        ? await api.apartment.checkTamaCloseToApartment(apartmentId)
        : false;

      setIsHasTama(tamaRes);
    };

    checkTama();
  }, [apartmentId]);

  const handleTamaClick = useCallback(() => {
    const coordinatesForMap = coordinates
      ? convertUTMToITM(coordinates)
      : [167818.55, 634749.67];

    window.open(
      `https://www.govmap.gov.il/map.html?bb=1&zb=1&in=1&c=${coordinatesForMap[0]},${coordinatesForMap[1]}&z=7&lay=TABA_MSBS_ITM,ADD_PROJECTS_UR_MUCHRAZ,URBANRENEWAL_SETTLMENT`,
      '_blank',
    );
  }, [coordinates]);

  return (
    <>
      {isHasTama && (
        <Tooltip
          title="קיימים פרויקטי בנייה בקרבת הנכס"
          placement="bottom-start"
        >
          <Button onClick={handleTamaClick}>
            <WarningIcon color="warning" />
          </Button>
        </Tooltip>
      )}
    </>
  );
};
