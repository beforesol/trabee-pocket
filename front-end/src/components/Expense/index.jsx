import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./layer.scss');
const cx = classNames.bind(style);

const Expense = () => (
  <div className={cx('expense')}>
    Expense
  </div>
);

Expense.propTypes = {

};

export default hot(Expense);
