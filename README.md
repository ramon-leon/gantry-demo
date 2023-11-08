## Description

Today you will use the Tate Modern art data set to create an API that allows the user to create users, view art data and create a comment for each art entry.
Endpoints:
- /api/art - GET, view the entire art data set
- /api/art/ID - GET, view art data by ID
- /api/art/ID/comments - POST, add a comment for an art data entry
- /api/users - POST, create user
- /api/users - GET, see all users

Rest API were developed using the following tech stack / framework

* NodeJS / Typescript
* NestJS framework
* Native Postgres (recommend using ORM like TypeORM / Prisma)
* /api/art - GET, view the entire art data set 
  * recommend using pagination in the absence of filter in the requirements
  * using 2 queries is not optimal - we can possibly store the comments in the art table
  * or using a stored procedure to return results to reduce the number of db calls

## Preinstallation an notes

```bash
Following postgres database configuration may need to be changed (see .env for details)
    PG_PORT=5434
    PG_DATABASE=demo
```

## Installation

```bash
$ install postgres database
$ install node
$ import database from backup (gantri_backup) using pgadmin tool 
  or from cli
/Library/PostgreSQL/16/pgAdmin 4.app/Contents/SharedSupport/pg_restore --host "localhost" --port "5433" --username "postgres" --no-password --dbname "demo" --format=d --verbose "/Users/ramonl/IdeaProjects/untitled3/gantri-demo/gantri_backup"$ npm install

```

## Running the app

```bash
# development
$ npm run start

server will run on part 3000
entrypoint main.ts

```

## Troubleshooting

```bash

```
