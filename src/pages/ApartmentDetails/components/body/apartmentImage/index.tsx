import { api } from '@/api';
import { Button } from 'react-bootstrap';
import React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface IApartmentImageProps {
  refreshApartmentDisplay: () => Promise<void>;
  apartmentImage: string;
  apartmentId: string;
  isCreatedByUser: boolean;
}
export const ApartmentImage: React.FC<IApartmentImageProps> = ({
  apartmentImage,
  isCreatedByUser,
  apartmentId,
  refreshApartmentDisplay,
}) => {
  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) return;

    const selectedImage = files[0];

    try {
      if (apartmentId) {
        const imageResponse = await api.file.uploadImage(selectedImage);
        await api.apartment.updateApartment(apartmentId, {
          apartment_image: imageResponse,
        });

        refreshApartmentDisplay();
      }
    } catch {
      console.log('error to change img');
    }
  };

  const handleEditImg = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="col-md-6">
      <img src={apartmentImage} alt="Apartment" className="img-fluid mb-4" />
      {isCreatedByUser && (
        <>
          <Button
            onClick={handleEditImg}
            variant="light"
            style={{ marginRight: 'auto' }}
          >
            <AddPhotoAlternateIcon />
          </Button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            style={{ display: 'none' }}
          />
        </>
      )}
    </div>
  );
};
