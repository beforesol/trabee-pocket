import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

import { Country } from '@components/index.ts';
import { toggleAttribute } from '@utils/dom';
import { IContinent } from '../../types/api';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  continents: IContinent[];
  activeCountry: string;
  setActiveCountry: (country: string) => void;
}

const Continent: React.FC<IOwnProps> = ({ continents, activeCountry, setActiveCountry }) => {
  const onClickContinent = (e: any) => {
    toggleAttribute(e.currentTarget, 'aria-selected');
  };

  return (
    <div className={cx('continent_area')}>
      {continents && continents.map((continent: IContinent) => (
        <div className={cx('continent')} key={continent.continent}>
          <button
            type="button"
            className={cx('continent_name')}
            aria-selected={true}
            onClick={e => onClickContinent(e)}
          >{continent.continent}</button>
          <Country
            countries={continent.countries}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
          />
        </div>
      ))
      }
    </div>
  );
};

export default hot(Continent);
