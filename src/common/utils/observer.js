const eventPool = {};

export const listen = (eventName, ...callbacks) => {
  if (!eventPool[eventName]) eventPool[eventName] = [];
  eventPool[eventName].push(...callbacks);
}

export const unlisten = (eventName, ...callbacks) => {
  if (!eventPool[eventName]) return;

  for (const key in eventPool[eventName]) {
    if (callbacks.indexOf(eventPool[eventName][key]) != -1) {
      delete eventPool[eventName][key];
    }
  }
}

export const emit = (eventName, ...params) => {
  if (!eventPool[eventName]) return;

  eventPool[eventName].forEach(callback => {
    if (typeof callback === "function") {
      callback.apply(undefined, params);
    }
  });
}