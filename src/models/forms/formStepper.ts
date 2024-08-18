import { SvgIconComponent } from '@mui/icons-material';

export interface IFormStepperItem {
  label: string;
  stepIdentifier: string;
  optionalText?: string;
  icon?: SvgIconComponent;
}

export type IFormSteps = IFormStepperItem[];
