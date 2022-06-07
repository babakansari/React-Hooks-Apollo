import expressJwt from 'express-jwt';
import Settings from '../Settings.js';

const BasicMiddleWare = expressJwt({
    secret: Settings.jwtSecret, algorithms: ['HS256'],
    credentialsRequired: false
  });

export default BasicMiddleWare;