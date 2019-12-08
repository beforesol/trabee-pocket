import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { ROUTE_PATH } from '@config/routes';

const style = require('./detailHeader.scss');
const cx = classNames.bind(style);

const DetailHeader = ({ }) => (
  <div className={cx('detail_header')}>
    <Link to={ROUTE_PATH.HOME.url} className={cx('btn_home')} />
  </div>
);

DetailHeader.propTypes = {
};

export default hot(DetailHeader);
