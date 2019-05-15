/* eslint-disable linebreak-style */

export function validateToken(token) {
  if (token && token.startsWith('Bearer ')) {
    return token.slice(7, token.length);
  }
  return token;
}

export function tokenError(res) {
  return res.status(401).json({
    success: false,
    message: 'The authorization Token provided is not valid, please provide a valid token in the authorization header',
  });
}
export function TokenUnauthorized(res) {
  return res.status(401).json({
    success: false,
    message: 'You are not authorized to make this request',
  });
}
export function notValidToken(res) {
  return res.status(401).json({
    success: false,
    message: 'The authorization Token provided is not valid, please provide a valid token in the authorization header',
  });
}
