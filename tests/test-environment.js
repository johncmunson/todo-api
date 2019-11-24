const NodeEnvironment = require('jest-environment-node')
const request = require('supertest')
const { app } = require('../index')
const knex = require('../db')

// Jest creates a new test environment for each test suite
class TestEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
    this.config = config
    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
  }

  async setup() {
    await super.setup()
    this.global.app = app
    this.global.request = request
  }

  async teardown() {
    await knex.destroy()
    await super.teardown()
  }

  // This needs to be here apparently, because the documentation says so.
  // But the docs don't say what it's actually used for...
  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = TestEnvironment
