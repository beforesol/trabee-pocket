import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
const style = require('./index.scss');
const cx = classNames.bind(style);

const CurrencyLayer = () => {

  return (
    <div className={cx('currency_layer')}>
      <span className={cx('dimmed')} />
      <div className={cx('inner')}>
        <div className={cx('title_area')}>
          <button className={cx('btn_close')}><span className="blind">닫기</span></button>
          <strong className={cx('title')}>KWW</strong>
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
              <button type="button" className={cx('detail_text')}>KRW 1 = KRW 1</button>
            </li>
          </ul>
        </div>
        <div className={cx('currency_amount')}>
          <div className={cx('amount_title_area')}>
            <strong className={cx('title')}>예산 금액</strong>
            <span className={cx('amount')}>#258</span>
          </div>
          <button className={cx('add_currency')}>예산 금액 추가하기</button>
          <div className={cx('curreny_list')}>
            <button type="button" className={cx('list_item')}>
              <span className={cx('list_title')}>[2020.4.18.] 예산</span>
              <span className={cx('list_text')}>+ 8,888, 888.00</span>
            </button>
            <button type="button" className={cx('list_item')}>
              <span className={cx('list_title')}>[2020.4.18.] 예산</span>
              <span className={cx('list_text')}>+ 8,888, 888.00</span>
            </button>
          </div>
        </div>
        <div className={cx('btn_delete_area')}>
          <button className={cx('btn_delete')}>이 예산 삭제하기</button>
        </div>
      </div>
    </div>
  )
};

export default hot(CurrencyLayer);
