import { Link } from 'react-router-dom';
import * as React from 'react';

import classNames from 'classnames/bind';
const style = require('./home.scss');
const cx = classNames.bind(style);

class Home extends React.Component {
  render() {
    return (
      <div className={cx('home')}>
        <Link to="/select" className={cx('btn_add')}>새 여행 만들기</Link>
      </div>
    );
  }
}

export default Home;
