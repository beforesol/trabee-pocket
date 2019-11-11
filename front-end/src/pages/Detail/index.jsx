import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Tab } from '../../components/presentations';
import { TAB_INFO } from '../../components/presentations/Tab';
import classNames from 'classnames/bind';

const style = require('./detail.scss');
const cx = classNames.bind(style);

const Detail = () => {
  const [activeTab, setActiveTab] = useState(TAB_INFO.PROFILE.name);

  const updateTab = tabName => {
    setActiveTab(tabName);
    console.log(tabName);
  };

  return (
    <div className={cx('detail')}>
      {activeTab}
      <Tab updateTab={ updateTab }/>
    </div>
  );
};

Detail.propTypes = {
  match: PropTypes.object,
  currentTripInfo: PropTypes.object,
};

const mapStateToProps = state => ({
  currentTripInfo: state.trip.currentTripInfo
});

const mapDispatchToProps = dispatch => ({
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(Detail));
