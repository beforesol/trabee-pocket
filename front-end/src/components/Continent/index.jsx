import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { Country } from '@components';
import { toggleAttribute } from '@utils/dom';

const style = require('./continent.scss');
const cx = classNames.bind(style);

const Continent = ({ continents, activeCountry, setActiveCountry }) => {
  const _onClick = e => {
    toggleAttribute(e.currentTarget, 'aria-selected');
  };

  return (
    <div className={cx('continent_area')}>
      {
        continents && continents.map(continent => (
          <div className={cx('continent')} key={continent.continent}>
            <button
              type="button"
              className={cx('continent_name')}
              aria-selected={true}
              onClick={e => _onClick(e)}
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

Continent.propTypes = {
  continents: PropTypes.any,
  activeCountry: PropTypes.string,
  setActiveCountry: PropTypes.func
};

export default hot(Continent);
