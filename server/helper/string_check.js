/* eslint-disable linebreak-style */
export const checkEmail = (email) => {
  const checker = new RegExp('^[a-zA-Z0-9_]{3,}@.*(\\.[a-zA-Z]{2,4})$');
  return checker.test(email);
};

export const checkSpaces = (value) => {
  const checker = new RegExp('^\\s{1,}$');
  return checker.test(value);
};
