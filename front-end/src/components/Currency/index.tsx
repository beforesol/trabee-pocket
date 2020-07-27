import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import {
  Layer,
  DetailHeader,
  CurrencyLayer
} from '@components/index.ts';
import { LAYER_TYPE } from '@components/Layer';
import { ITrip, IBudget } from '../../types/api';
import { BUDGET, budgetActions } from '@modules/budget';
import { useSelector, useDispatch } from 'react-redux';
import { EXPENSE_TYPE, BALANCE_TYPE } from '@constants/type';

const style = require('./index.scss');
const cx = classNames.bind(style);

const {
  axiosGetCurrentBudgetApi,
  resetCurrentBudgetList
} = budgetActions;

interface IOwnProps {
  currentTripInfo: ITrip;
  onClickIncome: (isIncome: boolean) => void
  onClickExpenseItem: ({ id, type }: { id: string, type: string }) => void;
}

const Currency: React.FC<IOwnProps> = ({
  currentTripInfo,
  onClickIncome,
  onClickExpenseItem
}) => {
  const dispatch = useDispatch();

  const {
    isLoaded: isBudgetLoaded,
    isFailed,
    budgetList,
  } = useSelector((state: any) => state[BUDGET]);

  const [openUpgradeLayer, setOpenUpgradeLayer] = useState(false);
  const [openCurrencyLayer, setOpenCurrencyLayer] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [balanceInfo, setBalanceInfo] = useState({
    balance: 0,
    text: BALANCE_TYPE.LESS
  });
  const [expenseRatio, setExpenseRatio] = useState('0%');

  const handleClickCurrency = (_currency: string) => {
    setOpenCurrencyLayer(true);
  }

  useEffect(() => () => {
    dispatch(resetCurrentBudgetList());
  }, []);

  useEffect(() => {
    !isBudgetLoaded && dispatch(axiosGetCurrentBudgetApi({ id: currentTripInfo.id }));
  }, [isBudgetLoaded]);

  useEffect(() => {
    if (isBudgetLoaded) {
      let totalIncome = 0;
      let totalSpending = 0;

      budgetList.forEach((budget: IBudget) => {
        if (budget.type === EXPENSE_TYPE.INCOME) {
          totalIncome += Number(budget.amount);
        }

        if (budget.type === EXPENSE_TYPE.SPENDING) {
          totalSpending += Number(budget.amount);
        }
      });

      const balanceAmount = totalIncome - totalSpending;
      const balance = balanceAmount > 0 ? balanceAmount : -balanceAmount;

      const balanceText = balanceAmount > 0 ? BALANCE_TYPE.LESS : BALANCE_TYPE.EXCEED;

      const expenseRatio = totalSpending / totalIncome > 100 ? '100%' : `${(totalSpending / totalIncome)
        }%`;

      setTotalIncome(totalIncome);
      setTotalSpending(totalSpending);
      setBalanceInfo({
        balance,
        text: balanceText
      });
      setExpenseRatio(expenseRatio);
    }
  }, [budgetList]);

  const { name, currency } = currentTripInfo.country;

  return (
    (!isBudgetLoaded ? (
      isFailed ? (<p>실패하였습니다</p>) : (<p>로딩중...</p>)
    ) : (
        < div className={cx('currency')} >
          <DetailHeader title={name} />
          <ul className={cx('currency_area')}>
            <li className={cx('list', balanceInfo.text === BALANCE_TYPE.EXCEED && 'exceed')}>
              <button className={cx('link')} onClick={() => handleClickCurrency('MYR')}>
                <div className={cx('title_area')}>
                  <strong className={cx('title')}>{currency.en}</strong>
                  <span className={cx('income')}>{currency.en} {totalIncome}</span>
                </div>
                <div className={cx('usage_area')}>
                  <span className={cx('usage')} style={{ width: expenseRatio }} />
                </div>
                <div className={cx('use_info')}>
                  <span className={cx('use')}>{currency.en} {totalSpending} 사용</span>
                  <span className={cx('remain')}>{currency.en} {balanceInfo.balance} {balanceInfo.text}</span>
                </div>
              </button>
            </li>
          </ul>
          <div className={cx('btn_area')}>
            <button type="button" className={cx('add_currecy')} onClick={() => setOpenUpgradeLayer(true)}>화폐/예산 추가하기</button>
          </div>
          {
            openUpgradeLayer && (
              <Layer
                title={'PRO UPGRADE'}
                text={'PRO로 업그레이드 해보세요. 여행 경비 리포트를 볼 수 있고, 지출 내역을 PDF, CSV 파일로 내보내기 할 수 있습니다.'}
                layerType={LAYER_TYPE.TEXT}
                openHandler={setOpenUpgradeLayer}
                handler={() => { }}
              />
            )
          }
          {openCurrencyLayer && (
            <CurrencyLayer
              currentTripInfo={currentTripInfo}
              rate={currentTripInfo.country.currency.rate}
              onSetOpenCurrencyLayer={setOpenCurrencyLayer}
              onClickIncome={onClickIncome}
              budgetList={budgetList}
              totalIncome={totalIncome}
              onClickExpenseItem={onClickExpenseItem}
            />
          )}
        </div >
      )
    )
  )
};

export default hot(Currency);
