1. `git clone https://github.com/johncmunson/todo-app`
2. `npm install`
3. `npm run migrate`
4. `npm run seed`
5. `npm start`


Todo:
- standardize on module.exports = { a } rather than module.exports = a
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
- update openapi.yml with the /tags endpoints, and the new functionality related to the "relations" query parameter
- castValues only supports top level values, but now that relational data is supported it might need to become recursive
- might need to define schemas in a separate directory (perhaps inside of models) so that they can be composed together inside `static get jsonSchema`. Another option is to try calling Category.jsonSchema inside of Todo.jsonSchema
  - https://github.com/Vincit/objection.js/issues/478#issuecomment-353737928
- Add the ability to create todo/tag associations

Reading:
- https://en.wikipedia.org/wiki/Representational_state_transfer#Relationship_between_URI_and_HTTP_methods
- https://softwareengineering.stackexchange.com/questions/266695/rest-full-design-recommended-approach-for-fetching-related-entities
- https://stackoverflow.com/questions/6324547/how-to-handle-many-to-many-relationships-in-a-restful-api
- https://restful-api-design.readthedocs.io/en/latest/intro.html
- https://tools.ietf.org/html/rfc5023
- https://tools.ietf.org/html/rfc7386
