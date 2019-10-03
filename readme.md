# Intro

This is a submission for code spark for the full stack interview.



## General folder layout

1. Backend contains the express mongo backend.
2. Frontend contains a simple create react app that pull data from 2 end points on the backend.



## Installation steps

### Frontend

```
cd frontend/scores
npm install
npm start
```

### Backend

```
cd backend
npm install
npm start
```

### Restoring from the db

```
cd backend/db/dump
mongorestore --db studentTest studentTest
```

or

```
cd backend
npm install
cd src/import
node importStudents.js
```

## Usage

### Backend

1. Point the browser to http://localhost:3100/students/students or http://localhost:3100/students/tests

### Frontend

1. Point the browser to http://localhost:3000



## What I finished

### Backend
 
1. Express app that is connected to a simple mongodb that grabs data from 2 tables. 
2. Changed the port from 3000 to 3100 to not conflict with the front end.
3. Added an import script that reads csv files and sets up the 2 tables.
4. In general I tried to do all of the calculations in the import script so the frontend does not need to do the calculations.
5. Use csv-parser to make it easier to parse the CSV.
6. Use CORS middleware to allow cross origins.

### Backend database layout

Database Name
```
studentTest
```

Collection Names

```
students - Contains student data and test scores.
tests - Contains the needed data to generate the table header. Contains test name, date, test average, test totals, test count.
```

### Frontend

1. Simple create react app to display the data.
2. Got the table format roughly correct. In terms of what data shows up at what location.
2. Tried to break out the components into things that seem logical.
3. Components
   1. Header - Was suppose to be the code spark logo.
   2. Scores - The main table. I broke it down to the header and rows.
4. Use stateless components when appropriate.



## What was missing

1. No CSS styling. Was trying to stay in the 1 day guideline. Ran out of time. I don't have photoshop and have not really used it much to be honest.
2. Because of 1, no responsive design.
3. Don't have an AWS account. So I'm not able to host the site.
4. No tests. 



## Things I could improve on.

1. Use of env variables.
2. Use of a constant.js file so constants are all defined in one place.
3. Feel like the mongodb tables could have better named and the format could have been better.
4. I think there are still a few console log statements in there.



## Misc

Thank you for taking the time to review my submission.