import passport from 'passport';

export const authenticate = (req, res, next) => {
  console.log('Authorization Header:', req.headers.authorization); // Temporary debug logging
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      return res.status(401).json({ message: 'Error validating token', error: error });
    }
    if (!user) {
      const message = info && info.name === 'TokenExpiredError' ? 'Token expired' : 'Token missing or malformed';
      return res.status(401).json({ message: message, user: user });
    }
    req.user = user;
    next();
  })(req, res, next);
};
