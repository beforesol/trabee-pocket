import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { ROUTE_PATH } from '@config/routes';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  title: string;
}

const DetailHeader: React.FC<IOwnProps> = ({ title }) => (
  <div className={cx('detail_header')}>
    <Link to={ROUTE_PATH.HOME.url} className={cx('btn_home')} />
    <strong className={cx('title')}>{title}</strong>
  </div>
);

export default hot(DetailHeader);
