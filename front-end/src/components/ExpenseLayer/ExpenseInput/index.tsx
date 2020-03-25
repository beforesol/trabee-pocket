import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Calculator } from '@components/index.ts';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  type: string
  title: any
  onSetDisplayValue: any
  onSetIsOpenLayer: any
  onSetTitle: any
  onSave: any
}

const ExpenseInput: React.FC<IOwnProps> = ({
  type,
  title,
  onSetDisplayValue,
  onSetIsOpenLayer,
  onSetTitle,
  onSave
}) => {
  const setDisplayValue = (displayValue: any) => {
    onSetDisplayValue(displayValue);
  };

  const handleClickSave = () => {
    onSave();
  };

  return (
    <div className={cx('expense_input', type.toLowerCase())}>
      <input
        type="text"
        className={cx('text_input')}
        placeholder='여기에 항목명을 입력해주세요 (선택)'
        value={title}
        onChange={e => onSetTitle(e.currentTarget.value)}
      />
      <div className={cx('keyboard_area')}>
        <div className={cx('btn_area')}>
          <button className={cx('btn', 'cancle')} onClick={() => onSetIsOpenLayer(false)}>취소</button>
          <button className={cx('btn', 'save')} onClick={handleClickSave}>저장</button>
        </div>
        <Calculator
          onSetDisplayValue={setDisplayValue}
          type={type}
        />
      </div>
    </div>
  );
};

export default hot(ExpenseInput);
