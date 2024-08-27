import { api } from '@/api';
import { Button, Typography } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';

interface props {
  apartmentId?: string;
}

export const ApartmentMatchButton: FC<props> = ({ apartmentId }) => {
  const [matchStatus, setMatchStatus] = useState<boolean>();
  const [isMatchExist, setIsMatchExist] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (apartmentId) {
          const statusRes = await api.match.getMatchStatus(apartmentId);
          setIsMatchExist(true);
          setMatchStatus(statusRes);
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkStatus();
  }, [apartmentId]);

  const matchApartment = async () => {
    await api.match.matchApartment(apartmentId!);
    setIsMatchExist(true);
  };

  const getMatchDisplayText = useMemo(() => {
    switch (matchStatus) {
      case true:
        return 'הבעלים אישר את ההתאמה ניתן לחתום באזור אישי';
      case false:
        return 'הבעלים דחה את ההתאמה, מוזמן להמשיך בחיפושי הדירה';
      default:
        return 'סימנת שהינך מעוניין בדירה, כעת מחכים לתגובת הבעלים';
    }
  }, [matchStatus]);

  return !isMatchExist ? (
    <Button onClick={matchApartment}>אני מעוניין בדירה זו</Button>
  ) : (
    <Typography>{getMatchDisplayText}</Typography>
  );
};
