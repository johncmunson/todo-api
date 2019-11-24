const fs = require('fs')
const path = require('path')
const util = require('util')

const unlink = util.promisify(fs.unlink)

// Jest runs this function once after all of the test suites have run
module.exports = async (globalConfig) => {
  await unlink(path.join(__dirname, '/../test-db.sqlite3'))
}
