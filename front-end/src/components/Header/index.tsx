import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { VIEW_TYPE } from '@constants/type';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  onChangeLayout: any;
}

const Header: React.FC<IOwnProps> = ({ onChangeLayout }) => {
  const handleClickViewType = (type: any) => {
    onChangeLayout(type);
  };

  return (
    <div className={cx('header')}>
      <div className={cx('header_area')}>
        <button className={cx('btn_login')}><span className={cx('blind')}>로그인</span></button>
        <h1 className={cx('title')}>TRABEE POCKET</h1>
        <div className={cx('right_area')}>
          <button className={cx('btn', 'btn_upgrade')}><span className={cx('blind')}>업그레이드</span></button>
          <button className={cx('btn', 'btn_setting')}><span className={cx('blind')}>설정</span></button>
        </div>
      </div>
      <div className={cx('view_type')}>
        {Object.values(VIEW_TYPE).map((item, index) => (
          <button
            key={item}
            type="button"
            className={cx('btn', `type_0${index + 1}`)}
            onClick={() => handleClickViewType(item)}
          >
            <span className={cx('blind')}>VIEW_TYPE</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default hot(Header);
