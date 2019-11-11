const { Model } = require('objection')
const { DBErrors } = require ('objection-db-errors')

class Base extends DBErrors(Model) {
  static create(data) {
    return this.query().insertAndFetch(data)
  }
  static readAll() {
    return this.query()
  }
  static readById(id) {
    return this.query().findById(id).throwIfNotFound()
  }
  static update(id, data) {
    return this.query().updateAndFetchById(id, data).throwIfNotFound()
  }
  static patch(id, data) {
    const newResource = this.fromJson(data)
    return this.query().patchAndFetchById(id, newResource).throwIfNotFound()
  }
  static delete(id) {
    return this.query().findById(id).delete().throwIfNotFound()
  }
}

module.exports = Base
