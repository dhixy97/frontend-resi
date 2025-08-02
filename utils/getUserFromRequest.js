import jwt from 'jsonwebtoken';

export function getUserFromRequest(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'No token provided' };
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded, error: null };
  } catch (err) {
    return { user: null, error: 'Invalid token', err };
  }
}
