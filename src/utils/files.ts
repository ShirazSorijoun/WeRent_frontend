
export const uploadImage = async (imageFile: File) => {
  const image = new FormData();
  image.append("image", imageFile);
  // return await api.image.uploadImage(image);
};

export const imageUrlToFile = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
  const file = new File([blob], fileName, { type: blob.type });

  return file;
};
