import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import {
  Tab,
  Profile,
  Currency,
  Expense,
  Layer,
  SpendingLayer,
  IncomeLayer,
  Select
} from '@components/index.ts';
import { LAYER_TYPE } from '@components/Layer';
import { TAB_INFO } from '@components/Tab';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from 'react-redux';
import { USER, userActions } from '@modules/users';
import { TRIP, tripActions } from '@modules/trips';
import { BUDGET, budgetActions } from '@modules/budget';
import { NEW_ROUTER_ID } from '@pages/Home';

import { EXPENSE_DATE_FILTER } from '@constants/type';

const style = require('./index.scss');
const cx = classNames.bind(style);
const { setUserId } = userActions;
const {
  axiosGetCurrentTripApi,
  resetCurrentTripInfo,
} = tripActions;
const {
  getCurrentBudgetInfo,
  resetCurrentBudgetInfo
} = budgetActions;

interface IOwnProps {
  match: any;
  history: any;
}

const Detail: React.FC<IOwnProps> = ({ match, history }) => {
  const { userId } = useSelector((state: any) => state[USER]);
  const {
    isLoaded: isTripLoaded,
    isFailed,
    currentTripInfo,
  } = useSelector((state: any) => state[TRIP]);
  const {
    currentBudgetInfo,
  } = useSelector((state: any) => state[BUDGET]);
  const dispatch = useDispatch();

  const [id, setId] = useState(match.params.id);
  const [activeTab, setActiveTab] = useState(TAB_INFO.CURRENCY.name);
  const [isOpenLayer, setIsOpenLayer] = useState(false);
  const [isOpenSpendingLayer, setIsOpenSpendingLayer] = useState(false);
  const [isOpenIncomeLayer, setIsOpenIncomeLayer] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeDateFilter, setDateActiveFilter] = useState(EXPENSE_DATE_FILTER.ALL);

  const updateTab = (tabName: any) => {
    setActiveTab(tabName);
  };

  const handleClickReportTab = () => {
    setActiveTab(TAB_INFO.PROFILE.name);
  };

  const handleClickSpending = () => {
    setIsOpenSpendingLayer(true);
    dispatch(resetCurrentBudgetInfo());
  };

  const handleClickIncome = () => {
    setIsOpenIncomeLayer(true);
    dispatch(resetCurrentBudgetInfo());
  };

  const handleClickExpenseItem = (id: any) => {
    dispatch(getCurrentBudgetInfo({ id }));
    setIsOpenSpendingLayer(true);
  };

  useEffect(() => {
    dispatch(setUserId({
      userId: 'jeonsol'
    }));

    return () => {
      dispatch(resetCurrentTripInfo());
    };
  }, []);

  useEffect(() => {
    if (id !== NEW_ROUTER_ID) {
      setShowSelect(false);
      if (!isTripLoaded) {
        dispatch(axiosGetCurrentTripApi({ userId, id }));
      } else {
        setIsLoaded(true);
      }
    } else {
      setShowSelect(true);
      setIsLoaded(true);
    }
  }, [isTripLoaded]);

  useEffect(() => {
    setId(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (activeTab === TAB_INFO.PROFILE.name) setIsOpenLayer(true);
  }, [activeTab]);

  return (!isLoaded ? (
    isFailed ? (<p>실패하였습니다</p>) : (<p>로딩중...</p>)
  ) : (
      <div className={cx('detail')}>
        <Tab
          match={match}
          updateTab={updateTab}
          activeTab={activeTab}
          onClickSpending={handleClickSpending}
          onClickIncome={handleClickIncome}
        />
        {activeTab === TAB_INFO.PROFILE.name && (
          <Profile
            currentTripInfo={currentTripInfo}
            id={id}
            history={history}
            onUpdateTab={updateTab}
            userId={userId}
            onSetShowSelect={setShowSelect}
          />
        )}
        {activeTab === TAB_INFO.CURRENCY.name && (
          <Currency />
        )}
        {activeTab === TAB_INFO.EXPENSE.name && (
          <Expense
            activeDateFilter={activeDateFilter}
            onSetDateActiveFilter={setDateActiveFilter}
            currentTripInfo={currentTripInfo}
            onClickExpenseItem={handleClickExpenseItem}
          />
        )}
        {activeTab === TAB_INFO.REPORT.name && (
          <>
            {isOpenLayer && (
              <Layer
                title={'PRO UPGRADE'}
                text={'PRO로 업그레이드 해보세요. 여행 경비 리포트를 볼 수 있고, 지출 내역을 PDF, CSV 파일로 내보내기 할 수 있습니다.'}
                layerType={LAYER_TYPE.TEXT}
                openHandler={setIsOpenLayer}
                handler={handleClickReportTab}
              />
            )}
          </>
        )}
        {showSelect && (
          <Select
            onSetShowSelect={setShowSelect}
          />
        )}
        {isOpenSpendingLayer && (
          <SpendingLayer
            activeDateFilter={activeDateFilter}
            currentTripInfo={currentTripInfo}
            onSetIsOpenSpendingLayer={setIsOpenSpendingLayer}
            currentBudgetInfo={currentBudgetInfo}
          />
        )}
        {!isOpenIncomeLayer && (
          <IncomeLayer
            activeDateFilter={activeDateFilter}
            currentTripInfo={currentTripInfo}
            onSetIsOpenIncomeLayer={setIsOpenIncomeLayer}
            currentBudgetInfo={currentBudgetInfo}
          />
        )}
      </div>
    ));
};

export default hot(Detail);
