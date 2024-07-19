export interface IFormField {
  fieldName: string;
  label: string;
  requireError?: string;
  matchError?: string;
  typeError?: string;
}

export enum EBasicFieldType {
  dateTime = 'dateTime',
  date = 'date',
  float = 'float',
  int = 'int ',
  text = 'text',
  password = 'password',
  textArray = 'textArray',
  multiLineText = 'multiLineText',
  coordinate = 'coordinate',
  rating = 'rating',
}
