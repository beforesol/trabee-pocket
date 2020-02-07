import { createAction, handleActions } from 'redux-actions';
/**
 * onSuccess Api
 */
import { getCurrentBudgetApi } from '@api/index.ts';
import Budget, { IBudgetInfo } from '@model/budget';

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
  [AXIOS_GET_CURRENT_BUDGET_API_SUCCESS]: (state: any, action: any) => {
    // Success일때 데이터 모델링
    const { payload } = action;
    const budgetList = payload.map((item: IBudgetInfo) => new Budget().setData(item));

    return {
      ...state,
      isLoaded: true,
      isFailed: false,
      budgetList,
    };
  },
  [AXIOS_GET_CURRENT_BUDGET_API_FAIL]: (state: any) => ({
    ...state,
    isLoaded: true,
    isFailed: true,
    tripList: [],
  }),
  [RESET_CURRENT_BUDGET_LIST]: (state: any) => ({
    ...state,
    isLoaded: false,
    tripList: [],
  }),
  [GET_CURRENT_BUDGET_INFO]: (state: any, action: any) => {
    const { id } = action.payload;

    return {
      ...state,
      currentBudgetInfo: state.budgetList.find((item: Budget) => item.id === id)
    };
  },
  [RESET_CURRENT_BUDGET_INFO]: (state: any) => ({
    ...state,
    currentBudgetInfo: { ...new Budget() }
  }),
};

export const budgetActions: any = {
  axiosGetCurrentBudgetApiSuccess: createAction(AXIOS_GET_CURRENT_BUDGET_API_SUCCESS),
  axiosGetCurrentBudgetApiFail: createAction(AXIOS_GET_CURRENT_BUDGET_API_FAIL),
  axiosGetCurrentBudgetApi: createAction(AXIOS_GET_CURRENT_BUDGET_API, (data: any) => ({
    api: getCurrentBudgetApi(data),
    onSuccess: budgetActions.axiosGetCurrentBudgetApiSuccess,
    onFail: budgetActions.axiosGetCurrentBudgetApiFail,
  })),
  resetCurrentBudgetList: createAction(RESET_CURRENT_BUDGET_LIST),
  getCurrentBudgetInfo: createAction(GET_CURRENT_BUDGET_INFO),
  resetCurrentBudgetInfo: createAction(RESET_CURRENT_BUDGET_INFO)
};

export const budget = handleActions(budgetReducer, budgetState);
