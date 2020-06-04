import ICountry from './country';
import ICurrency from './currency';

export default interface IBudget {
  id: string;
  tripId: string;
  type: string;
  title: string;
  amount: number;
  amountType: string;
  currency: ICurrency;
  date: string;
  day: string;
  category: string;
}