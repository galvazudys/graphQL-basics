const express = require('express');
const bodyParser = require('body-parser');

//graphQL

// This package will handle GraphQL server requests and responses
// for you, based on your schema.

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./schema');

//Starting express here
const app = express();

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
