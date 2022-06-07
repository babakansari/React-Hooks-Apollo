import OktaJwtVerifier from '@okta/jwt-verifier';
import Settings from '../Settings.js';

const OktaMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
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
      // eslint-disable-next-line promise/always-return
      .then((jwt) => {
        req.jwt = jwt;
        // eslint-disable-next-line promise/no-callback-in-promise
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      })
  );
};

export default OktaMiddleWare;