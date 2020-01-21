1. `git clone https://github.com/johncmunson/todo-app`
2. `npm install`
3. `npm run migrate`
4. `npm run seed`
5. `npm start`


Todo:
- add error responses to openapi.yaml
  - probably just need the common ones like 404, plus a default
  - not feasible to document all possible error responses
- nodemon dev server
- consider using this approach to loading dotenv config instead of requiring dotenv in multiple spots in the source code
  - https://github.com/motdotla/dotenv#preload
- write unit tests and strive for 100% test coverage
  - may need to use separate jest configurations for unit/integration tests. this can be accomplished with the --config cli flag
- version the api
- setup the standard tooling for a Node project
  - eslint
  - prettier
  - husky (run tests + eslint + prettier as githooks)
