import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ExpenseInfo from '../ExpenseInfo';
import SpendingCategory from '../SpendingCategory';
import ExpenseInput from '../ExpenseInput';
import {
  AMOUNT_TYPE,
  EXPENSE_CATEGORY,
  EXPENSE_TYPE,
} from '@constants/type';
import { Layer } from '@components';
import { LAYER_TYPE } from '@components/Layer';

import { budgetActions } from '@modules/budget';

import axios from 'axios';


const style = require('./spendingLayer.scss');
const cx = classNames.bind(style);
const {
  resetCurrentBudgetList
} = budgetActions;

const SpendingLayer = ({ currentTripInfo, onSetIsOpenSpendingLayer, currentBudgetInfo }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [type, setType] = useState(EXPENSE_TYPE.SPENDING);
  const [title, setTitle] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [activeAmoutType, setActiveAmoutType] = useState(AMOUNT_TYPE.READY_MONEY);
  const [activeCategory, setActiveCategory] = useState(EXPENSE_CATEGORY.FOOD.type);
  const [day, setDay] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpenLayer, setIsOpenLayer] = useState(false);
  const [layerState, setLayerState] = useState({ openHandler: setIsOpenLayer });

  const save = () => {
    const budgetInfo = {
      id,
      tripId: currentTripInfo.id,
      type,
      title,
      amount: displayValue,
      amountType: activeAmoutType,
      currency: currentTripInfo.country.currency,
      category: activeCategory,
      day,
      date: Date.now()
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
      dispatch(resetCurrentBudgetList());
    };
  };

  useEffect(() => {
    const {
      id,
      title,
      amount,
      amountType,
      category,
      day
    } = currentBudgetInfo;

    if (id) {
      setId(id);
      setTitle(title);
      setDisplayValue(amount);
      setActiveAmoutType(amountType);
      setActiveCategory(category);
      setDay(day);
    }
  }, [currentBudgetInfo]);

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
        title={title}
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
  onSetIsOpenSpendingLayer: PropTypes.func,
  currentBudgetInfo: PropTypes.object
};


export default hot(SpendingLayer);
