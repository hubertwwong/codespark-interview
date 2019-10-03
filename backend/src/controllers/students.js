async function getHello(req, res, next) {
  try {
    res.send('Hello!');
  } catch(err) {
    console.error(err);
  }
}

async function getStudents(req, res, next) {
  try {
    const db = req.app.locals.db;
    const results = await db.collection('students').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
  } catch(err) {
    console.error(err);
  }
}

async function getTests(req, res, next) {
  try {
    const db = req.app.locals.db;
    const results = await db.collection('tests').find().toArray();
    console.log(results);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  getHello,
  getStudents,
  getTests
}