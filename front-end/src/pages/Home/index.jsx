import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { useDispatch } from 'react-redux';
import { tripActions } from '../../modules/trips';
import { Header, TripItem } from '../../components';
import { VIEW_TYPE } from '../../constants/type/viewType';

export const NEW_ROUTER_ID = 'new';

const style = require('./home.scss');
const cx = classNames.bind(style);
const { resetCurrentTripInfo } = tripActions;

const Home = () => {
  const dispatch = useDispatch();

  const [layout, setLayout] = useState(VIEW_TYPE.TYPE_1);

  const handleChangeLayout = type => {
    setLayout(type);
    console.log(type);
  };

  useEffect(() => {
    dispatch(resetCurrentTripInfo());
  }, []);

  const layoutClassName = layout.toLowerCase();

  return (
    <div className={cx('home')}>
      <Header onChangeLayout={handleChangeLayout} />
      <div className={cx('history_info')}>지금까지 <em className={cx('num')}>4</em>개 나라를 여행 했습니다.</div>
      <div className={cx('section')}>
        <p className={cx('title')}>다가오는 여행<em className={cx('num')}>4</em></p>
        <ul className={cx('trip_list', layoutClassName)}>
          {[1, 2, 3].map(item => (
            <li className={cx('list')} key={item}>
              <TripItem layoutType={layout} />
            </li>
          ))}
        </ul>
      </div>
      <div className={cx('section')}>
        <p className={cx('title')}>지난 여행<em className={cx('num')}>4</em></p>
        <ul className={cx('trip_list', layoutClassName)}>
          {[1, 2, 3].map(item => (
            <li className={cx('list')} key={item}>
              <TripItem layoutType={layout} />
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/detail/${NEW_ROUTER_ID}`} className={cx('btn_add')}>새 여행 만들기</Link>
    </div>
  );
};

export default hot(Home);
