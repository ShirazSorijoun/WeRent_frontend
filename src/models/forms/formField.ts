export interface IFormField {
  fieldName: string;
  label: string;
  requireError?: string;
  matchError?: string;
  typeError?: string;
}

export enum EBasicFieldType {
  date = 'date',
  float = 'float',
  int = 'int ',
  text = 'text',
  textArray = 'textArray',
  multiLineText = 'multiLineText',
  coordinate = 'coordinate',
}
