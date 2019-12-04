import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const style = require('./tripItem.scss');
const cx = classNames.bind(style);

const TripItem = ({ layoutType }) => {
  const layoutClassName = layoutType.toLowerCase();

  return (
    <Link to="#" className={cx('trip_item', layoutClassName)}>
      <div className={cx('inner')} style={{ backgroundImage: 'url(http://cfile216.uf.daum.net/image/1129580549315BAA01850A)' }} >
        <div className={cx('info')}>
          <strong className={cx('title')}>건지</strong>
          <p className={cx('date')}>2019.12.19 ~ 2019.1.29</p>
          <img src="" alt="" className={cx('country_image')} />
          <p className={cx('expense')}>₩476,708</p>
        </div>
      </div>
    </Link>
  );
};

TripItem.propTypes = {
  layoutType: PropTypes.string
};

export default hot(TripItem);
