import React, { useEffect, useState } from "react";
import { ApartmentProps } from "../../types/types";
import apartmentService, { CanceledError } from "../../services/apartments-service";

const Apartments: React.FC = () => {
  const [apartments, setApartments] = useState<ApartmentProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { req } = apartmentService.getAllApartments();
        const response = await req;
        console.log("Response data:", response.data);
        setApartments(response.data);
      } catch (error) {
        if (error instanceof CanceledError) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching apartments:", error);
        }
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  return (
    <div className="apartments-container">
      {apartments.map((apartment, index) => (
        <div key={index}>
          <h1>City: {apartment.city}</h1>
          <h2>Address: {apartment.address}</h2>
          <img src={apartment.apartment_image} alt="Apartment Image" />
        </div>
      ))}
    </div>
  );
};

export default Apartments;
