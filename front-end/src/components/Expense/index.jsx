import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { DetailHeader } from '@components';

const style = require('./expense.scss');
const cx = classNames.bind(style);

const Expense = () => (
  <div className={cx('expense')}>
    <DetailHeader title={'공주'} />
    <div className={cx('date_tab')}>
      <div className={cx('date_area')}>
        <button
          type="button"
          aria-selected="true"
          className={cx('btn_tab')}>
          <em className={cx('tab_title')}>A</em>
          <p className={cx('text')}>ALL</p>
        </button>
        <button
          type="button"
          aria-selected="false"
          className={cx('btn_tab')}>
          <em className={cx('tab_title')}>P</em>
          <p className={cx('text')}>준비</p>
        </button>
      </div>
      <div className={cx('date_area')}>
        <button
          type="button"
          aria-selected="false"
          className={cx('btn_tab')}>
          <em className={cx('tab_title')}>25</em>
          <p className={cx('text')}>10월</p>
        </button>
        <button
          type="button"
          aria-selected="false"
          className={cx('btn_tab')}>
          <em className={cx('tab_title')}>26</em>
          <p className={cx('text')}>10월</p>
        </button>
      </div>
    </div>
    <div className={cx('info_area')}>
      <div className={cx('expense_info')}>
        <div className={cx('btn_area')}>
          <button className={cx('btn')} aria-selected="true">모두보기</button>
          <button className={cx('btn')} aria-selected="false">RUB</button>
          <button className={cx('btn')} aria-selected="false">KRW</button>
        </div>
        <div className={cx('btn_view_type')}>현금, 카드 보기</div>
      </div>
      <div className={cx('date_info')}>
        <em className={cx('d_day')}>DAY 1</em>
        <span className={cx('date')}>2019년 8월 28일</span>
        <span className={cx('total_expense')}>₩362,928</span>
      </div>
    </div>
    <ul className={cx('expense_list')}>
      <li className={cx('list')}>
        <button className={cx('btn_expense')}>
          <div className={cx('wrapper')}>
            <div className={cx('inner', 'icon')}><span className={cx('blind')}>교통비</span></div>
            <div className={cx('inner', 'detail_info')}>
              <div className={cx('info_inner')}>
                <span className={cx('detail_expense')}>₩60,700</span>
                <span className={cx('ready')}>준비</span>
              </div>
              <p className={cx('info_text')}>위탁수화물</p>
            </div>
            <div className={cx('inner', 'time')}>11:25</div>
          </div>
        </button>
      </li>
    </ul>
    <div className={cx('total_area')}>
      <span className={cx('text')}>쓴 돈</span>
      <em className={cx('total_expense')}>₩ 362,928</em>
    </div>
  </div>
);

Expense.propTypes = {

};

export default hot(Expense);
