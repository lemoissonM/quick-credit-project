/* eslint-disable linebreak-style */
export const checkEmail = (email) => {
  const checker = new RegExp('^[a-zA-Z0-9_]{3,}@.*(\\.[a-zA-Z]{2,4})$');
  const result = checker.test(email);
  return result;
};

export const checkSpaces = (value) => {
  const checker = new RegExp('^\\s{1,}$');
  const result = checker.test(value);
  return result;
};
