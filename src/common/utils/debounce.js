export const debounce = (fn, delay = 300) => {
  let timeout = null;
  return (...params) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(fn.bind(undefined, ...params), delay);
  }
};

export const throttle = (fn, delay = 300) => {
  let timeout = null;
  return (...params) => {
    if (timeout) return;
    timeout = setTimeout(() => {
      fn.call(undefined, ...params);
      timeout = null;
    }, delay);
  }
};