import { z } from 'zod';

interface checkBoxOptionField {
  field: string;
  display: string;
}
export type IControlledCheckBoxOptions = checkBoxOptionField[];

export const createCheckBoxZod = (
  checkBoxOptions: IControlledCheckBoxOptions,
) => {
  const zodObject: Record<string, any> = {};
  checkBoxOptions.forEach((option) => {
    zodObject[option.field] = z.boolean().optional().default(false);
  });

  return z.object(zodObject);
};
