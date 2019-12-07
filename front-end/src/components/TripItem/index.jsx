import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@config/routes';

const style = require('./tripItem.scss');
const cx = classNames.bind(style);

const TripItem = ({ tripInfo, layoutType }) => {
  const layoutClassName = layoutType.toLowerCase();

  return (
    <Link to={`${ROUTE_PATH.DETAIL.url}/${tripInfo.id}`} className={cx('trip_item', layoutClassName)}>
      <div className={cx('inner')} style={{ backgroundImage: `url(${tripInfo.imageUrl})` }} >
        <div className={cx('info')}>
          <strong className={cx('title')}>{tripInfo.title}</strong>
          <p className={cx('date')}>{tripInfo.startDate} ~ {tripInfo.endDate}</p>
          <div>
            <img src={tripInfo.country.imgUrl} className={cx('country_image')} />
          </div>
          <p className={cx('expense')}>₩476,708</p>
        </div>
      </div>
    </Link>
  );
};

TripItem.propTypes = {
  tripInfo: PropTypes.object,
  layoutType: PropTypes.string
};

export default hot(TripItem);
