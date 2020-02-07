import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  countries: any;
  activeCountry: any;
  setActiveCountry: any;
}

const Country: React.FC<IOwnProps> = ({ countries, activeCountry, setActiveCountry }) => (
  <ul className="country" role="radiogroup">
    {
      countries && countries.map((item: any) => (
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

export default hot(Country);
