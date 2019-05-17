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
    message: 'The authorization token provided is invalid',
  });
}
export function TokenUnauthorized(res) {
  return res.status(403).json({
    status: 403,
    message: 'You are not authorized to access this resource',
  });
}
export function notValidToken(res) {
  return res.status(401).json({
    status: 401,
    message: 'The authorization token provided is invalid',
  });
}
