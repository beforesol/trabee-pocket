import {
  SET_USER_ID
} from './action';

export const initialState = {
  userId: 'jeonsol'
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case SET_USER_ID: {
    const userId = action.userId;

    return {
      ...state,
      userId
    };
  }
  default: {
    return state;
  }
  }
}
