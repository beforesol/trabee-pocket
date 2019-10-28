export const SET_USER_ID = 'SET_USER_ID';

export function setUserId(value) {
  return {
    type: SET_USER_ID,
    userId: value
  };
}
