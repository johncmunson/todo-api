1. `git clone https://github.com/johncmunson/todo-app`
2. `npm install`
3. `npm run migrate`
4. `npm run seed`
5. `npm start`


Todo:
- add error responses to openapi.yaml
  - probably just need the common ones like 404, plus a default
  - not feasible to document all possible error responses
- follow up with [this issue](https://github.com/OAI/OpenAPI-Specification/issues/2057) regarding defaulting values to null in OpenAPI
- nodemon dev server
- use cross-env to set NODE_ENV (or maybe use dotenv and a dotfile?)
- may need to use separate jest configurations for unit/integration tests. this can be accomplished with the --config cli flag
- version the api
- use [this](https://stackoverflow.com/questions/59011575/how-to-close-express-server-inside-jest-afterall-hook/59011973?noredirect=1#comment104271965_59011973) as an example of how to ditch supertest for axios
