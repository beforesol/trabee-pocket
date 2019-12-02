import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { useDispatch } from 'react-redux';
import { tripActions } from '../../modules/trips';

export const NEW_ROUTER_ID = 'new';

const style = require('./home.scss');
const cx = classNames.bind(style);
const { resetCurrentTripInfo } = tripActions;

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCurrentTripInfo());
  }, []);

  return (
    <div className={cx('home')}>
      <Link to={`/detail/${NEW_ROUTER_ID}`} className={cx('btn_add')}>새 여행 만들기</Link>
    </div>
  );
};

export default hot(Home);
