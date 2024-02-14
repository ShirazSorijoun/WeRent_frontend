import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import apartmentService from '../../services/apartments-service';
import { ApartmentProps } from '../../types/types';

interface SearchBarProps {
    apartments: ApartmentProps[];
    onSearch: (city: string, types: string[]) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({apartments, onSearch, onClear }) => {
    const [citySearchQuery, setCitySearchQuery] = useState<string>('');
    const [typeSearchQuery, setTypeSearchQuery] = useState<string[]>([]);
    const [showApartmentTypes, setShowApartmentTypes] = useState<boolean>(false);
    const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState<boolean>(false);


    useEffect(() => {
        const cities = [...new Set(apartments.map(apartment => apartment.city))];
        setCitySuggestions(cities);
    }, [apartments]);


    const handleCitySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCitySearchQuery(value);
    };

    const handleTypeSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setTypeSearchQuery(prevState => [...prevState, value]);
        } else {
            setTypeSearchQuery(prevState => prevState.filter(type => type !== value));
        }
        //setShowApartmentTypes(false);
    };

    const toggleApartmentTypesDropdown = () => {
        setShowApartmentTypes(prevState => !prevState);
    };

    const handleSearchClick = () => {
        onSearch(citySearchQuery, typeSearchQuery);
    };

    const handleClearClick = () => {
        setCitySearchQuery('');
        setTypeSearchQuery([]);
        setShowApartmentTypes(false);
        onClear();
        apartmentService.getAllApartments();
    };


    const handleCitySuggestionClick = (city: string) => {
        setCitySearchQuery(city);
    };


    const handleCitySearchBoxClick = () => {
        setShowCitySuggestions(true);
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

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by city..."
                value={citySearchQuery}
                onClick={handleCitySearchBoxClick}
                onChange={handleCitySearchChange}
            />
            {showCitySuggestions && (
                <div className="city-suggestions">
                    {citySuggestions.map(city => (
                        <div key={city} onClick={() => handleCitySuggestionClick(city)}>{city}</div>
                    ))}
                </div>
            )}
            <div className="type-container">
                <input
                    type="text"
                    placeholder="Select apartment types..."
                    value={typeSearchQuery.join(', ')}
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
                        ].map(type => (
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
                        <button onClick={handleSelectAllClick}>Select All</button>
                        <button onClick={handleClearAllClick}>Clear All</button>
                        <button onClick={handleSubmitClick}>Submit</button>
                    </div>
                )}
            </div>
            <button onClick={handleSearchClick}>Search</button>
            <div className="search-container">
                <button onClick={handleClearClick}>Clear Results</button>
            </div>
        </div>
    );
};

export default SearchBar;
