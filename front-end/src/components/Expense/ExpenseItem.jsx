import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { EXPENSE_DATE_FILTER } from '@constants/type';

const style = require('./expense.scss');
const cx = classNames.bind(style);


const ExpenseItem = ({
  id,
  category,
  amount,
  day,
  title,
  time,
  onClickExpenseItem
}) => {
  const handleClick = () => {
    onClickExpenseItem(id);
  };

  return (
    <li className={cx('list')} key={id}>
      <button className={cx('btn_expense')} onClick={handleClick}>
        <div className={cx('wrapper')}>
          <div className={cx('inner', 'icon', category)}><span className={cx('blind')}>{category}</span></div>
          <div className={cx('inner', 'detail_info')}>
            <div className={cx('info_inner')}>
              <span className={cx('detail_expense')}>₩{amount}</span>
              {day === EXPENSE_DATE_FILTER.READY && (
                <span className={cx('ready')}>준비</span>
              )}
            </div>
            <p className={cx('info_text')}>{title}</p>
          </div>
          <div className={cx('inner', 'time')}>{time}</div>
        </div>
      </button>
    </li>
  );
};

ExpenseItem.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  amount: PropTypes.string,
  day: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  onClickExpenseItem: PropTypes.func
};

export default hot(ExpenseItem);
