export interface addressAPIData {
  Y: number;
  X: number;
  ResultLable: string;
}

export interface addressCheckRes {
  data: {
    ADDRESS: addressAPIData[];
  };
  Error: number;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}
