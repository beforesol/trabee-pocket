import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import PropTypes from 'prop-types';

import { Tab, Profile, Currency, Expense, Report } from '../../components';
import { TAB_INFO } from '../../components/Tab';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from 'react-redux';
import { USER, userActions } from '../../modules/users';

const style = require('./detail.scss');
const cx = classNames.bind(style);
const { setUserId } = userActions;

const Detail = ({ match, history }) => {
  const { userId } = useSelector(state => state[USER]);

  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [activeTab, setActiveTab] = useState(TAB_INFO.PROFILE.name);

  const updateTab = tabName => {
    setActiveTab(tabName);
    console.log(tabName);
  };

  useEffect(() => {
    dispatch(setUserId({
      userId: 'jeonsol'
    }));
  }, []);

  useEffect(() => {
    setId(match.params.id);
  }, [match.params.id]);

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
          <Report />
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
