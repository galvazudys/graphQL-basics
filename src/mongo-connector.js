const { MongoClient } = require('mongodb');

//connect to mongodb
const MONGO_URL = 'mongodb://localhost:27017/hackernews';

//create collection of links and return it
module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {
    Links: db.collection('links'),
    Users: db.collection('users')
  };
};
