/* eslint-disable linebreak-style */

export function validateToken(token) {
  if (token && token.startsWith('Bearer ')) {
    return token.slice(7, token.length);
  }
  return token;
}

export function tokenError(res) {
  return res.status(401).json({
    status: 401,
    message: 'The authorization Token provided is not valid, please provide a valid token in the authorization header',
  });
}
export function TokenUnauthorized(res) {
  return res.status(403).json({
    status: 403,
    message: 'You are forbiden to make this request, you don\'t have enough permission, please contact your administrator for more details',
  });
}
export function notValidToken(res) {
  return res.status(401).json({
    status: 401,
    message: 'The authorization Token provided is not valid, please provide a valid token in the authorization header',
  });
}
