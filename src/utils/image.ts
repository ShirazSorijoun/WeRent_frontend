import { imageURL } from '@/api';

export const getStringOfUrl = (fileName?: string) => {
  if (!fileName) return '';

  return fileName.includes('google') ? fileName : `${imageURL}/${fileName}`;
};
