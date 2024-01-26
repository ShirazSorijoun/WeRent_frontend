import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import z from "zod";
import "./addApartment.css";
import { ApartmentProps } from "../../types/types";
import apartmentService from "../../services/apartments-service";

type ChangeEventTypes =
  | ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

const schema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  floor: z.number().min(0),
  sizeInSqMeters: z
    .number()
    .min(10, { message: "Size should be greater than or equal to 10" }),
  rooms: z.number().min(1),
  furniture: z.enum(["full", "partial", "none"]),
  price: z
    .number()
    .min(0, { message: "Price should be greater than or equal to 0" }),
  description: z.string().max(800, {
    message: "Description should be less than or equal to 800 characters",
  }),
});

const AddApartment: React.FC = () => {
  const [apartmentData, setApartmentData] = useState<ApartmentProps>({
    city: "",
    address: "",
    type: "Apartment",
    floor: 0,
    rooms: 1,
    sizeInSqMeters: 1,
    price: 0,
    entryDate: new Date(),
    apartment_image: "",
    furniture: "none",
    features: {
      parking: false,
      accessForDisabled: false,
      storageRoom: false,
      dimension: false,
      terrace: false,
      garden: false,
      elevators: false,
      airConditioning: false,
    },
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imgSrc, setImgSrc] = useState<File>();

  const handleChange = (e: ChangeEventTypes) => {
    let newValue;

    if (["floor", "rooms", "price", "sizeInSqMeters"].includes(e.target.name)) {
      if (e.target.name === "floor" || e.target.name === "price") {
        newValue = Math.max(+e.target.value, 0);
      } else if (
        e.target.name === "rooms" ||
        e.target.name === "sizeInSqMeters"
      ) {
        newValue = Math.max(+e.target.value, 1);
      }
    } else {
      newValue = e.target.value;
    }

    setApartmentData({
      ...apartmentData,
      [e.target.name]: newValue,
    });

    // Clear the error for the current field
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[e.target.name];
      return updatedErrors;
    });
  };

  const handleFeatureChange = (
    feature: keyof typeof apartmentData.features
  ) => {
    setApartmentData({
      ...apartmentData,
      features: {
        ...apartmentData.features,
        [feature]: !apartmentData.features[feature],
      },
    });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApartmentData({
      ...apartmentData,
      entryDate: new Date(e.target.value),
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      schema.parse(apartmentData);

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIzOWE1ZDIzYjZiZjg0MjAwYjZjMmEiLCJpYXQiOjE3MDYyNjkyNzd9.7kygS0dxbYZP9aNVYMCXJjKhSPfeSIHRRl1MWzDwt8Q";

      const formData = new FormData();
      formData.append("file", imgSrc as File);

      const imageResponse = await axios.post(
        "http://localhost:3000/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApartmentData((prevApartmentData) => ({
        ...prevApartmentData,
        apartment_image: imageResponse.data.url.replace(/\\/g, "/"),
      }));

      const { req } = apartmentService.postApartment(apartmentData, token);

      req
        .then((response) => {
          console.log("Apartment added successfully", response.data);
        })
        .catch((error) => {
          console.error("Error adding apartment", error);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            validationErrors[err.path.join(".")] = err.message;
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
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            type="text"
            className={`form-control ${errors["city"] ? "is-invalid" : ""}`}
            id="city"
            name="city"
            value={apartmentData.city}
            onChange={handleChange}
          />
          {errors["city"] && <p className="text-danger">{errors["city"]}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className={`form-control ${errors["address"] ? "is-invalid" : ""}`}
            id="address"
            name="address"
            value={apartmentData.address}
            onChange={handleChange}
          />
          {errors["address"] && (
            <p className="text-danger">{errors["address"]}</p>
          )}
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
            <option value="Garden apartment">Garden apartment</option>
            <option value="Private cottage">Private cottage</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Duplex">Duplex</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Unit">Unit</option>
            <option value="Vacation apartment">Vacation apartment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">What is in the apartment?</label>
          <div className="form-check">
            {Object.entries(apartmentData.features).map(([feature, value]) => (
              <div key={feature} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={feature}
                  checked={value}
                  onChange={() =>
                    handleFeatureChange(
                      feature as keyof typeof apartmentData.features
                    )
                  }
                />
                <label className="form-check-label" htmlFor={feature}>
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="floor" className="form-label">
            Floor:
          </label>
          <input
            type="number"
            className={`form-control ${errors["floor"] ? "is-invalid" : ""}`}
            id="floor"
            name="floor"
            value={apartmentData.floor}
            onChange={handleChange}
          />
          {errors["floor"] && <p className="text-danger">{errors["floor"]}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="rooms" className="form-label">
            Rooms:
          </label>
          <input
            type="number"
            className={`form-control ${errors["rooms"] ? "is-invalid" : ""}`}
            id="rooms"
            name="rooms"
            value={apartmentData.rooms}
            onChange={handleChange}
          />
          {errors["rooms"] && <p className="text-danger">{errors["rooms"]}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="sizeInSqMeters" className="form-label">
            Size in Sq Meters:
          </label>
          <input
            type="number"
            className={`form-control ${
              errors["sizeInSqMeters"] ? "is-invalid" : ""
            }`}
            id="sizeInSqMeters"
            name="sizeInSqMeters"
            value={apartmentData.sizeInSqMeters}
            onChange={handleChange}
          />
          {errors["sizeInSqMeters"] && (
            <p className="text-danger">{errors["sizeInSqMeters"]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="furniture" className="form-label">
            Furniture:
          </label>
          <select
            className="form-select"
            id="furniture"
            name="furniture"
            value={apartmentData.furniture}
            onChange={handleChange}
          >
            <option value="full">Full</option>
            <option value="partial">Partial</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="entryDate" className="form-label">
            Entry Date:
          </label>
          <input
            type="date"
            className={`form-control ${
              errors["entryDate"] ? "is-invalid" : ""
            }`}
            id="entryDate"
            name="entryDate"
            value={
              apartmentData.entryDate
                ? apartmentData.entryDate.toISOString().split("T")[0]
                : ""
            }
            onChange={handleDateChange}
          />
          {errors["entryDate"] && (
            <p className="text-danger">{errors["entryDate"]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className={`form-control ${errors["price"] ? "is-invalid" : ""}`}
            id="price"
            name="price"
            value={apartmentData.price}
            onChange={handleChange}
          />
          {errors["price"] && <p className="text-danger">{errors["price"]}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Additional Details:
          </label>
          <div className="textarea-container">
            <textarea
              placeholder="Additional details that will help market your property in the best way"
              rows={4}
              data-auto="textfield-text-area"
              className="form-control"
              name="description"
              value={apartmentData.description || ""}
              onChange={handleChange}
              style={{ resize: "none", width: "100%" }}
            ></textarea>
          </div>
          {errors["description"] && (
            <p className="text-danger">{errors["description"]}</p>
          )}
          <div className="assistive-text">
            {apartmentData.description
              ? `${apartmentData.description.length}/800`
              : "0/800"}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddApartment;
