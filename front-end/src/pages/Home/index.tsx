import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { tripActions } from '@modules/trips';
import { Header, TripItem } from '@components/index.ts';
import { VIEW_TYPE } from '@constants/type';

import { useSelector, useDispatch } from 'react-redux';
import { HOME, homeActions } from '@modules/home';
import { USER, userActions } from '@modules/users';

import { ROUTE_PATH } from '@config/routes';
import { ITrip } from '../../types/api';

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
  } = useSelector((state: any) => state[HOME]);
  const [layout, setLayout] = useState(VIEW_TYPE.TYPE_1);
  const { userId } = useSelector((state: any) => state[USER]);
  const [beforeTripList, setBeforeTripList] = useState<ITrip[]>([]);
  const [afterTripList, setAfterTripList] = useState<ITrip[]>([]);

  useEffect(() => {
    dispatch(setUserId({
      userId: 'jeonsol'
    }));
  }, []);

  const handleChangeLayout = (type: string) => {
    setLayout(type);
  };

  useEffect(() => {
    dispatch(resetCurrentTripInfo());
    return () => {
      dispatch(resetHomeTripInfo());
    };
  }, []);

  useEffect(() => {
    if (userId) {
      if (isTripsLoaded) {
        const beforeTripList: ITrip[] = [];
        const afterTripList: ITrip[] = [];
        const nowDate = new Date().getTime();

        tripList.forEach((trip: ITrip) => {
          const endDate = new Date(trip.endDate).getTime();

          if (nowDate > endDate) {
            beforeTripList.push(trip);
          } else {
            afterTripList.push(trip);
          }
        });

        setBeforeTripList([...beforeTripList]);
        setAfterTripList([...afterTripList]);
      } else {
        dispatch(axiosGetAllTripApi({ userId }));
      }
    }
  }, [isTripsLoaded, userId]);

  const layoutClassName = layout.toLowerCase();

  return (
    <>
      {isTripsLoaded ? (
        isFailed ? (
          <p>실패..</p>
        ) : (
          <div className={cx('home')} >
            <Header onChangeLayout={handleChangeLayout} />
            <div className={cx('history_info')}>지금까지 <em className={cx('num')}>{afterTripList.length + beforeTripList.length}</em>개 나라를 여행 했습니다.</div>
            <div className={cx('section')}>
              <p className={cx('title')}>다가오는 여행<em className={cx('num')}>{afterTripList.length}</em></p>
              {!!afterTripList.length && (
                <ul className={cx('trip_list', layoutClassName)}>
                  {afterTripList.map((item: ITrip) => (
                    <li className={cx('list')} key={item.id}>
                      <TripItem layoutType={layout} tripInfo={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={cx('section')}>
              <p className={cx('title')}>지난 여행<em className={cx('num')}>{beforeTripList.length}</em></p>
              {!!beforeTripList.length && (
                <ul className={cx('trip_list', layoutClassName)}>
                  {beforeTripList.map((item: ITrip) => (
                    <li className={cx('list')} key={item.id}>
                      <TripItem layoutType={layout} tripInfo={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link to={`${ROUTE_PATH.DETAIL.url}/${NEW_ROUTER_ID}`} className={cx('btn_add')}>새 여행 만들기</Link>
          </div >)
      ) : (
        <p>로딩중...</p>
      )}
    </>
  );
};

export default hot(Home);
