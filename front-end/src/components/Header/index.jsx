import * as React from 'react';

import classNames from 'classnames/bind';
const style = require('./header.scss');
const cx = classNames.bind(style);

const Header = ({ type }) => {
  return (
    <div className={cx('header')} style={{'backgroundColor': type}}>
      header
    </div>
  );
};

export default Header;
