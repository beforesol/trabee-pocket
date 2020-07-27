import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { ITrip, IBudget } from '../../types/api';
import { EXPENSE_TYPE } from '@constants/type';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  currentTripInfo: ITrip;
  rate: number;
  onSetOpenCurrencyLayer: (isOpen: boolean) => void;
  onClickIncome: (isIncome: boolean) => void;
  budgetList: IBudget[];
  totalIncome: number;
}

const CurrencyLayer: React.FC<IOwnProps> = ({
  currentTripInfo,
  rate: currencyRate,
  onSetOpenCurrencyLayer,
  onClickIncome,
  budgetList,
  totalIncome
}) => {
  const [rate, setRate] = useState(currencyRate);

  const handleClickAddIncome = () => {
    onClickIncome(true);
  }

  const handleClickClose = () => {
    onSetOpenCurrencyLayer(false);
  }

  const { currency } = currentTripInfo.country;

  return (
    <div className={cx('currency_layer')}>
      <span className={cx('dimmed')} />
      <div className={cx('inner')}>
        <div className={cx('title_area')}>
          <button
            className={cx('btn_close')}
            onClick={handleClickClose}><span className="blind">닫기</span></button>
          <strong className={cx('title')}>{currency.en}</strong>
        </div>
        <div className={cx('currency_info')}>
          <strong className={cx('title')}>예산 정보</strong>
          <ul className={cx('detail_area')}>
            <li className={cx('detail_list')}>
              <span className={cx('detail_title')}>화폐</span>
              <span className={cx('detail_text')}>KRW</span>
            </li>
            <li className={cx('detail_list')}>
              <span className={cx('detail_title')}>환율</span>
              <span className={cx('detail_text')}>{currency.en} 1 = KRW {rate}</span>
            </li>
          </ul>
        </div>
        <div className={cx('currency_amount')}>
          <div className={cx('amount_title_area')}>
            <strong className={cx('title')}>예산 금액</strong>
            <span className={cx('amount')}>{currency.en} {totalIncome}</span>
          </div>
          <button className={cx('add_currency')} onClick={handleClickAddIncome}>예산 금액 추가하기</button>
          <div className={cx('curreny_list')}>
            {budgetList.map((budget: IBudget) => {
              if (budget.type === EXPENSE_TYPE.INCOME) {
                const date = budget.date.slice(0, 10);

                return (
                  <button type="button" className={cx('list_item')} key={budget.id}>
                    <span className={cx('list_title')}>[{date}] {budget.title}</span>
                    <span className={cx('list_text')}>+ {budget.amount}</span>
                  </button>
                )
              }
              return;
            })}
          </div>
        </div>
      </div>
    </div>
  )
};

export default hot(CurrencyLayer);
