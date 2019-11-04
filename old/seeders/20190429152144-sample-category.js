module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Category',
      [
        {
          name: 'Home'
        },
        {
          name: 'Work'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Category', null, {})
  }
}
