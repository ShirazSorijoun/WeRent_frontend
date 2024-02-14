import React, { useState } from 'react';
import './SearchBar.css';
import apartmentService from '../../services/apartments-service';

interface SearchBarProps {
    onSearch: (city: string, types: string[]) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
    const [citySearchQuery, setCitySearchQuery] = useState<string>('');
    const [typeSearchQuery, setTypeSearchQuery] = useState<string[]>([]);
    const [showApartmentTypes, setShowApartmentTypes] = useState<boolean>(false);

    const handleCitySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCitySearchQuery(e.target.value);
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
                onChange={handleCitySearchChange}
            />
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
            <button onClick={handleClearClick}>Clear Results</button>
        </div>
    );
};

export default SearchBar;
