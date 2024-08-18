/* eslint-disable @typescript-eslint/ban-types */
import { imageURL } from '@/api';
import { Box, CardMedia, TextField } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { style } from './style';
import { IControlledBasicFieldTypeProps } from '../utils';

export const ControlledImage: FC<IControlledBasicFieldTypeProps> = ({
  control,
  fieldData,
  sxStyle,
  isWithLabel = false,
}) => {
  const [selectedImageToDisplay, setSelectedImageToDisplay] =
    useState<string>();

  const handleImageChange = useCallback(
    (setFormValue: Function, file?: File) => {
      setFormValue(file);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImageToDisplay(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedImageToDisplay('');
      }
    },
    [],
  );

  return (
    <Box sx={style.boxContainer}>
      <Controller
        name={fieldData.fieldName}
        control={control}
        render={({
          field: { name, onChange, disabled, value },
          fieldState: { error },
        }) => (
          <>
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              type="file"
              sx={sxStyle}
              label={isWithLabel ? fieldData.label : ''}
              name={name}
              disabled={disabled}
              InputProps={{ componentsProps: { input: { accept: 'image/*' } } }}
              onChange={(event) => {
                const file = (event.target as HTMLInputElement).files?.[0];
                handleImageChange(onChange, file);
              }}
              error={!!error}
              helperText={error?.message}
            />
            {(selectedImageToDisplay || value) && (
              <CardMedia
                component="img"
                alt="Preview"
                src={
                  selectedImageToDisplay
                    ? selectedImageToDisplay
                    : `${imageURL}/${value}`
                }
                sx={style.img}
              />
            )}
          </>
        )}
      />
    </Box>
  );
};
