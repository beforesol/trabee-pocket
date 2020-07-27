import ICountry from './country';

export default interface ITrip {
  id: string;
  title: string;
  memo: string;
  country: ICountry;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
}