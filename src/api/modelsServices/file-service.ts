import { axiosInstance } from '../api';

const FILE_API_KEY = 'file';

const uploadImage = async (img: File, imageName?: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', img);

  return (
    await axiosInstance.post(
      `${FILE_API_KEY}/upload/${imageName ?? ''}`,
      formData,
      {
        headers: {
          'Content-Type': 'image/png',
        },
      },
    )
  ).data;
};

export const fileAPI = { uploadImage };
