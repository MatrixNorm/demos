export const timeoutPromise = function(period) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), period);
  });
};
