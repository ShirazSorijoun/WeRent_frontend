import { ICoordinates } from '@/models/adressCheck';
import proj4 from 'proj4';

// Define the ITM and UTM projections
proj4.defs(
  'EPSG:2039',
  '+proj=tmerc +lat_0=31.73439361111112 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);

proj4.defs('WGS84', '+proj=longlat +datum=WGS84 +no_defs');

export const convertITMToUTM = (
  xCoord: number,
  yCoord: number,
): ICoordinates => {
  const conversionRes = proj4('EPSG:2039', 'WGS84', [xCoord, yCoord]);
  return { lat: conversionRes[0], lng: conversionRes[1] };
};
