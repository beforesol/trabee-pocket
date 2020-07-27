import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import ExpenseInfo from '../ExpenseInfo';
import SpendingCategory from '../SpendingCategory';
import ExpenseInput from '../ExpenseInput';
import {
  AMOUNT_TYPE,
  EXPENSE_CATEGORY,
  EXPENSE_TYPE,
} from '@constants/type';
import { Layer } from '@components/index';
import { LAYER_TYPE } from '@components/Layer';
import { budgetActions } from '@modules/budget';
import axios from 'axios';
import { getDatesBetween } from '@utils/index';
import { EXPENSE_DATE_FILTER } from '@constants/type';
import { ITrip, IBudget } from '../../../types/api';
import { TRIP, tripActions } from '@modules/trips';

const style = require('./index.scss');
const cx = classNames.bind(style);
const {
  resetCurrentBudgetList
} = budgetActions;

const {
  axiosGetCurrentTripApi,
} = tripActions;

interface IOwnProps {
  currentTripInfo: ITrip
  onSetIsOpenSpendingLayer: (isOpen: boolean) => void
  currentBudgetInfo: IBudget
  activeDateFilter: string
  userId: string
}

const SpendingLayer: React.FC<IOwnProps> = ({
  currentTripInfo,
  onSetIsOpenSpendingLayer,
  currentBudgetInfo,
  activeDateFilter,
  userId
}) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [activeAmoutType, setActiveAmoutType] = useState(AMOUNT_TYPE.READY_MONEY);
  const [activeCategory, setActiveCategory] = useState(EXPENSE_CATEGORY.FOOD.type);
  const [day, setDay] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpenSaveLayer, setIsOpenSaveLayer] = useState(false);
  const [saveLayerState, setSaveLayerState] = useState<any>({ openHandler: setIsOpenSaveLayer });

  const getDday = () => {
    if (activeDateFilter === EXPENSE_DATE_FILTER.ALL) {
      return 1;
    }

    if (activeDateFilter === EXPENSE_DATE_FILTER.READY) {
      return EXPENSE_DATE_FILTER.READY;
    }

    const dateRange = getDatesBetween(new Date(currentTripInfo.startDate), new Date(currentTripInfo.endDate)).map(item => item.toLocaleDateString());

    return dateRange.indexOf(activeDateFilter) + 1
  }

  const save = () => {
    const day = getDday();

    const budgetInfo = {
      id,
      tripId: currentTripInfo.id,
      type: EXPENSE_TYPE.SPENDING,
      title,
      amount: displayValue,
      amountType: activeAmoutType,
      currency: currentTripInfo.country.currency,
      category: activeCategory,
      day,
      date: Date.now()
    };

    setIsSaving(true);

    axios.post('/api/budget/save', { budgetInfo }).then(() => {
      // setIsOpenSaveLayer(true);
      // setIsSaving(false);
      // setSaveLayerState({
      //   ...saveLayerState,
      //   layerType: LAYER_TYPE.TEXT,
      //   title: '저장을 성공하였습니다.',
      //   text: '즐거운 여행 되세요.',
      //   handler: handleSuccessSave
      // });

      const tripInfo = {
        ...currentTripInfo,
        totalAmount: Number(currentTripInfo.totalAmount) + Number(displayValue)
      }

      axios.post('/api/profile/save', { userId, currentTripInfo: tripInfo }).then(() => {
        setIsOpenSaveLayer(true);
        setIsSaving(false);
        setSaveLayerState({
          ...saveLayerState,
          layerType: LAYER_TYPE.TEXT,
          title: '저장을 성공하였습니다.',
          text: '즐거운 여행 되세요.',
          handler: handleSuccessSave
        });

        dispatch(axiosGetCurrentTripApi({ userId, id: currentTripInfo.id }));
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
      setDisplayValue(amount.toString());
      setActiveAmoutType(amountType);
      setActiveCategory(category);
      setDay(day);
    }
  }, [currentBudgetInfo]);

  return (
    <div className={cx('spending_layer')}>
      <ExpenseInfo
        type={EXPENSE_TYPE.SPENDING}
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
        type={EXPENSE_TYPE.SPENDING}
        title={title}
        onSetDisplayValue={setDisplayValue}
        onSetIsOpenLayer={onSetIsOpenSpendingLayer}
        onSetTitle={setTitle}
        onSave={save}
      />
      {isSaving && (
        <p>저장중...</p>
      )}
      {isOpenSaveLayer && (
        <Layer {...saveLayerState} />
      )}
    </div>
  );
};

export default hot(SpendingLayer);
