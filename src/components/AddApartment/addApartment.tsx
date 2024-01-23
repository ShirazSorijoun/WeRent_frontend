import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import z from "zod"

type ApartmentType =
  | 'Apartment'
  | 'Garden Apartment'
  | 'A private cottage'
  | 'Townhouse'
  | 'Duplex'
  | 'Penthouse'
  | 'Unit'
  | 'Vacation Apartment'
  | 'Other';

type ApartmentProps = {
  initialApartment?: {
    city: string;
    address: string;
    type: ApartmentType;
    floor: number;
    rooms: number;
    sizeInSqMeters: number;
    entryDate: Date;
    apartmentImage?: string;
  };
};

const schema = z.object({
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    floor: z.number().min(0, { message: 'Floor should be legal' }),
    sizeInSqMeters: z.number().min(10, { message: 'Size should be greater than or equal to 10' }),
    rooms: z.number().min(1, { message: 'Number of rooms should be greater than 0' }),
  });

const AddApartment: React.FC<ApartmentProps> = ({ initialApartment }) => {

  const [apartmentData, setApartmentData] = useState({
    city: initialApartment?.city || '',
    address: initialApartment?.address || '',
    type: initialApartment?.type || 'Apartment',
    floor: initialApartment?.floor || 0,
    rooms: initialApartment?.rooms || 1,
    sizeInSqMeters: initialApartment?.sizeInSqMeters || 1,
    entryDate: initialApartment?.entryDate ? new Date(initialApartment.entryDate) : new Date(),
    apartmentImage: initialApartment?.apartmentImage || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let newValue;
  
    if (['floor', 'rooms', 'sizeInSqMeters'].includes(e.target.name)) {
      if (e.target.name === 'floor') {
        newValue = Math.max(+e.target.value, 0);
      } else if(e.target.name === 'rooms' || e.target.name === 'sizeInSqMeters') {
        newValue = Math.max(+e.target.value, 1);
      }
    } else {
      newValue = e.target.value;
    }
  
    setApartmentData({
      ...apartmentData,
      [e.target.name]: newValue,
    });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApartmentData({
      ...apartmentData,
      entryDate: new Date(e.target.value),
    });
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      schema.parse(apartmentData);

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwMTQ5YzI1NTkxMjFmMTgxMTk0NTAiLCJpYXQiOjE3MDYwMzg0Mjl9.SoDsgn4SEYcYaynJDTU1N9oH3sTxIZBdKmXgytKd-TY";

      const response = await axios.post(
        'http://localhost:3000/apartment/create',
        { apartment: apartmentData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Apartment added successfully', response.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            validationErrors[err.path.join('.')] = err.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };


  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            type="text"
            className={`form-control ${errors['city'] ? 'is-invalid' : ''}`}
            id="city"
            name="city"
            value={apartmentData.city}
            onChange={handleChange}
          />
          {errors['city'] && <p className="text-danger">{errors['city']}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className={`form-control ${errors['address'] ? 'is-invalid' : ''}`}
            id="address"
            name="address"
            value={apartmentData.address}
            onChange={handleChange}
          />
          {errors['address'] && <p className="text-danger">{errors['address']}</p>}
        </div>
        <div className="mb-3">
    <label htmlFor="apartmentType" className="form-label">
        Apartment Type:
     </label>
       <select
          className="form-select"
          id="apartmentType"
          name="type"
          value={apartmentData.type}
          onChange={handleChange}
          >
           <option value="Apartment">Apartment</option>
        <option value="Garden Apartment">Garden Apartment</option>
    <option value="A private cottage">A private cottage</option>
    <option value="Townhouse">Townhouse</option>
    <option value="Duplex">Duplex</option>
    <option value="Penthouse">Penthouse</option>
    <option value="Unit">Unit</option>
    <option value="Vacation Apartment">Vacation Apartment</option>
    <option value="Other">Other</option>
  </select>
</div>
        <div className="mb-3">
          <label htmlFor="floor" className="form-label">
            Floor:
          </label>
          <input
            type="number"
            className={`form-control ${errors['floor'] ? 'is-invalid' : ''}`}
            id="floor"
            name="floor"
            value={apartmentData.floor}
            onChange={handleChange}
          />
          {errors['floor'] && <p className="text-danger">{errors['floor']}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="rooms" className="form-label">
            Rooms:
          </label>
          <input
            type="number"
            className={`form-control ${errors['rooms'] ? 'is-invalid' : ''}`}
            id="rooms"
            name="rooms"
            value={apartmentData.rooms}
            onChange={handleChange}
          />
          {errors['rooms'] && <p className="text-danger">{errors['rooms']}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="sizeInSqMeters" className="form-label">
            Size in Sq Meters:
          </label>
          <input
            type="number"
            className={`form-control ${errors['sizeInSqMeters'] ? 'is-invalid' : ''}`}
            id="sizeInSqMeters"
            name="sizeInSqMeters"
            value={apartmentData.sizeInSqMeters}
            onChange={handleChange}
          />
          {errors['sizeInSqMeters'] && (
            <p className="text-danger">{errors['sizeInSqMeters']}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="entryDate" className="form-label">
            Entry Date:
          </label>
          <input
            type="date"
            className={`form-control ${errors['entryDate'] ? 'is-invalid' : ''}`}
            id="entryDate"
            name="entryDate"
            value={apartmentData.entryDate ? apartmentData.entryDate.toISOString().split('T')[0] : ''}
            onChange={handleDateChange}
          />
          {errors['entryDate'] && <p className="text-danger">{errors['entryDate']}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="apartmentImage" className="form-label">
            Apartment Image URL:
          </label>
          <input
            type="text"
            className={`form-control ${errors['apartmentImage'] ? 'is-invalid' : ''}`}
            id="apartmentImage"
            name="apartmentImage"
            value={apartmentData.apartmentImage}
            onChange={handleChange}
          />
          {errors['apartmentImage'] && (
            <p className="text-danger">{errors['apartmentImage']}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};


export default AddApartment;

