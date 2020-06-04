import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { EXPENSE_DATE_FILTER } from '@constants/type';
import { ICurrency } from '../../types/api';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  id: string
  type: string
  category: string
  currency: ICurrency
  amount: number
  day: string
  title: string
  time: string
  onClickExpenseItem: (id: string) => void
}


const ExpenseItem: React.FC<IOwnProps> = ({
  id,
  type,
  category,
  currency,
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
    <li className={cx('list', type.toLowerCase())} key={id}>
      <button className={cx('btn_expense')} onClick={handleClick}>
        <div className={cx('wrapper')}>
          <div className={cx('inner', 'icon', category)}><span className={cx('blind')}>{category}</span></div>
          <div className={cx('inner', 'detail_info')}>
            <div className={cx('info_inner')}>
              <span className={cx('detail_expense')}>{currency.en} {amount}</span>
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

export default hot(ExpenseItem);
