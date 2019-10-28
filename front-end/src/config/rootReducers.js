import {
  combineReducers,
} from 'redux';
import user from '../store/user/reducer';

// reducer setting.
export default function createReducer(asyncReducer) {
  return combineReducers({
    user,
  });
}
