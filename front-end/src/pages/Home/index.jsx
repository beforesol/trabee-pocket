import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { tripActions } from '@modules/trips';
import { Header, TripItem } from '@components';
import { VIEW_TYPE } from '@constants/type/viewType';

import { useSelector, useDispatch } from 'react-redux';
import { HOME, homeActions } from '@modules/home';
import { USER, userActions } from '@modules/users';

export const NEW_ROUTER_ID = 'new';

const style = require('./home.scss');
const cx = classNames.bind(style);
const { resetCurrentTripInfo } = tripActions;
const {
  axiosGetAllTripApi,
  resetHomeTripInfo
} = homeActions;
const { setUserId } = userActions;

const Home = () => {
  const dispatch = useDispatch();
  const {
    isLoaded: isTripsLoaded,
    isFailed,
    tripList,
  } = useSelector(state => state[HOME]);
  const [layout, setLayout] = useState(VIEW_TYPE.TYPE_1);
  const { userId } = useSelector(state => state[USER]);

  useEffect(() => {
    dispatch(setUserId({
      userId: 'jeonsol'
    }));
  }, []);


  const handleChangeLayout = type => {
    setLayout(type);
    console.log(type);
  };

  useEffect(() => {
    dispatch(resetCurrentTripInfo());
    return () => {
      dispatch(resetHomeTripInfo());
    };
  }, []);

  useEffect(() => {
    userId && !isTripsLoaded && dispatch(axiosGetAllTripApi({ userId }));
  }, [isTripsLoaded, userId]);

  const layoutClassName = layout.toLowerCase();
  const tripCount = (tripList.length > 0) ? tripList.length : '';

  return (
    <>
      {
        isTripsLoaded ? (
          isFailed ? (
            <p>실패..</p>
          ) : (
            <div className={cx('home')} >
              <Header onChangeLayout={handleChangeLayout} />
              <div className={cx('history_info')}>지금까지 <em className={cx('num')}>{tripCount}</em>개 나라를 여행 했습니다.</div>
              <div className={cx('section')}>
                <p className={cx('title')}>다가오는 여행<em className={cx('num')}>{tripCount}</em></p>
                {
                  tripCount && (
                    <ul className={cx('trip_list', layoutClassName)}>
                      {tripList.map(item => (
                        <li className={cx('list')} key={item.id}>
                          <TripItem layoutType={layout} tripInfo={item} />
                        </li>
                      ))}
                    </ul>
                  )
                }
              </div>
              <div className={cx('section')}>
                <p className={cx('title')}>지난 여행<em className={cx('num')}>{tripCount}</em></p>
                {
                  tripCount && (
                    <ul className={cx('trip_list', layoutClassName)}>
                      {tripList.map(item => (
                        <li className={cx('list')} key={item.id}>
                          <TripItem layoutType={layout} tripInfo={item} />
                        </li>
                      ))}
                    </ul>
                  )
                }
              </div>
              <Link to={`/detail/${NEW_ROUTER_ID}`} className={cx('btn_add')}>새 여행 만들기</Link>
            </div >
          )
        ) : (
          <p>로딩중...</p>
        )
      }
    </>
  );
};

export default hot(Home);
