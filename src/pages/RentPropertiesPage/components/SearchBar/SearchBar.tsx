import React, { useEffect, useMemo, useState } from 'react';
import './SearchBar.css';
import { apartmentTypeFieldValues, IApartment } from '@/models/apartment.model';
import { IControlledSelectArray } from '@/models';
import { AutocompleteWithMultiSelect } from '@@/autocompleteWithMultiSelect';
import { Box, Grid, Stack, TextField, Typography } from '@mui/material';
import { ISearchObject } from '../../types';

interface SearchBarProps {
  apartments: IApartment[];
  onSearch: (searchObject: ISearchObject) => void;
  onClear: () => void;
  searchObject?: ISearchObject;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  apartments,
  onSearch,
  onClear,
  searchObject,
}) => {
  const [citySearchQuery, setCitySearchQuery] = useState<
    IControlledSelectArray<string>
  >([]);
  const [typeSearchQuery, setTypeSearchQuery] = useState<
    IControlledSelectArray<string>
  >([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minRooms, setMinRooms] = useState<number | undefined>();
  const [maxRooms, setMaxRooms] = useState<number | undefined>();

  const cityOptions = useMemo((): IControlledSelectArray<string> => {
    const cities = [...new Set(apartments.map((apartment) => apartment.city))];
    return cities.map((city) => ({ display: city, value: city }));
  }, [apartments]);

  const handleSearchClick = () => {
    onSearch({
      cities: citySearchQuery,
      types: typeSearchQuery,
      minPrice,
      maxPrice,
      minRooms,
      maxRooms,
    });

    if (minPrice && maxPrice && minPrice > maxPrice) {
      alert('Minimum price cannot be greater than maximum price');
    }
    if (minRooms && maxRooms && minRooms > maxRooms) {
      alert('Minimum rooms cannot be greater than maximum rooms');
    }
  };

  useEffect(() => {
    setCitySearchQuery(searchObject?.cities ?? []);
    setTypeSearchQuery(searchObject?.types ?? []);
    setMinPrice(searchObject?.minPrice);
    setMaxPrice(searchObject?.maxPrice);
    setMinRooms(searchObject?.minRooms);
    setMaxRooms(searchObject?.maxRooms);
  }, [searchObject]);

  const handleClearClick = () => {
    onClear();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-end"
      spacing={4}
      sx={{ direction: 'rtl' }}
    >
      <Grid item sx={{ width: '300px', direction: 'ltr' }}>
        <AutocompleteWithMultiSelect
          label="בחר ערים לחיפוש"
          options={cityOptions}
          setValue={setCitySearchQuery}
          value={citySearchQuery}
        />
      </Grid>
      <Grid item sx={{ width: '350px', direction: 'ltr' }}>
        <AutocompleteWithMultiSelect
          label="בחר סוגי נכסים לחיפוש"
          options={apartmentTypeFieldValues}
          setValue={setTypeSearchQuery}
          value={typeSearchQuery}
        />
      </Grid>
      <Grid item>
        <Stack>
          <Typography>מחיר:</Typography>
          <Box>
            <TextField
              sx={{ width: '135px', marginLeft: '10px' }}
              label="ממחיר"
              value={minPrice ?? ''}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 1000000000 } }}
              onChange={(e) => setMinPrice(+e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
            />

            <TextField
              sx={{ width: '135px' }}
              label="עד מחיר"
              value={maxPrice ?? ''}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 1000000000 } }}
              onChange={(e) => setMaxPrice(+e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
            />
          </Box>
        </Stack>
      </Grid>
      <Grid item>
        {' '}
        <Stack>
          <Typography>חדרים:</Typography>
          <Box>
            <TextField
              sx={{ width: '80px', marginLeft: '10px', direction: 'rtl' }}
              label="מכמות"
              value={minRooms ?? ''}
              type="number"
              InputProps={{ inputProps: { min: 1, max: 99 } }}
              onChange={(e) => setMinRooms(+e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
            />
            <TextField
              sx={{ width: '80px' }}
              label="עד כמות"
              value={maxRooms ?? ''}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 99 } }}
              onChange={(e) => setMaxRooms(+e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
            />
          </Box>
        </Stack>
      </Grid>
      <Grid item>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearchClick}
        >
          חפש
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClearClick}
        >
          נקה חיפוש
        </button>
      </Grid>
    </Grid>
  );
};
