import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { Country } from '@components/index.ts';
import { toggleAttribute } from '@utils/dom';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  continents: any;
  activeCountry: any;
  setActiveCountry: any;
}

const Continent: React.FC<IOwnProps> = ({ continents, activeCountry, setActiveCountry }) => {
  const onClickContinent = (e: any) => {
    toggleAttribute(e.currentTarget, 'aria-selected');
  };

  return (
    <div className={cx('continent_area')}>
      {
        continents && continents.map((continent: any) => (
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
