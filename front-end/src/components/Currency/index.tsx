import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import {
  Layer,
  DetailHeader,
  CurrencyLayer
} from '@components/index.ts';
import { LAYER_TYPE } from '@components/Layer';

const style = require('./index.scss');
const cx = classNames.bind(style);

const Currency = () => {
  const [openUpgradeLayer, setOpenUpgradeLayer] = useState(false);
  const [openCurrencyLayer, setOpenCurrencyLayer] = useState(false);

  const handleClickCurrency = (_currency: string) => {
    setOpenCurrencyLayer(true);
  }

  return (
    <div className={cx('currency')}>
      <DetailHeader title={'코타키나 발루'} />
      <ul className={cx('currency_area')}>
        <li className={cx('list')}>
          <button className={cx('link')} onClick={() => handleClickCurrency('MYR')}>
            <div className={cx('title_area')}>
              <strong className={cx('title')}>MYR</strong>
              <span className={cx('income')}>MYR 0.00</span>
            </div>
            <div className={cx('usage_area')}>
              <span className={cx('usage')} />
            </div>
            <div className={cx('use_info')}>
              <span className={cx('use')}>MYR 0.00 사용</span>
              <span className={cx('remain')}>MYR 0.00 남음</span>
            </div>
          </button>
        </li>
      </ul>
      <div className={cx('btn_area')}>
        <button type="button" className={cx('add_currecy')} onClick={() => setOpenUpgradeLayer(true)}>화폐/예산 추가하기</button>
      </div>
      {openUpgradeLayer && (
        <Layer
          title={'PRO UPGRADE'}
          text={'PRO로 업그레이드 해보세요. 여행 경비 리포트를 볼 수 있고, 지출 내역을 PDF, CSV 파일로 내보내기 할 수 있습니다.'}
          layerType={LAYER_TYPE.TEXT}
          openHandler={setOpenUpgradeLayer}
          handler={() => { }}
        />
      )}
      {openCurrencyLayer && (
        <CurrencyLayer />
      )}
    </div>
  )
};

export default hot(Currency);
