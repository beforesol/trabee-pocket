import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { EXPENSE_TYPE } from '@constants/type';

const style = require('./spendingCategory.scss');
const cx = classNames.bind(style);

const SpendingCategory = ({ }) => (
  <div className={cx('spending_category')}>
    {EXPENSE_TYPE.map(item => (
      <button key={item.title} className={cx('category', item.type)} aria-selected="true">
        <p className={cx('text')}>{item.title}</p>
      </button>
    ))}
  </div>
);

export default hot(SpendingCategory);
