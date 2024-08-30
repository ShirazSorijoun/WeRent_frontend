/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import {
  Autocomplete,
  AutocompleteGetTagProps,
  Chip,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { IControlledBasicFieldTypeProps } from '../utils';

const renderTags = (values: any[], getTagProps: AutocompleteGetTagProps) =>
  values.map((option, index) => (
    <Chip
      variant="outlined"
      title={option}
      label={option}
      style={{
        maxWidth: 100,
        display: 'flex',
        flexDirection: 'row-reverse',
        backgroundColor: '#ebebeb',
        border: 'none',
        margin: '0px 5px',
      }}
      {...getTagProps({ index })}
      sx={{
        maxWidth: 100,
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    />
  ));

const onBlur = (textToInsert: string, values: any[], setValue: Function) => {
  if (textToInsert && !values?.includes(textToInsert)) {
    const newValuesArray = values ? [...values, textToInsert] : [textToInsert];
    setValue(newValuesArray);
  }
};

export const ControlledTextArray: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
}) => {
  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({
        field: { value, onChange, ref, disabled },
        fieldState: { error },
      }) => (
        <Autocomplete
          multiple
          disabled={disabled}
          options={[]}
          value={value ?? []}
          freeSolo
          sx={sxStyle}
          onBlur={(e: any) => onBlur(e.target.value, value, onChange)}
          clearOnBlur
          ChipProps={{
            style: {
              maxWidth: 100,
              display: 'flex',
              flexDirection: 'row-reverse',
            },
          }}
          renderTags={renderTags}
          onChange={(event, values) => onChange(values)}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              label={isWithLabel ? fieldData.label : ''}
              placeholder={`enter ${fieldData.label}`}
              error={!!error}
              variant="outlined"
              helperText={error?.message ?? ''}
            />
          )}
        />
      )}
    />
  );
};
