import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { hot } from 'react-hot-loader/root';
import { GoogleLogin } from 'react-google-login';
import { loginActions } from '@modules/login';
import { useDispatch } from 'react-redux';
import { GOOGLE_LOGIN_CLIENT_ID } from '@constants/type/googleApi';
import { userActions } from '@modules/users';

const style = require('./index.scss');
const cx = classNames.bind(style);

interface IOwnProps {

}

const { setIsLogin } = loginActions;
const { setUserId } = userActions;

const Login: React.FC<IOwnProps> = () => {
  const dispatch = useDispatch();

  const responseGoogleSucess = (response: any) => {
    dispatch(setIsLogin({ isLogin: true }));
    dispatch(setUserId({
      userId: response.googleId
    }));
    console.log(response);
  };

  const responseGoogleFail = (response: any) => {
    dispatch(setIsLogin({ isLogin: false }));
    console.log(response);
  };

  return (
    <div className={cx('login')}>
      <div className={cx('login_wrapper')}>
        <h1>로그인</h1>
        <div className={cx('btn_area')}>
          <GoogleLogin
            className='btn_google_login'
            clientId={GOOGLE_LOGIN_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={responseGoogleSucess}
            onFailure={responseGoogleFail}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  );
};

export default hot(Login);
