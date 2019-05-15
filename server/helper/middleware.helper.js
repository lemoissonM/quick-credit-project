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
    message: 'The authorization Token provided is not valid, please provide a valid token in the authorization header',
  });
}
export function TokenUnauthorized(res) {
  return res.status(403).json({
    status: 403,
    message: 'You are forbiden to make this request, you don\'t have enough permission, please contact your administrator for more inquieries',
  });
}
export function notValidToken(res) {
  return res.status(401).json({
    status: 401,
    message: 'The authorization Token provided is not valid, please provide a valid token in the authorization header',
  });
}
