import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  currency: string;
  onClickEdit: () => void;
  rate: number;
}

const IncomeInfo: React.FC<IOwnProps> = ({
  currency,
  onClickEdit,
  rate
}) => {
  const handleClickEdit = () => {
    onClickEdit();
  }

  return (
    <div className={cx('income_info')}>
      <div className={cx('text_area')}>
        <span className={cx('text')}>예산에 금액이 추가 됩니다.</span>
      </div>
      <div className={cx('rate_area')}>
        <strong className={cx('name')}>환율</strong>
        <div className={cx('btn_area')}>
          <p className={cx('rate')}>{currency} 1 = KRW {rate}</p>
          <button
            type="button"
            className={cx('btn_edit')}
            onClick={handleClickEdit}>편집</button>
        </div>
      </div>
    </div>
  );
}

export default hot(IncomeInfo);
