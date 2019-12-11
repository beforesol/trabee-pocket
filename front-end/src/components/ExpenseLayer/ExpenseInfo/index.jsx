import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = require('./expenseInfo.scss');
const cx = classNames.bind(style);

const ExpenseInfo = ({ displayValue }) => (
  <div className={cx('expense_info')} style={{ backgroundColor: 'rgb(253, 200, 200)' }}>
    <div className={cx('top_area')}>
      <span className={cx('expense_type')}>지출</span>
      <span className={cx('currency_type')}>예산: <span className={cx('currency')}>KRW</span></span>
    </div>
    <div className={cx('middle_area')}>
      <img src="http://www.0404.go.kr/imgsrc.mofa?atch_file_id=COUNTRY_120&file_sn=1" alt="" className={cx('flag')} />
      <em className={cx('currency')}>KRW</em>
      <div className={cx('amount')}>{displayValue}</div>
    </div>
    <div className={cx('bottom_area')}>
      <button className={cx('icon', 'ready_money')} aria-selected="true"><span className={cx('blind')}>현금</span></button>
      <button className={cx('icon', 'card')} aria-selected="false"><span className={cx('blind')}>카드</span></button>
      <p className={cx('converted_amount')}>KRW <span className={cx('money')}>*</span></p>
    </div>
  </div>
);

ExpenseInfo.propTypes = {
  displayValue: PropTypes.string
};


export default hot(ExpenseInfo);
