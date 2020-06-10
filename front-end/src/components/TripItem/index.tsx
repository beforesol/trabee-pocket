import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@config/routes';
import { ITrip } from '../../types/api';
import Img from '@components/Img';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  tripInfo: ITrip
  layoutType: string
}

const TripItem: React.FC<IOwnProps> = ({ tripInfo, layoutType }) => {
  const layoutClassName = layoutType.toLowerCase();

  return (
    <Link to={`${ROUTE_PATH.DETAIL.url}/${tripInfo.id}`} className={cx('trip_item', layoutClassName)}>
      <div className={cx('inner')}>
        <Img src={tripInfo.imageUrl} useLazyLoad={true} className={cx('trip_image')}/>
        <div className={cx('info')}>
          <strong className={cx('title')}>{tripInfo.title}</strong>
          <p className={cx('date')}>{tripInfo.startDate} ~ {tripInfo.endDate}</p>
          <div>
            <Img src={tripInfo.country.imgUrl} className={cx('country_image')} useLazyLoad={true} />
          </div>
          <p className={cx('expense')}>₩476,708</p>
        </div>
      </div>
    </Link>
  );
};

export default hot(TripItem);
