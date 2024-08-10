import { z } from 'zod';

interface IMultiCheckBoxOptionField {
  field: string;
  display: string;
}
export type IControlledMultiCheckBoxOptions = IMultiCheckBoxOptionField[];

export const createMultiCheckBoxZod = (
  checkBoxOptions: IControlledMultiCheckBoxOptions,
) => {
  const defaultObject: Record<string, boolean> = {};
  let zodObject = z.object({});
  checkBoxOptions.forEach((option) => {
    defaultObject[option.field] = false;
    zodObject = zodObject.extend({
      [option.field]: z.boolean().optional().default(false),
    });
  });

  return zodObject.optional().default(defaultObject);
};
