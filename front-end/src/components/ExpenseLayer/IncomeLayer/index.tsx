import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ExpenseInfo from '../ExpenseInfo';
import SpendingCategory from '../SpendingCategory';
import ExpenseInput from '../ExpenseInput';

const style = require('./index.scss');
const cx = classNames.bind(style);

const IncomeLayer = ({ }) => (
  <div className={cx('income_layer')}>
    <ExpenseInfo
      country={''}
      displayValue={'displayValue'}
      activeAmoutType={'activeAmoutType'}
      onSetActiveAmountType={() => { }}
    />
    <SpendingCategory
      activeCategory={'activeCategory'}
      onSetActiveCategory={'setActiveCategory'}
    />
    <ExpenseInput
      title={'title'}
      onSetDisplayValue={'setDisplayValue'}
      onSetIsOpenSpendingLayer={'onSetIsOpenSpendingLayer'}
      onSetTitle={'setTitle'}
      onSave={'save'}
    />
  </div>
);

export default hot(IncomeLayer);
