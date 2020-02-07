import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { EXPENSE_CATEGORY } from '@constants/type';

const style = require('./index.scss');
const cx = classNames.bind(style);

const categoryList = Object.values(EXPENSE_CATEGORY);

interface IOwnProps {
  activeCategory: any
  onSetActiveCategory: any
}

const SpendingCategory: React.FC<IOwnProps> = ({
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

export default hot(SpendingCategory);
