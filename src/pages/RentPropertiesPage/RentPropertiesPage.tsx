import { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IApartment } from '@/models/apartment.model';
import './RentPropertiesPage.css';
import { api } from '@/api';
import { SearchBar, ApartmentCard } from './components';
import { ISearchObject } from './types';

export const RentPropertiesPage = () => {
  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [searchObject, setSearchObject] = useState<ISearchObject | undefined>();

  useEffect(() => {
    const insertAllApartments = async () => {
      try {
        const res = await api.apartment.getAllApartmentsWithoutLease();
        setApartments(res);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    insertAllApartments();
  }, []);

  const filteredApartments: IApartment[] = useMemo(
    () =>
      searchObject
        ? apartments.filter(
            (apartment) =>
              (!searchObject.cities.length ||
                searchObject.cities.some(
                  (city) => city.value === apartment.city,
                )) &&
              (!searchObject.types.length ||
                searchObject.types.some(
                  (type) => type.value === apartment.type,
                )) &&
              (!searchObject.minPrice ||
                apartment.price >= searchObject.minPrice) &&
              (!searchObject.maxPrice ||
                apartment.price <= searchObject.maxPrice) &&
              (!searchObject.minRooms ||
                apartment.rooms >= searchObject.minRooms) &&
              (!searchObject.maxRooms ||
                apartment.rooms <= searchObject.maxRooms),
          )
        : apartments,
    [apartments, searchObject],
  );

  const handleSearch = (searchOptions: ISearchObject) => {
    setSearchObject(searchOptions);
  };

  const handleClearSearch = () => {
    setSearchObject(undefined);
  };

  return (
    <Container fluid className="rent-properties-container">
      <Row style={{ margin: '20px 0px 30px 0px' }}>
        <Col style={{ justifyContent: 'center' }}>
          <SearchBar
            searchObject={searchObject}
            apartments={apartments}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        </Col>
      </Row>

      {filteredApartments.length ? (
        <Row>
          {filteredApartments.map((apartment) => (
            <Col key={apartment._id}>
              <ApartmentCard apartment={apartment} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <div className="no-apartments-message">
              {' '}
              לא נמצאו דירות התואמות את החיפוש
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};
