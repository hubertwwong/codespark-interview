const csv = require('csv-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// db name
const dbName = 'studentTest';

// helper function to get CSV
// wraped in a promise to use async syntax.
function getCSV (filename, headers=false) {
  return new Promise((resolve, reject) => {
    let results = [];
    fs.createReadStream(filename)
    .pipe(csv())
    .on('headers', (data) => {
      // push headers if flag is set.
      if (headers) {
        results.push(data);
      }
    })
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve(results);
    });
  });
};

// merge 2 csv to create the document to insert into db.
function createStudentDoc(students, tests) {
  // Simple guard to check if there was any data before doing anything.
  if (!students || !tests) {
    return null;
  }

  // making a copy so i don't modify the originals.
  let studentsF = students.slice(); // storing students
  let testsF = tests.slice();       // storing test averages. student averages are being stored on the student.
  let coursesH = {};
  let coursesF = [];
  // let testNames = tests[0];
  let testDatesH = tests[1];        // Object of {TestName: TestDate}.
  // probably should check these if they exist instead of just assuming.

  // Hashing test data
  let testsDataH = {};
  for (let i = 2 ; i < tests.length ; i += 1) {
    // Removing the student id fromm the row.
    // Only storing test data.
    let row = Object.assign({}, testsF[i]);
    delete row['Student ID'];
    
    // Write to the hash.
    testsDataH[testsF[i]['Student ID']] = row;
  }

  // Merging test into students
  for (let i = 0 ; i < studentsF.length ; i += 1) {
    let scores = testsDataH[studentsF[i]['ID']];
    // Insert tests into student.
    studentsF[i].tests = scores;

    // calculations
    let count = 0;
    let total = 0;
    for (let [key, value] of Object.entries(scores)) {
      // Get score. Making sure its an int.
      let score = 0; 
      if (parseInt(value)) {
        score = parseInt(value);
      }
      
      // course calc
      if (coursesH[key] === undefined) {
        coursesH[key] = {
          studentTotal: score,
          studentCount: 1
        }
      }
      coursesH[key]['studentTotal'] += score;
      coursesH[key]['studentCount'] += 1;

      // user calc
      if (score) {
        total += score;
      }

      // test count. used for average.
      count += 1;
    }

    // storing student average
    studentsF[i].average = total/count;
  }

  // calculate course averages
  for (let [key, value] of Object.entries(coursesH)) {
    coursesH[key]['average'] = value['studentTotal'] / value['studentCount'];
    coursesH[key]['name'] = key;
    coursesH[key]['date'] = testDatesH[key];  // Storing the date of the test.
    coursesF.push(coursesH[key]);
  }

  console.log("ccc");
  console.log(coursesF);
  console.log("ccc");

  return {
    coursesF,
    studentsF
  };
}

// This is a dumb insert statement.
// No business logic.
async function writeColl(collName, data, index) {
  try {
    let client = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

    // create a collection
    const col = client.db(dbName).collection(collName);

    // add an index.
    // e.g. {yourKey: 1}
    if (index) {
      col.createIndex(index, {unique:true});
    }

    // write to collections
    console.log(data);
    try {
      await col.insertMany(data);
    } catch(err) {
      // ignore error about duplicate entries.
    }

    client.close();
  } catch(err) {
    console.error(err);
  }
}

// main function
async function run() {
  try {
    console.log('> Reading students from CSV');
    let students = await getCSV('students.csv');
    console.log('> Reading grades from CSV');
    let grades = await getCSV('grades.csv', true);

    console.log('> Create documents to insert');
    let docs = createStudentDoc(students, grades);
    //console.log(docs);
    if (docs) {
      await writeColl('students', docs.studentsF, {FirstName: 1, LastName: 1});
      await writeColl('tests', docs.coursesF, {name: 1});
    }
  } catch(err) {
    console.error(err);
  }
}
run();