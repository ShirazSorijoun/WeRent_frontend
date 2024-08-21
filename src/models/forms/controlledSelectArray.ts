import { z, ZodSchema } from 'zod';

interface IControlledSelectArrayItem<T> {
  value: T;
  display: any;
}

export type IControlledSelectArray<T> = IControlledSelectArrayItem<T>[];

export const createObjectFromSelectArray = (
  valuesArray: IControlledSelectArray<string>,
) => {
  const object: Record<string, string> = {};
  valuesArray.forEach((value) => {
    object[value.value] = value.display;
  });

  return object;
};

export const zodOfStringSelectValues = (
  valuesArray: IControlledSelectArray<string>,
): ZodSchema => {
  const arrayForValidation = valuesArray.map(
    (option) => option.value,
  ) as unknown as readonly [string, ...string[]];

  return z
    .string()
    .refine((value: string) => arrayForValidation.includes(value), {
      message: 'חובה לבחור ערך',
    });
};
