import React from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import { VIEW_TYPE } from '@constants/type';
import { useDispatch } from 'react-redux';
import { loginActions } from '@modules/login';
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_LOGIN_CLIENT_ID } from '@constants/type/googleApi';
import { userActions } from '@modules/users';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {
  onChangeLayout: (type: string) => void;
}

const { setIsLogin } = loginActions;
const { setUserId } = userActions;

const Header: React.FC<IOwnProps> = ({ onChangeLayout }) => {
  const dispatch = useDispatch();

  const handleClickViewType = (type: string) => {
    onChangeLayout(type);
  };

  const handleClickLogout = () => {
    dispatch(setIsLogin({ isLogin: false }));
    dispatch(setUserId({
      userId: ''
    }));
  };

  return (
    <div className={cx('header')}>
      <div className={cx('header_area')}>
        <GoogleLogout
          clientId={GOOGLE_LOGIN_CLIENT_ID}
          render={renderProps => (
            <button type="button" className={cx('btn_login')} onClick={renderProps.onClick}><span className={cx('blind')}>로그인</span></button>
          )}
          onLogoutSuccess={handleClickLogout}
        />
        {/* <button type="button" className={cx('btn_login')} onClick={handleClickLogout}><span className={cx('blind')}>로그인</span></button> */}
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
    </div >
  );
};

export default hot(Header);
