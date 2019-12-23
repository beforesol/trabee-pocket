import { createAction, handleActions } from 'redux-actions';
/**
 * onSuccess Api
 */
import { getCurrentBudgetApi } from '@api';
import Budget from '@model/budget';

// initial State
const budgetState = {
  isLoaded: false,
  isFailed: false,
  budgetList: [],
  currentBudgetInfo: { ...new Budget() }
};

// Domain
export const BUDGET = 'budget';

/**
 * Actions
 */

const AXIOS_GET_CURRENT_BUDGET_API = `${BUDGET}/AXIOS_GET_CURRENT_BUDGET_API`;
const AXIOS_GET_CURRENT_BUDGET_API_SUCCESS = `${BUDGET}/AXIOS_GET_CURRENT_BUDGET_API_SUCCESS`;
const AXIOS_GET_CURRENT_BUDGET_API_FAIL = `${BUDGET}/AXIOS_GET_CURRENT_BUDGET_API_FAIL`;

const RESET_CURRENT_BUDGET_LIST = `${BUDGET}/RESET_CURRENT_BUDGET_LIST`;

const GET_CURRENT_BUDGET_INFO = `${BUDGET}/GET_CURRENT_BUDGET_INFO`;
const RESET_CURRENT_BUDGET_INFO = `${BUDGET}/RESET_CURRENT_BUDGET_INFO`;


/**
 * Reducer
 */
const budgetReducer = {
  [AXIOS_GET_CURRENT_BUDGET_API_SUCCESS]: (state, action) => {
    // Success일때 데이터 모델링
    const { payload } = action;
    const budgetList = payload.map(item => new Budget().setData(item));

    return {
      ...state,
      isLoaded: true,
      isFailed: false,
      budgetList,
    };
  },
  [AXIOS_GET_CURRENT_BUDGET_API_FAIL]: state => ({
    ...state,
    isLoaded: true,
    isFailed: true,
    tripList: [],
  }),
  [RESET_CURRENT_BUDGET_LIST]: state => ({
    ...state,
    isLoaded: false,
    tripList: [],
  }),
  [GET_CURRENT_BUDGET_INFO]: (state, action) => {
    const { id } = action.payload;

    return {
      ...state,
      currentBudgetInfo: state.budgetList.find(item => item.id === id)
    };
  },
  [RESET_CURRENT_BUDGET_INFO]: state => ({
    ...state,
    currentBudgetInfo: { ...new Budget() }
  }),
};

export const budgetActions = {
  axiosGetCurrentBudgetApiSuccess: createAction(AXIOS_GET_CURRENT_BUDGET_API_SUCCESS),
  axiosGetCurrentBudgetApiFail: createAction(AXIOS_GET_CURRENT_BUDGET_API_FAIL),
  axiosGetCurrentBudgetApi: createAction(AXIOS_GET_CURRENT_BUDGET_API, data => ({
    api: getCurrentBudgetApi(data),
    onSuccess: budgetActions.axiosGetCurrentBudgetApiSuccess,
    onFail: budgetActions.axiosGetCurrentBudgetApiFail,
  })),
  resetCurrentBudgetList: createAction(RESET_CURRENT_BUDGET_LIST),
  getCurrentBudgetInfo: createAction(GET_CURRENT_BUDGET_INFO),
  resetCurrentBudgetInfo: createAction(RESET_CURRENT_BUDGET_INFO)
};

export const budget = handleActions(budgetReducer, budgetState);
