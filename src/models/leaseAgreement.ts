import { IApartment } from './apartment.model';

export interface ILeaseAgreementForm {
  _id?: string;
  date: Date;
  startDate: Date;
  endDate: Date;
  rentalPricePerMonth: number;
  dayOfTheMonthForPayment: number;
  paymentMethod: string;
  nameOfBank?: string;
  bankAccountNumber?: string;
  bankBranch?: string;

  optionPeriod: boolean;
  optionPeriodLength?: number;
  maxPercentageIncrease?: number;
  maxNumOfMonthsIncludeOptionPeriod?: number;
  numOfDaysForRepair: number;
  subtenant: boolean;
  numOfDaysPaymentDelay: number;

  promissoryNote: boolean;
  promissoryNoteAmount?: number;
  letterOfGuarantee: boolean;
  guarantee?: string;
  guaranteeAmount?: number;
  animal: boolean;
}

export interface ILeaseAgreement extends ILeaseAgreementForm {
  apartment: Pick<IApartment, 'city' | '_id' | 'address' | 'owner'>;
  tenantId: string;
  tenantSignature?: string;
  ownerSignature?: string;
}
