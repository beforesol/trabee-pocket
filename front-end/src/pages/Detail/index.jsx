import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Tab, Profile } from '../../components';
import { TAB_INFO } from '../../components/Tab';
import classNames from 'classnames/bind';

const style = require('./detail.scss');
const cx = classNames.bind(style);

const Detail = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState(TAB_INFO.PROFILE.name);

  const updateTab = tabName => {
    setActiveTab(tabName);
    console.log(tabName);
  };

  return (
    <div className={cx('detail')}>
      <Tab updateTab={updateTab} />
      {
        activeTab === TAB_INFO.PROFILE.name && (
          <Profile match={match} history={history} onUpdateTab={updateTab} />
        )
      }
    </div>
  );
};

Detail.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  currentTripInfo: PropTypes.object,
};

const mapStateToProps = state => ({
  currentTripInfo: state.trip.currentTripInfo
});

const mapDispatchToProps = dispatch => ({
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(Detail));
