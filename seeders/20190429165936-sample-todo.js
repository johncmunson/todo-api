module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Todo',
      [
        {
          name: 'Pickup dry cleaning',
          note: 'Don\'t forget to ask about the blue shirt',
          categoryId: 1
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todo', null, {})
  }
}
