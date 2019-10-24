import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { toggleAttribute } from '../../../utils/dom';

const style = require('./country.scss');
const cx = classNames.bind(style);

const Country = ({ countries }) => {
  const [activeCountry, setActiveCountry] = useState('가나');

  useEffect(() => {
    console.log('activeCountry');
  }, [activeCountry]);

  return (
    <div className={cx('country')}>
      {
        countries && countries.map(continent => (
          <div className={cx('continent')} key={continent.continent}>
            <button
              type="button"
              className={cx('continent_name')}
              aria-selected={true}
              onClick={e => { toggleAttribute(e.currentTarget, 'aria-selected'); }}
            >{continent.continent}</button>
            <ul className={cx('country_set')} role="radiogroup">
              {
                continent.countries.map(item => (
                  <li className={cx('list')} role="presentation" key={item.id}>
                    <img className={cx('country_image')} src={item.imgUrl} alt={item.name}/>
                    <label htmlFor={item.id} className={cx('country_title')}>{item.name}</label>
                    <input
                      type="radio"
                      id={item.id} name="country"
                      className={cx('country_input')}
                      aria-checked={activeCountry === item.name}
                      onClick={() => { setActiveCountry(item.name); }}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  );
};

Country.propTypes = {
  countries: PropTypes.any,
};

export default hot(Country);
