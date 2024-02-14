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


    const handleSearch = (city: string, types: string[]) => {
        setIsSearchPerformed(true);
        const filtered = apartments.filter(apartment =>
            apartment.city.toLowerCase() === city.toLowerCase() &&
            (types.length === 0 || types.includes(apartment.type.toLowerCase()))
        );
        setFilteredApartments(filtered);
    };


    const handleClearSearch = () => {
        setIsSearchPerformed(false);
        setFilteredApartments([]);
    };


    return (
        <Container fluid className="rent-properties-container">
            <Row>
                <Col>
                    <SearchBar
                    onSearch={handleSearch}
                    onClear={handleClearSearch} />
                </Col>
            </Row>

            <Row>
                {(isSearchPerformed ? filteredApartments : apartments).map(apartment => (
                    <Col key={apartment._id} className="apartment-column">
                        <ApartmentCard apartment={apartment} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RentPropertiesPage;
