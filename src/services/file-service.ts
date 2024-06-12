import apiClient from './api-client';

interface IUploadResponse {
  url: string;
}
export const uploadImg = async (img: File) => {
  return new Promise<string>((resolve, reject) => {
    console.log('Uploading image...' + img);
    const formData = new FormData();
    if (img) {
      formData.append('file', img);
      apiClient
        .post<IUploadResponse>('file?file=123.png', formData, {
          headers: {
            'Content-Type': 'image/png',
          },
        })
        .then((res) => {
          console.log(res);
          resolve(res.data.url);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
};
