import { format } from 'date-fns';
import { he } from 'date-fns/locale';

export const DATE_TEXT_FORMAT = 'dd/MM/yyyy';
export const DATE_TIME_TEXT_FORMAT = `${DATE_TEXT_FORMAT}, HH:mm:ss`;

export const dateFormatter = (
  date: Date | string,
  textFormat: string = DATE_TEXT_FORMAT,
) => format(new Date(date), textFormat, { locale: he });
