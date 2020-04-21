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
          <strong className={cx('tilte')}>예산 정보</strong>
          <dl className={cx('detail_area')}>
            <dt>화폐</dt>
            <dd>KRW</dd>
            <dt>환율</dt>
            <dd>KRW 1 = KRW 1</dd>
          </dl>
        </div>
        <div className={cx('currency_amount')}>
          <button className={cx('add_currency')}>예산 금액 추가하기</button>
          <dl className={cx('curreny_list')}>
            <dt>[2020.4.18.]예산</dt>
            <dd>+ 8,888, 888.00</dd>
            <dt>[2020.4.18.]예산</dt>
            <dd>+ 8,888, 888.00</dd>
          </dl>
        </div>
        <button className={cx('btn_delete')}>이 예산 삭제하기</button>
      </div>
    </div>
  )
};

export default hot(CurrencyLayer);
