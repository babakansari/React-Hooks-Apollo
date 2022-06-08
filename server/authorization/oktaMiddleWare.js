import OktaJwtVerifier from '@okta/jwt-verifier';
import Settings from '../Settings.js';

const OktaMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401).send('Unauthorized access');
    return next('Unauthorized access: Not a bearer token');
  }

  const accessToken = match[1];
  const audience = Settings.audience;
  const issuer = `https://${Settings.okta_domain}/oauth2/${Settings.auth_server_id}`;
  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer
  });

  return (
    oktaJwtVerifier
      .verifyAccessToken(accessToken, audience)
      .then((jwt) => {
        req.user = jwt.claims.sub;
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      })
  );
};

export default OktaMiddleWare;