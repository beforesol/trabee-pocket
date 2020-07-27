import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import ExpenseInfo from '../ExpenseInfo';
import IncomeInfo from '../IncomeInfo';
import ExpenseInput from '../ExpenseInput';
import ExpenseRateEdit from '../ExpenseRateEdit';
import { EXPENSE_TYPE } from '@constants/type';
import axios from 'axios';
import { LAYER_TYPE } from '@components/Layer';
import { budgetActions } from '@modules/budget';
import { Layer } from '@components/index';
import { EXPENSE_DATE_FILTER } from '@constants/type';
import { getDatesBetween } from '@utils/index';
import { ITrip, IBudget } from '../../../types/api';
import { tripActions } from '@modules/trips';

const style = require('./index.scss');
const cx = classNames.bind(style);

const {
  setCurrentTripInfo
} = tripActions;

const {
  resetCurrentBudgetList
} = budgetActions;

interface IOwnProps {
  currentTripInfo: ITrip
  onSetIsOpenIncomeLayer: (isOpen: boolean) => void
  currentBudgetInfo: IBudget
  activeDateFilter: string
  userId: string
}

const IncomeLayer: React.FC<IOwnProps> = ({
  currentTripInfo,
  onSetIsOpenIncomeLayer,
  currentBudgetInfo,
  activeDateFilter,
  userId
}) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpenSaveLayer, setIsOpenSaveLayer] = useState(false);
  const [saveLayerState, setSaveLayerState] = useState<any>({ openHandler: setIsOpenSaveLayer });
  const [isOpenRateLayer, setIsOpenRateLayer] = useState(false);
  const [rateLayerState, setRateLayerState] = useState<any>({ openHandler: setIsOpenRateLayer });
  const [rate, setRate] = useState(currentTripInfo.country.currency.rate);

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
      const { currency } = currentTripInfo.country;

      dispatch(setCurrentTripInfo({
        country: {
          currency: {
            ...currency,
            rate
          }
        }
      }));

      axios.post('/api/profile/save', { userId, currentTripInfo }).then(() => {
        setIsOpenSaveLayer(true);
        setIsSaving(false);
        setSaveLayerState({
          ...saveLayerState,
          layerType: LAYER_TYPE.TEXT,
          title: '저장을 성공하였습니다.',
          text: '즐거운 여행 되세요.',
          handler: handleSuccessSave
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
      onSetIsOpenIncomeLayer(false);
      dispatch(resetCurrentBudgetList());
    };
  };

  const handleClickEdit = () => {
    setIsOpenRateLayer(true);
    setRateLayerState({
      ...rateLayerState,
      layerType: LAYER_TYPE.COMPONENT,
      handler: () => { }
    });
  }

  useEffect(() => {
    const {
      id,
      title,
      amount,
    } = currentBudgetInfo;

    if (id) {
      setId(id);
      setTitle(title);
      setDisplayValue(amount.toString());
    }
  }, [currentBudgetInfo]);

  return (
    <div className={cx('income_layer')}>
      <ExpenseInfo
        type={EXPENSE_TYPE.INCOME}
        country={currentTripInfo.country}
        displayValue={displayValue}
      />
      <IncomeInfo
        currency={currentTripInfo.country.currency.en}
        rate={rate}
        onClickEdit={handleClickEdit}
      />
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
  );
}

export default hot(IncomeLayer);
