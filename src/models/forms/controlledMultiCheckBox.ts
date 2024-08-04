import { z } from 'zod';

interface IMultiCheckBoxOptionField {
  field: string;
  display: string;
}
export type IControlledMultiCheckBoxOptions = IMultiCheckBoxOptionField[];

export const createMultiCheckBoxZod = (
  checkBoxOptions: IControlledMultiCheckBoxOptions,
) => {
  const zodObject: Record<string, any> = {};
  checkBoxOptions.forEach((option) => {
    zodObject[option.field] = z.boolean().optional().default(false);
  });

  return z.object(zodObject);
};
