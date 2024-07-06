import { imageURL } from '@/api';
import { useMemo } from 'react';

export const useGetImageUrlFromName = (fileName?: string): string => {
  const url = useMemo(() => {
    if (!fileName) return '';

    return fileName.includes('google') ? fileName : `${imageURL}/${fileName}`;
  }, [fileName]);

  return url;
};
