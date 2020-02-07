import axios from 'axios';

const API_DOMAIN = '';

const get = async (url: string, params: object = {}) => {
  const uri = API_DOMAIN + url;

  try {
    const result = await axios.get(uri, params);
    const { data } = result;

    return data;
  } catch (e) {
    return console.error('API [GET] Error', e);
  }
};

const post = async (url: string, params: object = {}) => {
  const uri = API_DOMAIN + url;

  try {
    const result = await axios.post(uri, params);
    const { data } = result;

    return data;
  } catch (e) {
    return console.error('API [GET] Error', e);
  }
};

// TODO: param modeling
export const getCurrentTripApi = (param: any) => async () => {
  const URL_PROFILE = '/api/profile';

  return post(URL_PROFILE, param);
};

export const getHomeApi = (param: any) => async () => {
  const URL_HOME = '/api/home';

  return post(URL_HOME, param);
};

export const getCurrentBudgetApi = (param: any) => async () => {
  const URL_BUDGET = '/api/budget';

  return post(URL_BUDGET, param);
};
