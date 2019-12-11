import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ExpenseInfo from '../ExpenseInfo';
import SpendingCategory from '../SpendingCategory';
import ExpenseInput from '../ExpenseInput';

const style = require('./spendingLayer.scss');
const cx = classNames.bind(style);

const SpendingLayer = ({ }) => {
  const [displayValue, setDisplayValue] = useState('');

  return (
    <div className={cx('spending_layer')}>
      <ExpenseInfo displayValue={displayValue} />
      <SpendingCategory />
      <ExpenseInput onSetDisplayValue={setDisplayValue} />
    </div>
  );
};

export default hot(SpendingLayer);
