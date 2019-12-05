import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./country.scss');
const cx = classNames.bind(style);

const Country = ({ countries, activeCountry, setActiveCountry }) => (
  <ul className="country" role="radiogroup">
    {
      countries && countries.map(item => (
        <li className={cx('list')} role="presentation" key={item.id}>
          <img className={cx('country_image')} src={item.imgUrl} alt={item.name} />
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
);

Country.propTypes = {
  countries: PropTypes.any,
  activeCountry: PropTypes.string,
  setActiveCountry: PropTypes.func
};

export default hot(Country);
