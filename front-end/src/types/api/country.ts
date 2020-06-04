import ICurrency from './currency';

export default interface ICountry {
  country: string;
  currency: ICurrency;
  en: string;
  id: string;
  imgUrl: string;
  name: string
}