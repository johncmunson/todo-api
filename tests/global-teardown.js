// Jest runs this function once after all of the test suites have run, but
// before the test environment teardown method runs for each test suite.
module.exports = async (globalConfig) => {
  await __knex.destroy()
}
