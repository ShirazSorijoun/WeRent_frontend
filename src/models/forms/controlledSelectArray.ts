import { z } from 'zod';

interface IControlledSelectArrayItem<T> {
  value: T;
  display: any;
}

export type IControlledSelectArray<T> = IControlledSelectArrayItem<T>[];

export const zodOfStringSelect = (
  valuesArray: IControlledSelectArray<string>,
): z.ZodEnum<[string, ...string[]]> => {
  const arrayForValidation = valuesArray.map(
    (option) => option.value,
  ) as unknown as readonly [string, ...string[]];

  return z.enum(arrayForValidation);
};
