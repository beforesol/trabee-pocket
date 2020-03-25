import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import ExpenseInfo from '../ExpenseInfo';
import IncomeInfo from '../IncomeInfo';
import ExpenseInput from '../ExpenseInput';
import { EXPENSE_TYPE } from '@constants/type';
import axios from 'axios';
import { LAYER_TYPE } from '@components/Layer';
import { budgetActions } from '@modules/budget';
import { Layer } from '@components/index';
import { EXPENSE_DATE_FILTER } from '@constants/type';
import { getDatesBetween } from '@utils/index';

const style = require('./index.scss');
const cx = classNames.bind(style);

const {
  resetCurrentBudgetList
} = budgetActions;

interface IOwnProps {
  currentTripInfo: any
  onSetIsOpenIncomeLayer: any
  currentBudgetInfo: any
  activeDateFilter: string
}

const IncomeLayer: React.FC<IOwnProps> = ({
  currentTripInfo,
  onSetIsOpenIncomeLayer,
  currentBudgetInfo,
  activeDateFilter
}) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpenLayer, setIsOpenLayer] = useState(false);
  const [layerState, setLayerState] = useState<any>({ openHandler: setIsOpenLayer });

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
      type: EXPENSE_TYPE.INCOME,
      title,
      amount: displayValue,
      currency: currentTripInfo.country.currency,
      day,
      date: Date.now()
    };

    setIsSaving(true);

    axios.post('/api/budget/save', { budgetInfo }).then(() => {
      setIsOpenLayer(true);
      setIsSaving(false);
      setLayerState({
        ...layerState,
        layerType: LAYER_TYPE.TEXT,
        title: '저장을 성공하였습니다.',
        text: '즐거운 여행 되세요.',
        handler: handleSuccessSave
      });
    }).catch(() => {
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
      onSetIsOpenIncomeLayer(false);
      dispatch(resetCurrentBudgetList());
    };
  };

  useEffect(() => {
    const {
      id,
      title,
      amount,
    } = currentBudgetInfo;

    if (id) {
      setId(id);
      setTitle(title);
      setDisplayValue(amount);
    }
  }, [currentBudgetInfo]);

  return (
    <div className={cx('income_layer')}>
      <ExpenseInfo
        type={EXPENSE_TYPE.INCOME}
        country={currentTripInfo.country}
        displayValue={displayValue}
        activeAmoutType={'activeAmoutType'}
        onSetActiveAmountType={() => { }}
      />
      <IncomeInfo />
      <ExpenseInput
        type={EXPENSE_TYPE.INCOME}
        title={title}
        onSetDisplayValue={setDisplayValue}
        onSetIsOpenLayer={onSetIsOpenIncomeLayer}
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
}

export default hot(IncomeLayer);
