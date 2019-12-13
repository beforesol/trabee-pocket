import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { EXPENSE_TYPE } from '@constants/type';

const style = require('./spendingCategory.scss');
const cx = classNames.bind(style);

const categoryList = Object.values(EXPENSE_TYPE);
const SpendingCategory = ({
  activeCategory,
  onSetActiveCategory
}) => (
  <div className={cx('spending_category')}>
    {categoryList.map(item => (
      <button
        key={item.type}
        className={cx('category', item.type)}
        aria-selected={activeCategory === item.type}
        onClick={() => onSetActiveCategory(item.type)}>
        <p className={cx('text')}>{item.title}</p>
      </button>
    ))}
  </div>
);

SpendingCategory.propTypes = {
  activeCategory: PropTypes.string,
  onSetActiveCategory: PropTypes.func
};
export default hot(SpendingCategory);
