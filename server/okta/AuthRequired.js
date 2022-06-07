import OktaJwtVerifier from '@okta/jwt-verifier';

const AuthRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }
  const OKTA_DOMAIN = process.env.OKTA_DOMAIN;
  const AUTH_SERVER_ID = process.env.AUTH_SERVER_ID;
  const accessToken = match[1];
  const audience = 'api://default';
  const issuer = `https://${OKTA_DOMAIN}/oauth2/${AUTH_SERVER_ID}`;
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

export default AuthRequired;