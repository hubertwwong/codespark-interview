const express = require('express');
// const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')

// Express
const app = express();
const port = 3100;
// Changing the default port to not collide with react.

// Mongo
const dbHost = 'localhost';
const dbName = 'studentTest';
const dbPort = 27017;
const dbUrl = `mongodb://${dbHost}:${dbPort}`

// middleware.
// allow all origins for cors
// This will alllow the create react app to work.
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}))
// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
// Using this to get async await.
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

// Controllers
const students = require('./controllers/students');

// Routes
app.get('/', asyncMiddleware(students.getHello));
app.get('/students/students', asyncMiddleware(students.getStudents));
app.get('/students/tests', asyncMiddleware(students.getTests));

async function run() {
  try {
    // Start mongo.
    let client = await MongoClient.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    let db = client.db(dbName);
    
    // Using locals to pass db client around to be used.
    app.locals.client = client;
    app.locals.db = db;

    // testing
    //let d = await db.collection('students').find().toArray();
    //console.log(db);
    //console.log(d);

    // Start express
    app.listen(port, () => console.log(`Express listening on port ${port}`));
  } catch(err) {
    console.error(err);
  }
}
run();