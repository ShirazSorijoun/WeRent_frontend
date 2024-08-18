export interface ILeaseAgreementForm {
  _id?: string;
  date: Date;
  apartmentId: string;
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
