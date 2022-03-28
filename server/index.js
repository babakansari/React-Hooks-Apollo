import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret, algorithms: ['RS256'],
  credentialsRequired: false
}));

// expressJwt({ secret:  process.env.JWT_SECRET, algorithms: ['RS256'] });

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

const typeDefs = gql(`
    type Query {
        User: String
    }
`);

const resolvers = {
    Query: {
        User: () => 'User A'
    }
};

//const server = new ApolloServer({typeDefs, resolvers});


app.listen(port, () => console.info(`Server started on port ${port}`));