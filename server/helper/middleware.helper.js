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
    success: false,
    message: 'The authorization Token provided is not valid',
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
    message: 'The Token provided is not valid',
  });
}
