import ICountry from './country';

export default interface IContinent {
  continent: string;
  countries: ICountry[];
}