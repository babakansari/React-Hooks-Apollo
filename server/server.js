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
dotenv.config({ path: './.env' });

const port = process.env.APOLLO_SERVER_PORT;
const jwtSecret = Buffer.from(process.env.APOLLO_JWT_SECRET[1], 'base64');
const corsOrigin = process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(',');

const app = express();

app.use(cors({ origin: corsOrigin, credentials: true }), bodyParser.json(), expressJwt({
  secret: jwtSecret, algorithms: ['HS256'],
  credentialsRequired: false
}));

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