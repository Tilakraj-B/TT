require('../loadEnvironments')
const { MongoClient } = require('mongodb');
const connString = process.env.DB_URI ;

console.log(connString);
const client = new MongoClient(connString, {useNewUrlParser : true , useUnifiedTopology : true});




try{
  client.connect();
}
catch(err){
  console.error('Error while connecting to MongoDB : ',err);
  console.log('Error while connecting to MongoDB');
}


// let db = client.db("2023-2024");



module.exports = client;