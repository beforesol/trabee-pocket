import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ExpenseInfo from '../ExpenseInfo';
import SpendingCategory from '../SpendingCategory';
import ExpenseInput from '../ExpenseInput';
import { AMOUNT_TYPE, EXPENSE_CATEGORY, EXPENSE_TYPE } from '@constants/type';
import axios from 'axios';


const style = require('./spendingLayer.scss');
const cx = classNames.bind(style);

const SpendingLayer = ({ currentTripInfo, onSetIsOpenSpendingLayer }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [activeAmoutType, setActiveAmoutType] = useState(AMOUNT_TYPE.READY_MONEY);
  const [activeCategory, setActiveCategory] = useState(EXPENSE_CATEGORY.FOOD.type);
  const [title, setTitle] = useState('');

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

    axios.post('/api/budget/save', { budgetInfo }).then(response => {
      console.log('저장 성공');
    }).catch(err => {
      console.log('저장 실패');
    });
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
    </div>
  );
};

SpendingLayer.propTypes = {
  currentTripInfo: PropTypes.object,
  onSetIsOpenSpendingLayer: PropTypes.func
};


export default hot(SpendingLayer);
