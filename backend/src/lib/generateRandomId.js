export const generateRandomId = (min, max, length) => {
  let randomId = '';

  for (let index = 0; index < length; index++) {
    randomId += Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return randomId;
};
