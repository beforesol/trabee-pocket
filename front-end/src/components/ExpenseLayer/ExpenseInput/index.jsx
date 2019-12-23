import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Calculator } from '@components';

const style = require('./expenseInput.scss');
const cx = classNames.bind(style);

const ExpenseInput = ({
  title,
  onSetDisplayValue,
  onSetIsOpenSpendingLayer,
  onSetTitle,
  onSave
}) => {
  const setDisplayValue = displayValue => {
    onSetDisplayValue(displayValue);
  };

  const handleClickSave = () => {
    onSave();
  };

  return (
    <div className={cx('expense_input')}>
      <input
        type="text"
        className={cx('text_input')}
        placeholder='여기에 항목명을 입력해주세요 (선택)'
        value={title}
        onChange={e => onSetTitle(e.currentTarget.value)}
      />
      <div className={cx('keyboard_area')}>
        <div className={cx('btn_area')}>
          <button className={cx('btn', 'cancle')} onClick={() => onSetIsOpenSpendingLayer(false)}>취소</button>
          <button className={cx('btn', 'save')} onClick={handleClickSave}>저장</button>
        </div>
        <Calculator onSetDisplayValue={setDisplayValue} />
      </div>
    </div>
  );
};

ExpenseInput.propTypes = {
  title: PropTypes.string,
  onSetDisplayValue: PropTypes.func,
  onSetIsOpenSpendingLayer: PropTypes.func,
  onSetTitle: PropTypes.func,
  onSave: PropTypes.func
};

export default hot(ExpenseInput);
