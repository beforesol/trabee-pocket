import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { DetailHeader } from '@components/index.ts';
import ExpenseItem from './ExpenseItem';
import {
  EXPENSE_TYPE,
  EXPENSE_DATE_FILTER,
  EXPENSE_CURRENCY_FILTER
} from '@constants/type/index.ts';

import { BUDGET, budgetActions, budget } from '@modules/budget';
import { getDatesBetween } from '@utils/index';

const style = require('./index.scss');
const cx = classNames.bind(style);

const {
  axiosGetCurrentBudgetApi,
  resetCurrentBudgetList
} = budgetActions;

interface IOwnProps {
  currentTripInfo: any;
  onClickExpenseItem: any;
  activeDateFilter: string;
  onSetDateActiveFilter: (date: string) => void;
}

const Expense: React.FC<IOwnProps> = ({
  currentTripInfo,
  onClickExpenseItem,
  activeDateFilter,
  onSetDateActiveFilter
}) => {
  const dispatch = useDispatch();

  const {
    isLoaded: isBudgetLoaded,
    isFailed,
    budgetList,
  } = useSelector((state: any) => state[BUDGET]);

  const [activeCurrencyFilter, setCurrencyActiveFilter] = useState(EXPENSE_CURRENCY_FILTER.ALL);
  const [currentBudgetList, setCurrentBudgetList] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateInfo, setDateInfo] = useState<any>({
    dDay: 1,
    date: new Date(currentTripInfo.startDate)
  })

  const dateRange = getDatesBetween(new Date(currentTripInfo.startDate), new Date(currentTripInfo.endDate)).map(item => item.toLocaleDateString());
  const dDay = dateRange.indexOf(activeDateFilter) + 1;

  const getCurrentBudgetList = () => {
    let filteredBudgetList = [];

    if (activeCurrencyFilter === EXPENSE_CURRENCY_FILTER.ALL) {
      filteredBudgetList = [...budgetList];
    } else {
      filteredBudgetList = [...budgetList].filter((budget: any) => budget.currency.en === activeCurrencyFilter)
    };

    if (activeDateFilter === EXPENSE_DATE_FILTER.ALL) {
      return filteredBudgetList;
    }

    if (activeDateFilter === EXPENSE_DATE_FILTER.READY) {
      return filteredBudgetList.filter((budget: any) => budget.day === EXPENSE_DATE_FILTER.READY);
    }

    return filteredBudgetList.filter((budget: any) => parseInt(budget.day) === dDay);
  }

  const getDate = () => {
    let year: any = '';
    let month: any = '';
    let date: any = '';

    if (activeDateFilter === EXPENSE_DATE_FILTER.ALL || activeDateFilter === EXPENSE_DATE_FILTER.READY) {

      year = new Date(currentTripInfo.startDate).getFullYear();
      month = new Date(currentTripInfo.startDate).getMonth();
      date = new Date(currentTripInfo.startDate).getDate();

      month = month % 12 + 1;
    } else {
      year = activeDateFilter.split('.')[0];
      month = activeDateFilter.split('.')[1];
      date = activeDateFilter.split('.')[2];
    }

    return `${year}년 ${month}월 ${date}일`;
  }

  useEffect(() => () => {
    dispatch(resetCurrentBudgetList());
  }, []);

  useEffect(() => {
    !isBudgetLoaded && dispatch(axiosGetCurrentBudgetApi({ id: currentTripInfo.id }));
  }, [isBudgetLoaded]);

  useEffect(() => {
    const buggetList = getCurrentBudgetList();

    setCurrentBudgetList([...buggetList]);
  }, [activeDateFilter, activeCurrencyFilter, budgetList]);

  useEffect(() => {
    setDateInfo({
      dDay: dDay < 1 ? 1 : dDay,
      date: getDate()
    })
  }, [activeDateFilter]);

  useEffect(() => {
    if (currentBudgetList.length) {
      const total = currentBudgetList.reduce((a: any, b: any) => {
        const calculatedAmount = Number(b.amount) * b.currency.rate;

        return Number(a) + Number(calculatedAmount);
      }, 0);

      setTotalAmount(Math.floor(total));
    }
  }, [currentBudgetList]);

  const currencyItems = (budgetList.length) ? budgetList.map((item: any) => item.currency.en) : [];
  const uniqueCurrencies = currencyItems.filter((item: any, index: number) => currencyItems.indexOf(item) === index);

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
                onClick={() => onSetDateActiveFilter(EXPENSE_DATE_FILTER.ALL)}
                aria-selected={activeDateFilter === EXPENSE_DATE_FILTER.ALL}
                className={cx('btn_tab')}>
                <em className={cx('tab_title')}>A</em>
                <p className={cx('text')}>ALL</p>
              </button>
              <button
                type="button"
                onClick={() => onSetDateActiveFilter(EXPENSE_DATE_FILTER.READY)}
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
                    onClick={() => onSetDateActiveFilter(item)}
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
                {uniqueCurrencies.map((item: any) => (
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
              <em className={cx('d_day')}>DAY {dateInfo.dDay}</em>
              <span className={cx('date')}>{dateInfo.date}</span>
              <span className={cx('total_expense')}>₩ {totalAmount}</span>
            </div>
          </div>
        </div>
        <ul className={cx('expense_list')}>
          {currentBudgetList.map((item: any) => {
            const time = new Date(item.date).toLocaleTimeString();

            return (
              <ExpenseItem
                key={item.id}
                id={item.id}
                type={item.type}
                category={item.category}
                currency={item.currency}
                amount={item.amount}
                day={item.day}
                title={item.title}
                time={time}
                onClickExpenseItem={onClickExpenseItem}
              />
            );
          })}
        </ul>
        <div className={cx('total_area')}>
          <span className={cx('text')}>쓴 돈</span>
          <em className={cx('total_expense')}>₩ {totalAmount}</em>
        </div>
      </div>
    )
  );
};

export default hot(Expense);
