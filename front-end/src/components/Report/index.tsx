import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';

const style = require('./index.scss');
const cx = classNames.bind(style);

const Report = () => (
  <div className={cx('report')}>
    Report
  </div>
);

export default hot(Report);
