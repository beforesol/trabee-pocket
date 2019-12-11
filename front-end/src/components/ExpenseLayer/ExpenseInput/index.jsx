import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Calculator } from '@components';

const style = require('./expenseInput.scss');
const cx = classNames.bind(style);

const ExpenseInput = ({ onSetDisplayValue }) => {
  const setDisplayValue = displayValue => {
    onSetDisplayValue(displayValue);
  };

  return (
    <div className={cx('expense_input')}>
      <input
        type="text"
        className={cx('text_input')}
        placeholder='여기에 항목명을 입력해주세요 (선택)'
      />
      <div className={cx('keyboard_area')}>
        <div className={cx('btn_area')}>
          <button className={cx('btn', 'cancle')}>취소</button>
          <button className={cx('btn', 'save')}>저장</button>
        </div>
        <Calculator onSetDisplayValue={setDisplayValue} />
      </div>
    </div>
  );
};

ExpenseInput.propTypes = {
  onSetDisplayValue: PropTypes.func
};

export default hot(ExpenseInput);
