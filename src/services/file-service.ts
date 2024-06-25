import { axiosInstance } from "@/api/api";

interface UploadResponse {
  url: string;
}

export const uploadImg = async (img: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    console.log('Uploading image...', img);
    const formData = new FormData();
    if (img) {
      formData.append('file', img);
      axiosInstance
        .post<UploadResponse>('file/upload?file=123.png', formData, {
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
    } else {
      reject(new Error('No image provided'));
    }
  });
};
