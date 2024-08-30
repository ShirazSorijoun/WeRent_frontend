import { useEffect, useMemo, useState } from 'react';

import { IApartment } from '@/models/apartment.model';
import './RentPropertiesPage.css';
import { api } from '@/api';
import { SearchBar, ApartmentCard } from './components';
import { ISearchObject } from './types';
import { Container, Grid, Stack } from '@mui/material';

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
    <Container fixed maxWidth="xl">
      <Stack spacing={4}>
        <SearchBar
          searchObject={searchObject}
          apartments={apartments}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
        <Grid container spacing={2} justifyContent="center">
          {filteredApartments.length ? (
            <>
              {filteredApartments.map((apartment) => (
                <Grid item key={apartment._id}>
                  <ApartmentCard apartment={apartment} />
                </Grid>
              ))}
            </>
          ) : (
            <Grid item>
              <div className="no-apartments-message">
                {' '}
                לא נמצאו דירות התואמות את החיפוש
              </div>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Container>
  );
};
