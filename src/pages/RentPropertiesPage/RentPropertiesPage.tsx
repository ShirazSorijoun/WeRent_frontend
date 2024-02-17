import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApartmentCard from '../../components/ApartmentCard/ApartmentCard';
import { ApartmentProps } from '../../types/types';
import SearchBar from '../../components/SearchBar/SearchBar';
import './RentPropertiesPage.css';
import apartmentService from '../../services/apartments-service';


const RentPropertiesPage = () => {
    const [apartments, setApartments] = useState<ApartmentProps[]>([]);
    const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(false);
    const [filteredApartments, setFilteredApartments] = useState<ApartmentProps[]>([]);
    const [noApartmentsFound, setNoApartmentsFound] = useState<boolean>(false);


    useEffect(() => {
        const { req, abort } = apartmentService.getAllApartments();

        req.then(response => {
            setApartments(response.data);
        }).catch(error => {
            if (error && error.code === 'ERR_CANCELED')
                console.log('Fetch request was cancelled');
            else
                console.error('Error fetching apartments:', error);
        });

        return () => abort();
    }, []);


    const handleSearch = (city: string, types: string[], minPrice: string, maxPrice: string) => {
        console.log('Search performed types:',types);
        console.log('Search performed city:',city);
        console.log('Search performed apartments:',apartments);

        const filtered = apartments.filter(apartment =>
            (city === '' || apartment.city.toLowerCase() === city.toLowerCase()) &&
            ((types.length === 0 || types.includes(apartment.type))) &&
            (minPrice === '' || (apartment.price) >= parseInt(minPrice)) &&
            (maxPrice === '' || (apartment.price) <= parseInt(maxPrice))

        );
        setIsSearchPerformed(true);
        setFilteredApartments(filtered);
        setNoApartmentsFound(filtered.length === 0); // Check if there are no apartments found
        console.log('Filtered apartments:', filtered);
    };


    const handleClearSearch = () => {
        setIsSearchPerformed(false);
        setFilteredApartments([]);
        setNoApartmentsFound(false);
    };


    return (
        <Container fluid className="rent-properties-container">
            <Row>
                <Col>
                    <SearchBar
                    apartments={apartments}
                    onSearch={handleSearch}
                    onClear={handleClearSearch} />
                </Col>
            </Row>

            {noApartmentsFound ? (
                <Row>
                    <Col>
                        <div className="no-apartments-message"> No apartments found matching the search criteria.</div>
                    </Col>
                </Row>
            ) : (

                <Row>
                    {(isSearchPerformed ? filteredApartments : apartments).map(apartment => (
                        <Col key={apartment._id} className="apartment-column">
                            <ApartmentCard apartment={apartment} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default RentPropertiesPage;
