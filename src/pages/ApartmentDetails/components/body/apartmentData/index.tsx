import { api } from '@/api';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  apartmentFeaturesObject,
  apartmentFurnitureObject,
  apartmentTypeObject,
  IApartment,
} from '@/models/apartment.model';
import { IUserData, styleType } from '@/models';
import {
  Typography,
  Grid,
  Stack,
  Divider,
  SvgIconTypeMap,
  Avatar,
  Card,
  CardHeader,
  Button,
  Box,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import HotelIcon from '@mui/icons-material/Hotel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CropFreeIcon from '@mui/icons-material/CropFree';
import ElevatorIcon from '@mui/icons-material/Elevator';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DeckIcon from '@mui/icons-material/Deck';
import YardIcon from '@mui/icons-material/Yard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useGetImageUrlFromName } from '@/hooks';
import { dateFormatter } from '@/utils/date';
import { ApartmentTamaWarning } from '../apartmentTamaWarning';

interface IApartmentDataProps {
  apartment: IApartment;
  apartmentId: string;
  isCreatedByUser: boolean;
}

const featuresIcons: Record<
  string,
  OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  }
> = {
  parking: LocalParkingIcon,
  accessForDisabled: AccessibleIcon,
  storage: WarehouseIcon,
  dimension: ShieldOutlinedIcon,
  terrace: DeckIcon,
  garden: YardIcon,
  elevators: ElevatorIcon,
  airConditioning: AcUnitIcon,
};

const style: styleType = {
  feature: { display: 'flex' },
  disabledFeature: { display: 'flex', opacity: 0.4 },
  featureIcon: { paddingLeft: '6px' },
};

export const ApartmentData: React.FC<IApartmentDataProps> = ({ apartment }) => {
  const [ownerData, setOwnerData] = useState<IUserData>();

  const apartmentImage = useGetImageUrlFromName(apartment.apartment_image);

  const fetchOwnerData = useCallback(async (ownerId?: string) => {
    if (ownerId) {
      try {
        const owner = await api.user.getUserById(ownerId);
        setOwnerData(owner);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    }
  }, []);

  const ownerName = useMemo(
    () => `${ownerData?.firstName ?? ''} ${ownerData?.lastName ?? ''}`,
    [ownerData],
  );

  const formattedDate = useMemo(
    () => dateFormatter(apartment.entryDate),
    [apartment.entryDate],
  );

  useEffect(() => {
    if (apartment?.owner) fetchOwnerData(apartment.owner);
  }, [apartment.owner, fetchOwnerData]);

  const featureDisplay = useMemo(() => {
    return Object.entries(apartment.features).map(([key, value]) => {
      const Icon = featuresIcons[key];

      return (
        <Grid
          item
          key={key}
          flexDirection="row"
          xs={1}
          sx={value ? style.feature : style.disabledFeature}
        >
          <Icon sx={style.featureIcon} />
          <Typography>
            {`${value ? 'יש' : 'אין'} ${apartmentFeaturesObject[key]}`}
          </Typography>
        </Grid>
      );
    });
  }, [apartment.features]);

  return (
    <Grid container spacing={3} sx={{ direction: 'rtl' }}>
      <Grid item container justifyContent="space-between">
        <Grid item container alignItems="center" flex={1}>
          <Grid item>
            <Typography variant="h4">{apartment.city}</Typography>
            <Typography variant="body1">{apartment.address}</Typography>
          </Grid>
          <Grid item>
            <ApartmentTamaWarning
              apartmentId={apartment._id}
              coordinates={apartment.coordinate}
            />
          </Grid>
        </Grid>
        <Grid item alignContent="center">
          <Typography variant="h5">{apartment.price} ₪</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Stack
          direction="row"
          spacing={3}
          useFlexGap
          flexWrap="wrap"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: 'black' }}
            />
          }
        >
          <Stack direction="row" spacing={1} useFlexGap>
            <BusinessIcon />
            <Typography>{apartmentTypeObject[apartment.type]}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} useFlexGap>
            <HotelIcon />
            <Typography>{apartment.rooms} חדרים</Typography>
          </Stack>
          <Stack direction="row" spacing={1} useFlexGap>
            <ArrowUpwardIcon />
            <Typography>
              קומה {apartment.floor} מתוך {apartment.numberOfFloors} קומות
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} useFlexGap>
            <CropFreeIcon />
            <Typography>{apartment.sizeInSqMeters} מ"ר</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid container item spacing={1} direction="row">
        <Grid item container spacing={5} flex={1} direction="column">
          <Grid item>
            <Typography variant="h6">מה בדירה:</Typography>
            <Grid container columns={2} rowSpacing={3}>
              {featureDisplay}
            </Grid>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1} useFlexGap>
              <Typography sx={{ fontWeight: 600 }}>תאריך כניסה:</Typography>
              <Typography>{formattedDate}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap>
              <Typography sx={{ fontWeight: 600 }}>ריהוט: </Typography>
              <Typography>
                {apartmentFurnitureObject[apartment.furniture]}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      marginRight: 0,
                      marginLeft: '16px',
                      backgroundColor: '#edf6f7',
                    }}
                  >
                    <PersonIcon sx={{ color: '#018489' }} />
                  </Avatar>
                }
                sx={{
                  '& .MuiCardHeader-action': {
                    margin: 0, // Disables the margin on the action slot
                  },
                }}
                title={`בעלים: ${ownerName}`}
                action={
                  <Button
                    data-auto="phone-number-button"
                    variant="text"
                    startIcon={<PhoneIcon sx={{ color: '#018489' }} />}
                    sx={{
                      color: '#303030',
                      direction: 'ltr',
                    }}
                  >
                    {ownerData?.phoneNumber ?? ''}
                  </Button>
                }
              />
            </Card>
          </Grid>
        </Grid>
        <Grid item display="flex" justifyContent="center" flex={2}>
          <Box
            component="img"
            sx={{ maxHeight: '420px' }}
            alt="Apartment"
            src={apartmentImage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
