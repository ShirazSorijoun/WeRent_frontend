import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import z from "zod";
import "./addApartment.css";
import { ApartmentProps } from "../../types/types";
import apartmentService from "../../services/apartments-service";
import Uploader from "../Uploader/uploader";

type ChangeEventTypes =
  | ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

const featureConfig = [
  { id: "parking", name: "Parking" },
  { id: "accessForDisabled", name: "Access for Disabled" },
  { id: "storage", name: "Storage Room" },
  { id: "dimension", name: "Dimension" },
  { id: "terrace", name: "Terrace" },
  { id: "garden", name: "Garden" },
  { id: "elevators", name: "Elevator" },
  { id: "airConditioning", name: "Air conditioning" },
];

const schema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  type: z.string().refine((value) => value !== "Select the property type", {
    message: "Property type is a required field",
  }),
  floor: z.number().min(0),
  numberOfFloors: z.number().min(0),
  sizeInSqMeters: z
    .number()
    .min(10, { message: "Size should be greater than 10" }),
  rooms: z.number().min(1),
  furniture: z.enum(["full", "partial", "none"]),
  price: z.number().min(0, { message: "Price should be greater than 0" }),
  description: z
    .string()
    .max(800, { message: "Description should be less than 800 characters" }),
});

const AddApartment: React.FC = () => {
  const [apartmentData, setApartmentData] = useState<ApartmentProps>({
    city: "",
    address: "",
    type: "Select the property type",
    floor: 0,
    numberOfFloors: 0,
    rooms: 1,
    sizeInSqMeters: 1,
    price: 0,
    entryDate: new Date(),
    apartment_image: "",
    furniture: "none",
    features: {
      parking: false,
      accessForDisabled: false,
      storage: false,
      dimension: false,
      terrace: false,
      garden: false,
      elevators: false,
      airConditioning: false,
    },
    description: "",
    phone: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const token = localStorage.getItem("accessToken");

          if (!token) {
            console.error("Access token not found in local storage");
            return;
          }

          const response = await axios.get(
            `http://localhost:3000/user/id/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const { name, email } = response.data;
          setUserData({ name, email });
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleNextStep = () => {
    if (currentStep === 2) {
      try {
        schema.parse(apartmentData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationErrors: { [key: string]: string } = {};
          error.errors.forEach((err) => {
            if (err.path) {
              validationErrors[err.path.join(".")] = err.message;
            }
          });
          setErrors(validationErrors);
          return;
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleChange = (e: ChangeEventTypes) => {
    let newValue;

    if (
      ["floor", "numberOfFloors", "rooms", "price", "sizeInSqMeters"].includes(
        e.target.name
      )
    ) {
      if (
        e.target.name === "numberOfFloors" ||
        e.target.name === "floor" ||
        e.target.name === "price"
      ) {
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

  const handlePhoneChange = (e: ChangeEventTypes) => {
    const phoneNumber = e.target.value;

    // Regular expression for a valid phone number
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Enter a valid 10-digit phone number");
    } else {
      setPhoneError(null);
    }

    setApartmentData({
      ...apartmentData,
      phone: phoneNumber,
    });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApartmentData({
      ...apartmentData,
      entryDate: new Date(e.target.value),
    });
  };

  const handleFileChange = (file: File) => {
    setUploadedFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Access token not found in local storage");
      return;
    }

    if (phoneError) {
      // Don't submit the form if there is a phone number error
      return;
    }

    let imageUrl: string | undefined = undefined;

    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

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

      imageUrl = imageResponse.data.url.replace(/\\/g, "/");
    }

    const apartmentDataWithImage = {
      ...apartmentData,
      apartment_image: imageUrl || undefined,
    };

    const { req } = apartmentService.postApartment(
      apartmentDataWithImage,
      token
    );

    req
      .then((response) => {
        console.log("Apartment added successfully", response.data);
      })
      .catch((error) => {
        console.error("Error adding apartment", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="col-sm-11 col-lg-11 col-xxl-11">
        <div className="card theme-wizard mb-5">
          <div className="card-header bg-light pt-3 pb-2">
            <ul className="nav justify-content-between">
              <a className="nav-link fw-semi-bold">
                {currentStep === 1 && (
                  <span className="d-none d-md-block mt-1 fs--1">Photos</span>
                )}
                {currentStep === 2 && (
                  <span className="d-none d-md-block mt-1 fs--1">
                    Apartment details
                  </span>
                )}
                {currentStep === 3 && (
                  <span className="d-none d-md-block mt-1 fs--1">
                    Contact information
                  </span>
                )}
              </a>
            </ul>
          </div>

          <div className="card-body py-3">
            <div className="row">
              <div className="col-md-6">
                {currentStep === 1 && (
                  <div className="px-sm-3 px-md-5">
                    <h2 className="mb-2">Select a picture</h2>
                    <p>
                      The process of adding the image is the most important part
                      of creating the details of the apartment
                    </p>
                    <div className="mb-3">
                      <Uploader onFileChange={handleFileChange} />
                    </div>
                    <button
                      type="button"
                      className="button-71"
                      onClick={handleNextStep}
                    >
                      Continue to fill in details
                    </button>
                  </div>
                )}
              </div>

              <div className="card-body py-3">
                {currentStep === 2 && (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        {/* (Left Side) */}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Apartment Type:
                            </label>
                            <select
                              className="form-select"
                              id="apartmentType"
                              name="type"
                              value={apartmentData.type}
                              onChange={handleChange}
                            >
                              <option value="">Select the property type</option>
                              <option>Apartment</option>
                              <option>Garden apartment</option>
                              <option>Private/Cottage</option>
                              <option>Townhouse</option>
                              <option>Duplex</option>
                              <option>Roof/Penthouse</option>
                              <option>Unit</option>
                              <option>Vacation apartment</option>
                              <option>Other</option>
                            </select>
                            {errors["type"] && (
                              <p className="text-danger">{errors["type"]}</p>
                            )}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                              City:
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors["city"] ? "is-invalid" : ""
                              }`}
                              id="city"
                              name="city"
                              placeholder="Type a city or town name"
                              value={apartmentData.city}
                              onChange={handleChange}
                            />
                            {errors["city"] && (
                              <p className="text-danger">{errors["city"]}</p>
                            )}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Address:
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors["address"] ? "is-invalid" : ""
                              }`}
                              id="address"
                              name="address"
                              placeholder="Type a street name"
                              value={apartmentData.address}
                              onChange={handleChange}
                            />
                            {errors["address"] && (
                              <p className="text-danger">{errors["address"]}</p>
                            )}
                          </div>
                          <div className="mb-3 row">
                            <div className="col">
                              <label htmlFor="floor" className="form-label">
                                Floor:
                              </label>
                              <input
                                type="number"
                                className={`form-control ${
                                  errors["floor"] ? "is-invalid" : ""
                                }`}
                                id="floor"
                                name="floor"
                                value={apartmentData.floor}
                                onChange={handleChange}
                              />
                              {errors["floor"] && (
                                <p className="text-danger">{errors["floor"]}</p>
                              )}
                            </div>

                            <div className="col">
                              <label
                                htmlFor="numberOfFloors"
                                className="form-label"
                              >
                                From a floor:
                              </label>
                              <input
                                type="number"
                                className={`form-control ${
                                  errors["numberOfFloors"] ? "is-invalid" : ""
                                }`}
                                id="numberOfFloors"
                                name="numberOfFloors"
                                value={apartmentData.numberOfFloors}
                                onChange={handleChange}
                              />
                              {errors["numberOfFloors"] && (
                                <p className="text-danger">
                                  {errors["numberOfFloors"]}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="rooms" className="form-label">
                              Number of rooms:
                            </label>
                            <input
                              type="number"
                              className={`form-control ${
                                errors["rooms"] ? "is-invalid" : ""
                              }`}
                              id="rooms"
                              name="rooms"
                              value={apartmentData.rooms}
                              onChange={handleChange}
                            />
                            {errors["rooms"] && (
                              <p className="text-danger">{errors["rooms"]}</p>
                            )}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="sizeInSqMeters"
                              className="form-label"
                            >
                              The size of the apartment:
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
                              <p className="text-danger">
                                {errors["sizeInSqMeters"]}
                              </p>
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
                                  ? apartmentData.entryDate
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={handleDateChange}
                            />
                            {errors["entryDate"] && (
                              <p className="text-danger">
                                {errors["entryDate"]}
                              </p>
                            )}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                              Price:
                            </label>
                            <input
                              type="number"
                              className={`form-control ${
                                errors["price"] ? "is-invalid" : ""
                              }`}
                              id="price"
                              name="price"
                              value={apartmentData.price}
                              onChange={handleChange}
                            />
                            {errors["price"] && (
                              <p className="text-danger">{errors["price"]}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              What is in the apartment?
                            </label>
                            <div className="form-check mb-3">
                              {featureConfig.map((feature) => (
                                <div key={feature.id} className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={feature.id}
                                    checked={apartmentData.features[feature.id]}
                                    onChange={() =>
                                      handleFeatureChange(
                                        feature.id as keyof typeof apartmentData.features
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={feature.id}
                                  >
                                    {feature.name}
                                  </label>
                                </div>
                              ))}
                            </div>
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
                              <p className="text-danger">
                                {errors["description"]}
                              </p>
                            )}
                            <div className="assistive-text">
                              {apartmentData.description
                                ? `${apartmentData.description.length}/800`
                                : "0/800"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 d-flex justify-content-between">
                        <button
                          type="button"
                          className="button-71"
                          onClick={handleNextStep}
                        >
                          Continue to Contact Details
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary ms-auto"
                          onClick={handlePrevStep}
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Contact name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={userData?.name || ""}
                          readOnly
                          style={{ color: "gray" }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          value={userData?.email || ""}
                          readOnly
                          style={{ color: "gray" }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone Number:
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            phoneError ? "is-invalid" : ""
                          }`}
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={apartmentData.phone || ""}
                          onChange={handlePhoneChange}
                        />
                        {phoneError && (
                          <p className="text-danger">{phoneError}</p>
                        )}
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        <button type="submit" className="button-71">
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handlePrevStep}
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddApartment;
