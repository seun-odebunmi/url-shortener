# url-shortener
An application that converts a long url to a shortened url.

# Tech Stack:

## Front-end
- Angular

## Back-end
- Node.js using Express as server
- mySQL as database
- Sequelize as ORM

The short url consists of 6 random characters taken from a sample of 64 possible characters (A-Z, a-z, 0-9, _-)
This generated code is persisted in the database and tied to the long url that was converted.
An MD5 hash will be generated for the long url and encoded with base64 and the first 6 characters will be sliced from it and stored.

## Improvements
- A recursive function to generate the short code was implemented to solve an issue where the same short code is generated for a different long url.
- Length validation for the long url is put in place to avoid very long urls that cannot be stored in the db.
- To avoid the same long url being stored in the db, a validation is put in place to check for existing urls to avoid duplication.
