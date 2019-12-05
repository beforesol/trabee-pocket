import {
  combineReducers,
} from 'redux';
import { user } from '@modules/users';
import { trip } from '@modules/trips';
import { home } from '@modules/home';

// reducer setting.
export default function createReducer(asyncReducer) {
  return combineReducers({
    user,
    trip,
    home
  });
}
