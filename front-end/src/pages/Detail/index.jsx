import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import PropTypes from 'prop-types';

import { Tab, Profile, Currency, Expense, Layer } from '@components';
import { LAYER_TYPE } from '@components/Layer';
import { TAB_INFO } from '@components/Tab';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from 'react-redux';
import { USER, userActions } from '@modules/users';

const style = require('./detail.scss');
const cx = classNames.bind(style);
const { setUserId } = userActions;

const Detail = ({ match, history }) => {
  const { userId } = useSelector(state => state[USER]);

  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [activeTab, setActiveTab] = useState(TAB_INFO.PROFILE.name);
  const [isOpenLayer, setIsOpenLayer] = useState(false);

  const updateTab = tabName => {
    setActiveTab(tabName);
  };

  const handleClickReportTab = () => {
    setActiveTab(TAB_INFO.PROFILE.name);
  };

  useEffect(() => {
    dispatch(setUserId({
      userId: 'jeonsol'
    }));
  }, []);

  useEffect(() => {
    setId(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (activeTab === TAB_INFO.PROFILE.name) setIsOpenLayer(true);
  }, [activeTab]);

  return (
    <div className={cx('detail')}>
      <Tab updateTab={updateTab} activeTab={activeTab} />
      {
        activeTab === TAB_INFO.PROFILE.name && (
          <Profile id={id} history={history} onUpdateTab={updateTab} userId={userId} />
        )
      }
      {
        activeTab === TAB_INFO.CURRENCY.name && (
          <Currency />
        )
      }
      {
        activeTab === TAB_INFO.EXPENSE.name && (
          <Expense />
        )
      }
      {
        activeTab === TAB_INFO.REPORT.name && (
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
        )
      }
    </div>
  );
};

Detail.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default hot(Detail);
