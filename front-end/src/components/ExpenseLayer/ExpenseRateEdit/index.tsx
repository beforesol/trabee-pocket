import React, { useState, useRef, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  rate: number;
  setRate: (rate: number) => void;
  countryImageUrl: string;
}

const ExpenseRateEdit: React.FC<IOwnProps> = ({
  rate,
  setRate,
  countryImageUrl
}) => {
  const [useEdit, setUseEdit] = useState(false);

  const handleChangeRate = (e: any) => {
    setRate(e.currentTarget.value);
  }

  const useEditText = useEdit ? 'ON' : 'OFF';

  return (
    <div className={cx('expense_rate_edit')}>
      <div className={cx('title_area')}>
        <strong className={cx('title')}>사용자 지정 환율 사용</strong>
        <button
          type="button"
          className={cx('btn_use_edit')}
          aria-selected={!!useEdit}
          onClick={() => setUseEdit(!useEdit)}>{useEditText}</button>
      </div>
      <ul className={cx('country_list')}>
        <li className={cx('list')}>
          <div className={cx('thumbnail')}>
            <img src={countryImageUrl} alt="" />
          </div>
          <div className={cx('figure')}>
            <span className={cx('number')}>1</span>
            <span className={cx('currency')}>GBP</span>
          </div>
        </li>
        <li className={cx('list')}>
          <div className={cx('thumbnail')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/108px-Flag_of_South_Korea.svg.png" alt="" />
          </div>
          {useEdit ? (
            <button className={cx('figure')}>
              <input type="text" className={cx('number')} value={rate} onChange={(e: any) => handleChangeRate(e)} />
              <span className={cx('currency')}>KRW</span>
            </button>
          ) : (
              <div className={cx('figure')}>
                <span className={cx('number')}>{rate}</span>
                <span className={cx('currency')}>KRW</span>
              </div>
            )}

        </li>
      </ul>
    </div>
  );
};

export default hot(ExpenseRateEdit);
