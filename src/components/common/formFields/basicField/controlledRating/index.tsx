import { Controller } from 'react-hook-form';
import { IControlledBasicFieldTypeProps } from '../utils';
import { IconContainerProps, Rating, styled } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: React.ReactElement;
} = {
  1: <SentimentVeryDissatisfiedIcon color="error" />,
  2: <SentimentDissatisfiedIcon color="error" />,
  3: <SentimentSatisfiedIcon color="warning" />,
  4: <SentimentSatisfiedAltIcon color="success" />,
  5: <SentimentVerySatisfiedIcon color="success" />,
};

const IconContainer = (props: IconContainerProps) => {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]}</span>;
};

export const ControlledRating: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
}) => {
  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({ field: { value, onChange } }) => (
        <StyledRating
          name="highlight-selected-only"
          value={value ?? null}
          sx={sxStyle}
          style={{ direction: 'rtl' }}
          IconContainerComponent={IconContainer}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          highlightSelectedOnly
        />
      )}
    />
  );
};
