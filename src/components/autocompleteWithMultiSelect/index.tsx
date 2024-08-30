import { IControlledSelectArray, IControlledSelectArrayItem } from '@/models';
import {
  Autocomplete,
  Checkbox,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface IProps {
  label: string;
  options: IControlledSelectArray<string>;
  value: IControlledSelectArray<string>;
  setValue: (newValue: IControlledSelectArray<string>) => void;
  tagsLimit?: number;
  size?: 'small' | 'medium';
  styleSX?: SxProps<Theme>;
}

export const AutocompleteWithMultiSelect: React.FC<IProps> = ({
  label,
  options,
  value,
  setValue,
  tagsLimit = 2,
  size = 'small',
  styleSX,
}) => {
  return (
    <Autocomplete
      multiple
      fullWidth
      options={options}
      value={value}
      size={size}
      limitTags={tagsLimit}
      disableCloseOnSelect
      filterSelectedOptions
      noOptionsText="לא קיימות אפציות מתאימות"
      getOptionLabel={(option) => option.display}
      isOptionEqualToValue={(
        option: IControlledSelectArrayItem<string>,
        checkedValue: IControlledSelectArrayItem<string>,
      ) => checkedValue.value === option.value}
      onChange={(event: any, newValues: IControlledSelectArray<string>) => {
        setValue(newValues);
      }}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.display}
          </li>
        );
      }}
      sx={styleSX}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
