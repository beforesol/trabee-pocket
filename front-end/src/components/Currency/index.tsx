import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./currency.scss');
const cx = classNames.bind(style);

const Currency = () => (
  <div className={cx('currency')}>
    Currency
  </div>
);

export default hot(Currency);
