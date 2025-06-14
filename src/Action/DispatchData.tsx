export function dispatchData(params: any, type: any) {
  return (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: type,
        data: params,
      });
      resolve(true);
});
};
}