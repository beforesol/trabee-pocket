import {
  combineReducers,
} from 'redux';
import { budget } from '@modules/budget';
import { user } from '@modules/users';
import { trip } from '@modules/trips';
import { home } from '@modules/home';

// reducer setting.
export default function createReducer() {
  return combineReducers({
    budget,
    user,
    trip,
    home
  });
}
