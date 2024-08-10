import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import { IApartment } from '@/models/apartment.model';

interface SearchBarProps {
  apartments: IApartment[];
  onSearch: (
    city: string,
    types: string[],
    minPrice: string,
    maxPrice: string,
    minRooms: string,
    maxRooms: string,
  ) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  apartments,
  onSearch,
  onClear,
}) => {
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [typeSearchQuery, setTypeSearchQuery] = useState<string[]>([]);
  const [showApartmentTypes, setShowApartmentTypes] = useState<boolean>(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] =
    useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRooms, setMinRooms] = useState<string>('');
  const [maxRooms, setMaxRooms] = useState<string>('');

  useEffect(() => {
    const cities = [...new Set(apartments.map((apartment) => apartment.city))];
    setCitySuggestions(cities);
  }, [apartments]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isCitySearchBox = target.closest('.city-search-container');
      const isTypeContainer = target.closest('.type-container');

      if (!isCitySearchBox) {
        setShowCitySuggestions(false);
      }

      if (!isTypeContainer) {
        setShowApartmentTypes(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleMinRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinRooms(e.target.value);
  };

  const handleMaxRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxRooms(e.target.value);
  };

  const handleCitySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCitySearchQuery(value);
  };

  const handleTypeSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setTypeSearchQuery((prevState) => [...prevState, value]);
    } else {
      setTypeSearchQuery((prevState) =>
        prevState.filter((type) => type !== value),
      );
    }
    setShowCitySuggestions(false); // Close the city suggestions dropdown
    setShowApartmentTypes(true); // Open the apartment types dropdown
  };

  const toggleApartmentTypesDropdown = () => {
    setShowApartmentTypes((prevState) => !prevState);
  };

  const handleSearchClick = () => {
    onSearch(
      citySearchQuery,
      typeSearchQuery,
      minPrice,
      maxPrice,
      minRooms,
      maxRooms,
    );
    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      alert('Minimum price cannot be greater than maximum price');
    }
    if (parseFloat(minRooms) > parseFloat(maxRooms)) {
      alert('Minimum rooms cannot be greater than maximum rooms');
    }
    setShowCitySuggestions(false); // Close the city suggestions dropdown
    setShowApartmentTypes(false); // Close the apartment types dropdown
  };

  const handleClearClick = () => {
    setCitySearchQuery('');
    setTypeSearchQuery([]);
    setShowApartmentTypes(false);
    setShowCitySuggestions(false);
    setMinPrice('');
    setMaxPrice('');
    setMinRooms('');
    setMaxRooms('');
    onClear();
  };

  const handleCitySuggestionClick = (city: string) => {
    setCitySearchQuery(city);
    setShowCitySuggestions(false);
  };

  const handleCitySearchBoxClick = () => {
    setShowCitySuggestions(true);
    setShowApartmentTypes(false); // Close the apartment types dropdown
  };

  const handleSelectAllClick = () => {
    // Select all apartment types
    setTypeSearchQuery([
      'Apartment',
      'Garden apartment',
      'Private/Cottage',
      'Townhouse',
      'Duplex',
      'Roof/Penthouse',
      'Unit',
      'Vacation apartment',
      'Other',
    ]);
  };

  const handleClearAllClick = () => {
    // Clear all selected apartment types
    setTypeSearchQuery([]);
  };

  const handleSubmitClick = () => {
    setShowApartmentTypes(false); // Close the dropdown
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="city-search-container">
        <label htmlFor="city-search">Search by City:</label>
        <input
          type="text"
          placeholder="city..."
          value={citySearchQuery}
          onClick={handleCitySearchBoxClick}
          onChange={handleCitySearchChange}
        />
        {showCitySuggestions && (
          <div className="city-suggestions">
            {citySuggestions.map((city) => (
              <div key={city} onClick={() => handleCitySuggestionClick(city)}>
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="type-container">
        <label htmlFor="type-containe">Type:</label>
        <input
          type="text"
          placeholder={
            typeSearchQuery.length > 1
              ? `${typeSearchQuery.length}
                        selected`
              : typeSearchQuery.length === 1
                ? typeSearchQuery[0]
                : 'select apartment types...'
          }
          value={
            typeSearchQuery.length > 1
              ? `${typeSearchQuery.length}
                        selected`
              : typeSearchQuery.length === 1
                ? typeSearchQuery[0]
                : ''
          }
          readOnly
          onClick={toggleApartmentTypesDropdown}
        />
        {showApartmentTypes && (
          <div className="type-dropdown">
            {[
              'Apartment',
              'Garden apartment',
              'Private/Cottage',
              'Townhouse',
              'Duplex',
              'Roof/Penthouse',
              'Unit',
              'Vacation apartment',
              'Other',
            ].map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={typeSearchQuery.includes(type)}
                  onChange={handleTypeSearchChange}
                />
                {type}
              </label>
            ))}

            <button
              type="button"
              className="btn btn-primary button-space"
              onClick={handleSelectAllClick}
            >
              Select All
            </button>
            <button
              type="button"
              className="btn btn-primary button-space"
              onClick={handleClearAllClick}
            >
              Clear All
            </button>
            <button
              type="button"
              className="btn btn-primary button-space"
              onClick={handleSubmitClick}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      <div className="price-container">
        <label htmlFor="price-container">Price:</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="from..."
            value={minPrice}
            onChange={handleMinPriceChange}
            className="min-price-input"
          />
          <input
            type="number"
            placeholder="to..."
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="max-price-input"
          />
        </div>
      </div>

      <div className="rooms-container">
        <label htmlFor="min-rooms">Rooms:</label>
        <div className="room-inputs">
          <input
            type="number"
            placeholder="from..."
            value={minRooms}
            onChange={handleMinRoomsChange}
            className="min-room-input"
          />
          <input
            type="number"
            placeholder="to..."
            value={maxRooms}
            onChange={handleMaxRoomsChange}
            className="max-room-input"
          />
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSearchClick}
      >
        Search
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClearClick}
      >
        Clear Results
      </button>
    </div>
  );
};

export default SearchBar;
