const express = require('express');
const bodyParser = require('body-parser');

//graphQL

// This package will handle GraphQL server requests and responses
// for you, based on your schema.

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { authenticate } = require('./authentication');
const schema = require('./schema');

const connectMongo = require('./mongo-connector');
const start = async () => {
  const mongo = await connectMongo();

  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mongo.Users);
    return {
      context: { mongo, user },
      schema
    };
  };
  //Starting express here
  const app = express();

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      passHeader: `'Authorization': 'bearer token-stepas@gmail.com'`
    })
  );

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

  const PORT = process.env.PORT || '3000';

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
};

start();
