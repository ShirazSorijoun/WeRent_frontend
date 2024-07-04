import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApartmentCard from '../../components/ApartmentCard/ApartmentCard';
import { ApartmentProps } from '../../types/types';
import SearchBar from '../../components/SearchBar/SearchBar';
import './RentPropertiesPage.css';
import { api } from '@/api';

export const RentPropertiesPage = () => {
  const [apartments, setApartments] = useState<ApartmentProps[]>([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(false);
  const [filteredApartments, setFilteredApartments] = useState<
    ApartmentProps[]
  >([]);
  const [noApartmentsFound, setNoApartmentsFound] = useState<boolean>(false);

  useEffect(() => {
    const insertAllApartments = async () => {
      try {
        const res = await api.apartment.getAllApartments();
        setApartments(res);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    insertAllApartments();
  }, []);

  const handleSearch = (
    city: string,
    types: string[],
    minPrice: string,
    maxPrice: string,
    minRooms: string,
    maxRooms: string,
  ) => {
    console.log('Search performed types:', types);
    console.log('Search performed city:', city);
    console.log('Search performed apartments:', apartments);

    const filtered = apartments.filter(
      (apartment) =>
        (city === '' || apartment.city.toLowerCase() === city.toLowerCase()) &&
        (types.length === 0 || types.includes(apartment.type)) &&
        (minPrice === '' || apartment.price >= parseInt(minPrice)) &&
        (maxPrice === '' || apartment.price <= parseInt(maxPrice)) &&
        (minRooms === '' || apartment.rooms >= parseInt(minRooms)) &&
        (maxRooms === '' || apartment.rooms <= parseInt(maxRooms)),
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
            onClear={handleClearSearch}
          />
        </Col>
      </Row>

      {noApartmentsFound ? (
        <Row>
          <Col>
            <div className="no-apartments-message">
              {' '}
              No apartments found matching the search criteria.
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          {(isSearchPerformed ? filteredApartments : apartments).map(
            (apartment) => (
              <Col key={apartment._id} className="apartment-column">
                <ApartmentCard apartment={apartment} />
              </Col>
            ),
          )}
        </Row>
      )}
    </Container>
  );
};
