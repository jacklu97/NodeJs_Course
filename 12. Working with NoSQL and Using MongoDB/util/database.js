require('dotenv').config()
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MONGO_PASS = process.env.MONGO_PASS

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(`mongodb+srv://my_user:${MONGO_PASS}@cluster0.oh4oq5k.mongodb.net/?retryWrites=true&w=majority`)
    .then(client => {
      console.log('Connected to Mongo!')
      _db = client.db();
      callback()
    })
    .catch(err => {
      console.log(err)
      throw err
    });
}

const getDb = () => {
  if (_db) return _db;
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;