/* eslint-disable linebreak-style */

export function validateToken(token) {
  let newToken = '';
  if (token) {
    if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
      newToken = token.slice(7, token.length);
      return newToken;
    }
  }
  return token;
}

export function tokenError(res) {
  return res.status(401).json({
    status: 401,
    message: 'The Token you provided in the authorization header is not a valid token, please check it and provide a correct one',
  });
}
export function TokenUnauthorized(res) {
  return res.status(403).json({
    status: 403,
    message: 'You don\'t have enough permissions to make this request',
  });
}
export function notValidToken(res) {
  return res.status(401).json({
    status: 401,
    message: 'The Token you provided in the authorization header is not a valid token, please check it and provide a correct one',
  });
}
