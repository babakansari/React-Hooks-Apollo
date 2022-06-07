import fs from 'fs';
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import resolvers from './resolvers.js';
import jwt from 'jsonwebtoken';
import db from './db.js';
import dotenv from 'dotenv';
import AuthRequired from './okta/AuthRequired.js';

dotenv.config({ path: './.env' });

const port = process.env.APOLLO_SERVER_PORT;
const jwtSecret = Buffer.from(process.env.APOLLO_JWT_SECRET[1], 'base64');
const corsOrigin = process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(',');

const app = express();
const jwtMiddleware = expressJwt({
  secret: jwtSecret, algorithms: ['HS256'],
  credentialsRequired: false
});
//console.log(` ${jwtMiddleTier}`);
// app.use(cors({ origin: corsOrigin, credentials: true }), bodyParser.json(), expressJwt({
//   secret: jwtSecret, algorithms: ['HS256'],
//   credentialsRequired: false
// }));
//app.use(cors());
app.use(cors({ origin: corsOrigin, credentials: true }), bodyParser.json(), (req, res, next) => {
  //console.log(`${JSON.stringify(util.inspect(req))}`);
  //console.log(` AUTH: ${JSON.stringify(req.get('authorizationType'))}`);
  // console.dir(req.rawHeaders);
  //next()
  //
  const authorizationType = req.get('authorizationType');
  switch (authorizationType) {
    case 'babak-basic-auth':
      jwtMiddleware(req, res, next);
      break;
    case 'babak-okta-auth':
      AuthRequired(req, res, next);
      break;
    default:
      next();
  }
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  const user = db.users.list().find((user) => user.username === username);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id, username}, jwtSecret);
  res.send({token});
});

app.get('/users', (req, res) => {
  res.json({
    messages: [
      {
        date: new Date(),
        text: 'I AM LEGEND',
      },
      {
        date: new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'BEEP BOOP BEEP BOOP!',
      },
    ],
  });
});

const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf8'}  ));

let apolloServer = null;
async function startServer() {
    const context = ({req}) => (
      {
        user: req.user
      }
    );
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app, path: '/graphql'});
}
startServer();

app.listen({port}, () => console.info(`Server started on port ${port}`));