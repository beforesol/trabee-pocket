const middleware = (store: any) => (next: any) => async (action: any) => {
  let result;
  const payload = action.payload;
  const nextAction = action.nextAction;

  if (payload && payload.api) {
    payload.api()
      .then((e: any) => store.dispatch(payload.onSuccess(e)))
      .catch((err: any) => store.dispatch(payload.onFail(err)));
  } else if (nextAction) {
    const actionType = typeof nextAction;

    switch (actionType) {
      case 'function':
        store.dispatch(nextAction());
        break;
      case 'object':
        store.dispatch(nextAction);
        break;
      default:
        result = next(action);
        console.log(`[Video Api Middleware] Next Action Not Find ${actionType} Type`);
        break;
    }
  } else {
    switch (action.type) {
      default:
        result = next(action);
        break;
    }
  }

  return result;
};

export default middleware;
