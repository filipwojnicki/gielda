# Giełda

Templates(boilerplates) that I used:
  - for backend https://github.com/mesaugat/express-api-es6-starter
  - for frontend https://github.com/zeit/next.js

## Installation

Node version that i used: v12.13.0
We need also Yarn / NPM.
Database what was use through ORM: MySql

First clone the repo and setup enviroment files for frontend and backend.

### Backend

/backend/.env-example copy to .env
Setup database connection.
Setup a Json Web Token secret.

Example command to generate secret
```sh
$ node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Install all needed packages
```sh
yarn
```

Next we need to build a project
```sh
yarn build
```

Migrate database
```sh
yarn migrate
```

Seed database (we can also setup a basic amounts of instruments by the count property)
/backend/src/seeds/instruments-seed.js

But after change in the seed we need to build a project again. (I have some problems with babel and knex
, so I decide to first build the project and next run build knex file )

To seed database we can run a command
```sh
yarn seed
```

Run the application
```sh
yarn start:dev
```

Test the application working properly, go to http://127.0.0.1:8848/api/


### Frontend

By default it will be sufficient to copy the file in the frontend
/frontend/.env-example copy to .env

Install dependencies
```sh
yarn
```

Run the application
```sh
yarn dev
```

Test the application, go to http://localhost:3000/

When we open the application for the first time, we need to wait a moment to socket proxy get a first data from Future Processing socket, so it will can take up to 30 seconds.
