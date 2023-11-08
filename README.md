## Description

Today you will use the Tate Modern art data set to create an API that allows the user to create users, view art data and create a comment for each art entry.
Endpoints:
- /api/art - GET, view the entire art data set
- /api/art/ID - GET, view art data by ID
- /api/art/ID/comments - POST, add a comment for an art data entry
- /api/users - POST, create user
- /api/users - GET, see all users

## Installation

```bash
$ install postgres database
$ import database using pgadmin tool 
  or from cli
    /Library/PostgreSQL/16/pgAdmin 4.app/Contents/SharedSupport/pg_restore --host "localhost" --port "5434" --username "postgres" --no-password --dbname "demo" --verbose "/Users/ramonl/gantri_bk"
$ npm install

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
