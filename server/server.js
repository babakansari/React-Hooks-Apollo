import fs from 'fs';
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import resolvers from './resolvers.js';
import jwt from 'jsonwebtoken';
import db from './db.js';
import Settings from './Settings.js';
import OktaMiddleWare from './authorization/oktaMiddleWare.js';
import BasicMiddleWare from './authorization/basicMiddleWare.js';

const app = express();

app.use(cors({ origin: Settings.corsOrigin, credentials: true }), bodyParser.json(), (req, res, next) => {
  const authorizationType = req.get('authorizationType');
  switch (authorizationType) {
    case 'babak-basic-auth':
      BasicMiddleWare(req, res, next);
      break;
    case 'babak-okta-auth':
      OktaMiddleWare(req, res, next);
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
  const token = jwt.sign({sub: user.id, username}, Settings.jwtSecret);
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

app.listen(Settings.port, () => console.info(`Server started on port ${Settings.port}`));