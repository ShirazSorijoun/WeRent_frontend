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
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useGetImageUrlFromName } from '@/hooks';
import { dateFormatter } from '@/utils/date';

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
  disabledFeature: { display: 'flex' },
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
        <Grid item key={key} flexDirection="row" xs={1} sx={style.feature}>
          <Icon sx={style.featureIcon} />
          <Typography>
            {`${value ? 'יש' : 'אין'} ${apartmentFeaturesObject[key]}`}
          </Typography>
        </Grid>
      );
    });
  }, [apartment.features]);

  return (
    <>
      <Grid container spacing={3} sx={{ direction: 'rtl' }}>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">{apartment.city}</Typography>
            <Typography variant="body1">{apartment.address}</Typography>
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
          </Grid>
          <Grid item flex={2}>
            <img
              src={apartmentImage}
              alt="Apartment"
              className="img-fluid mb-4"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Typography>Owner: {ownerName}</Typography>
          <PhoneIcon />
          <Typography>{ownerData?.phoneNumber ?? ''}</Typography>
        </Grid>
      </Grid>
      {/*
          <a data-auto="phone-number-button" className="css-qa186o e1g5ext4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill="#303030"
                fillRule="evenodd"
                d="M4.869 2.834l1.292 1.292a1 1 0 0 1 0 1.414L5.126 6.575c.342.93.923 1.801 1.742 2.612.819.81 1.69 1.417 2.612 1.821l1.086-1.183a1 1 0 0 1 1.39-.08l1.147.989a1 1 0 0 1 .128 1.382l-.545.682a2 2 0 0 1-1.65.749c-2.295-.102-4.265-.974-5.91-2.619C3.463 9.264 2.59 7.155 2.505 4.601a2 2 0 0 1 .798-1.666l.259-.194a1 1 0 0 1 1.307.093z"
              ></path>
            </svg>
            {ownerData?.phoneNumber ?? ''}
          </a>
        </div>
      </div> */}
    </>
  );
};
