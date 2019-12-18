import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { DetailHeader } from '@components';
import {
  EXPENSE_TYPE,
  EXPENSE_DATE_FILTER,
  EXPENSE_CURRENCY_FILTER
} from '@constants/type';

import { BUDGET, budgetActions } from '@modules/budget';
import { getDatesBetween } from '@utils';

const style = require('./expense.scss');
const cx = classNames.bind(style);

const {
  axiosGetCurrentBudgetApi,
  resetCurrentBudgetInfo
} = budgetActions;

const Expense = ({ currentTripInfo }) => {
  const dispatch = useDispatch();

  const {
    isLoaded: isBudgetLoaded,
    isFailed,
    budgetList,
  } = useSelector(state => state[BUDGET]);

  const [activeDateFilter, setDateActiveFilter] = useState(EXPENSE_DATE_FILTER.ALL);
  const [activeCurrencyFilter, setCurrencyActiveFilter] = useState(EXPENSE_CURRENCY_FILTER.ALL);
  const [currentBudgetInfo, setCurrentBudgetInfo] = useState(budgetList);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => () => {
    dispatch(resetCurrentBudgetInfo());
  }, []);

  useEffect(() => {
    !isBudgetLoaded && dispatch(axiosGetCurrentBudgetApi({ id: currentTripInfo.id, type: EXPENSE_TYPE.SPENDING }));
  }, [isBudgetLoaded]);

  useEffect(() => {
    let budgetInfo = [];

    if ((activeDateFilter === EXPENSE_DATE_FILTER.ALL) && (activeCurrencyFilter === EXPENSE_CURRENCY_FILTER.ALL)) {
      budgetInfo = budgetList;
    } else if (activeDateFilter === EXPENSE_DATE_FILTER.ALL) {
      budgetInfo = budgetList.filter(item => item.currency.en === activeCurrencyFilter);
    } else if (activeCurrencyFilter === EXPENSE_CURRENCY_FILTER.ALL) {
      budgetInfo = budgetList.filter(item => item.day === activeDateFilter);
    } else {
      budgetInfo = budgetList.filter(item => (item.day === activeDateFilter) && (item.currency.en === activeCurrencyFilter));
    }

    setCurrentBudgetInfo(budgetInfo);
  }, [activeDateFilter, activeCurrencyFilter, budgetList]);

  useEffect(() => {
    currentBudgetInfo.length && setTotalAmount(currentBudgetInfo.reduce((a, b) => {
      const calculatedAmount = Number(b.amount) * b.currency.rate;

      return Number(a) + Number(calculatedAmount);
    }, 0));
  }, [currentBudgetInfo]);

  const dateRange = getDatesBetween(new Date(currentTripInfo.startDate), new Date(currentTripInfo.endDate)).map(item => item.toLocaleDateString());

  const currencyItems = (budgetList.length) ? budgetList.map(item => item.currency.en) : [];
  const uniqueCurrencies = currencyItems.filter((item, index) => currencyItems.indexOf(item) === index);

  return (!isBudgetLoaded ? (
    isFailed ? (<p>실패하였습니다</p>) : (<p>로딩중...</p>)
  ) : (
    <div className={cx('expense')}>
      <DetailHeader title={currentTripInfo.title} />
      <div className={cx('fixed_area')}>
        <div className={cx('date_tab')}>
          <div className={cx('date_area')}>
            <button
              type="button"
              onClick={() => setDateActiveFilter(EXPENSE_DATE_FILTER.ALL)}
              aria-selected={activeDateFilter === EXPENSE_DATE_FILTER.ALL}
              className={cx('btn_tab')}>
              <em className={cx('tab_title')}>A</em>
              <p className={cx('text')}>ALL</p>
            </button>
            <button
              type="button"
              onClick={() => setDateActiveFilter(EXPENSE_DATE_FILTER.READY)}
              aria-selected={activeDateFilter === EXPENSE_DATE_FILTER.READY}
              className={cx('btn_tab')}>
              <em className={cx('tab_title')}>P</em>
              <p className={cx('text')}>준비</p>
            </button>
          </div>
          <div className={cx('date_area')}>
            {dateRange.map(item => {
              const month = item.split('.')[1];
              const day = item.split('.')[2];

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDateActiveFilter(item)}
                  aria-selected={activeDateFilter === item}
                  className={cx('btn_tab')}>
                  <em className={cx('tab_title')}>{day}</em>
                  <p className={cx('text')}>{month}월</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className={cx('info_area')}>
          <div className={cx('expense_info')}>
            <div className={cx('btn_area')}>
              <button
                onClick={() => setCurrencyActiveFilter(EXPENSE_CURRENCY_FILTER.ALL)}
                className={cx('btn')}
                aria-selected={activeCurrencyFilter === EXPENSE_DATE_FILTER.ALL}
              >모두보기</button>
              {uniqueCurrencies.map(item => (
                <button
                  key={item}
                  onClick={() => setCurrencyActiveFilter(item)}
                  className={cx('btn')}
                  aria-selected={activeCurrencyFilter === item}
                >{item}
                </button>
              ))}
            </div>
            <div className={cx('btn_view_type')}>현금, 카드 보기</div>
          </div>
          <div className={cx('date_info')}>
            <em className={cx('d_day')}>DAY 1</em>
            <span className={cx('date')}>2019년 8월 28일</span>
            <span className={cx('total_expense')}>₩{totalAmount}</span>
          </div>
        </div>
      </div>
      <ul className={cx('expense_list')}>
        {currentBudgetInfo.map(item => {
          const time = new Date(item.date).toLocaleTimeString();

          return (
            <li className={cx('list')} key={item.id}>
              <button className={cx('btn_expense')}>
                <div className={cx('wrapper')}>
                  <div className={cx('inner', 'icon', item.category)}><span className={cx('blind')}>{item.category}</span></div>
                  <div className={cx('inner', 'detail_info')}>
                    <div className={cx('info_inner')}>
                      <span className={cx('detail_expense')}>₩{item.amount}</span>
                      {item.day === EXPENSE_DATE_FILTER.READY && (
                        <span className={cx('ready')}>준비</span>
                      )}
                    </div>
                    <p className={cx('info_text')}>{item.title}</p>
                  </div>
                  <div className={cx('inner', 'time')}>{time}</div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <div className={cx('total_area')}>
        <span className={cx('text')}>쓴 돈</span>
        <em className={cx('total_expense')}>₩ 362,928</em>
      </div>
    </div>
  )
  );
};

Expense.propTypes = {
  currentTripInfo: PropTypes.object
};

export default hot(Expense);
