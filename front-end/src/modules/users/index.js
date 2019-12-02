import { createAction, handleActions } from 'redux-actions';
/**
 * onSuccess Api
 */

// initial State
const userState = {
  userId: 'jeonsol'
};

// Domain
export const USER = 'user';

/**
 * Actions
 */

const SET_USER_ID = 'SET_USER_ID';

/**
 * Reducer
 */
const userReducer = {
  [SET_USER_ID]: (state, action) => {
    const { userId } = action.payload;

    return {
      ...state,
      userId
    };
  }
};

export const userActions = {
  setUserId: createAction(SET_USER_ID)
};

export const user = handleActions(userReducer, userState);
