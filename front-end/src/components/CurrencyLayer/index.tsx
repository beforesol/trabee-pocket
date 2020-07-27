import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { Layer } from '@components/index';
import ExpenseRateEdit from '@components/ExpenseLayer/ExpenseRateEdit';
import { LAYER_TYPE } from '@components/Layer';
import axios from 'axios';
import { ITrip } from '../../types/api';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  userId: string;
  currentTripInfo: ITrip;
  rate: number;
  onSetOpenCurrencyLayer: (isOpen: boolean) => void;
}

const CurrencyLayer: React.FC<IOwnProps> = ({
  userId,
  currentTripInfo,
  rate: currencyRate,
  onSetOpenCurrencyLayer
}) => {
  const [isOpenRateLayer, setIsOpenRateLayer] = useState(false);
  const [rateLayerState, setRateLayerState] = useState<any>({ openHandler: setIsOpenRateLayer });
  const [rate, setRate] = useState(currencyRate);
  const [isOpenSaveLayer, setIsOpenSaveLayer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveLayerState, setSaveLayerState] = useState<any>({ openHandler: setIsOpenSaveLayer });

  const handleClickEdit = () => {
    setIsOpenRateLayer(true);
    setRateLayerState({
      ...rateLayerState,
      layerType: LAYER_TYPE.COMPONENT,
      handler: saveRate
    });
  }

  const saveRate = () => {
    // 저장하기 로직
    const tripInfo = {
      ...currentTripInfo,
      country: {
        ...currentTripInfo.country,
        currency: {
          ...currentTripInfo.country.currency,
          rate
        }
      }
    }

    console.log(rate);

    axios.post('/api/profile/save', { userId, tripInfo }).then(() => {
      setIsOpenSaveLayer(true);
      setIsSaving(false);
      setSaveLayerState({
        ...saveLayerState,
        layerType: LAYER_TYPE.TEXT,
        title: '저장을 성공하였습니다.',
        text: '즐거운 여행 되세요.',
        handler: () => { }
      });
    }).catch(() => {
      setIsOpenSaveLayer(true);
      setIsSaving(false);
      setSaveLayerState({
        ...saveLayerState,
        layerType: LAYER_TYPE.TEXT,
        title: '저장을 실패하였습니다.',
        text: '다시 시도해 주세요.',
        handler: () => { }
      });
    });
  }

  const { currency } = currentTripInfo.country;

  return (
    <div className={cx('currency_layer')}>
      <span className={cx('dimmed')} />
      <div className={cx('inner')}>
        <div className={cx('title_area')}>
          <button
            className={cx('btn_close')}
            onClick={() => onSetOpenCurrencyLayer(false)}><span className="blind">닫기</span></button>
          <strong className={cx('title')}>{currency.en}</strong>
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
              <button type="button" className={cx('detail_text')} onClick={handleClickEdit}>
                {currency.en} 1 = KRW {rate}</button>
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
      </div>
      {isSaving && (
        <p>저장중...</p>
      )}
      {isOpenSaveLayer && (
        <Layer {...saveLayerState} />
      )}
      {isOpenRateLayer && (
        <Layer {...rateLayerState}>
          <ExpenseRateEdit
            countryImageUrl={currentTripInfo.country.imgUrl}
            rate={rate}
            setRate={setRate}
          />
        </Layer>
      )}
    </div>
  )
};

export default hot(CurrencyLayer);
