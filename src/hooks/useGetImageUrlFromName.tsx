import { getStringOfUrl } from '@/utils/image';
import { useMemo } from 'react';

export const useGetImageUrlFromName = (fileName?: string): string => {
  const url = useMemo(() => getStringOfUrl(fileName), [fileName]);

  return url;
};
