import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { hot } from 'react-hot-loader/root';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {

}

const Login: React.FC<IOwnProps> = () => {
  

  return (
    <div className={cx('login')}>
      login
    </div>
  );
};

export default hot(Login);
