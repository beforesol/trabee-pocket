import ICountry from './country';

export default interface ITrip {
  id: string;
  title: string;
  memo: string;
  country: ICountry;
  imageUrl: ITripImage;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
}

export interface ITripImage {
  type: string;
  fileData: string;
}
