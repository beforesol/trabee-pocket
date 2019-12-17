import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ExpenseInfo from '../ExpenseInfo';
import SpendingCategory from '../SpendingCategory';
import ExpenseInput from '../ExpenseInput';
import {
  AMOUNT_TYPE,
  EXPENSE_CATEGORY,
  EXPENSE_TYPE
} from '@constants/type';
import { Layer } from '@components';
import { LAYER_TYPE } from '@components/Layer';

import axios from 'axios';


const style = require('./spendingLayer.scss');
const cx = classNames.bind(style);

const SpendingLayer = ({ currentTripInfo, onSetIsOpenSpendingLayer }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [activeAmoutType, setActiveAmoutType] = useState(AMOUNT_TYPE.READY_MONEY);
  const [activeCategory, setActiveCategory] = useState(EXPENSE_CATEGORY.FOOD.type);
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpenLayer, setIsOpenLayer] = useState(false);
  const [layerState, setLayerState] = useState({ openHandler: setIsOpenLayer });

  const save = () => {
    const type = EXPENSE_TYPE.SPENDING;
    const budgetInfo = {
      tripId: currentTripInfo.id,
      type,
      title,
      amount: displayValue,
      amountType: activeAmoutType,
      currency: currentTripInfo.country.currency,
      category: activeCategory
    };

    setIsSaving(true);

    axios.post('/api/budget/save', { budgetInfo }).then(response => {
      setIsOpenLayer(true);
      setIsSaving(false);
      setLayerState({
        ...layerState,
        layerType: LAYER_TYPE.TEXT,
        title: '저장을 성공하였습니다.',
        text: '즐거운 여행 되세요.',
        handler: handleSuccessSave
      });
    }).catch(err => {
      setIsOpenLayer(true);
      setIsSaving(false);
      setLayerState({
        ...layerState,
        layerType: LAYER_TYPE.TEXT,
        title: '저장을 실패하였습니다.',
        text: '다시 시도해 주세요.',
        handler: () => { }
      });
    });

    const handleSuccessSave = () => {
      onSetIsOpenSpendingLayer(false);
    };
  };

  return (
    <div className={cx('spending_layer')}>
      <ExpenseInfo
        country={currentTripInfo.country}
        displayValue={displayValue}
        activeAmoutType={activeAmoutType}
        onSetActiveAmountType={setActiveAmoutType}
      />
      <SpendingCategory
        activeCategory={activeCategory}
        onSetActiveCategory={setActiveCategory}
      />
      <ExpenseInput
        onSetDisplayValue={setDisplayValue}
        onSetIsOpenSpendingLayer={onSetIsOpenSpendingLayer}
        onSetTitle={setTitle}
        onSave={save}
      />
      {isSaving && (
        <p>저장중...</p>
      )}
      {isOpenLayer && (
        <Layer {...layerState} />
      )}
    </div>
  );
};

SpendingLayer.propTypes = {
  currentTripInfo: PropTypes.object,
  onSetIsOpenSpendingLayer: PropTypes.func
};


export default hot(SpendingLayer);
