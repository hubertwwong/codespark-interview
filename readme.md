# Intro

This is a submission for code spark for the full stack interview.

Frontend and express....

## checklist

1. Data in mongodb
2. export mongodb.
3. express endpoint
4. react frontend.
5. document the stuff.

## Things I could improve on.

1. Use of env variables.
2. Use of a constant.js file so constants are all defined in one place.


## Restoring from the db

```
cd backend/db/dump
mongorestore --db studentTest studentTest
```

## Install notes

### Install mongodb on ubuntu.

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

```
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
```