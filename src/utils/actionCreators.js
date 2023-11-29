const status = ["REQUEST", "SUCCESS", "FAILURE"];

export const createAsyncAction = (name, payloadCreator = (p) => p) => {
  const actionMethods = {};

  status.forEach((s) => {
    let a = `${name}_${s}`;
    let subAction = (payload) => ({
      type: a,
      payload: payloadCreator(payload),
    });

    actionMethods[s] = a;
    actionMethods[s.toLowerCase()] = subAction;

    return subAction;
  });

  return actionMethods;
};

export const createSyncAction = (type, payload, other = {}) => {
  return {
    type,
    payload,
    ...other,
  };
};
