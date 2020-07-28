import { createAction, handleActions } from 'redux-actions';

const loginState = {
  isLogin: false
};

export const LOGIN = 'login';

const SET_IS_LOGIN = `${LOGIN}/SET_IS_LOGIN`;


const loginReducer = {
  [SET_IS_LOGIN]: (state: any, action: any) => {
    // Success일때 데이터 모델링
    const { payload } = action;

    return {
      ...state,
      isLogin: payload.isLogin
    };
  }
};

export const loginActions: any = {
  setIsLogin: createAction(SET_IS_LOGIN)
};

export const login = handleActions(loginReducer, loginState);
