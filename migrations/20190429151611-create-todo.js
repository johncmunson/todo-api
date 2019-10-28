module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      note: {
        type: Sequelize.STRING(500),
        defaultValue: ''
      },
      complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      completeDate: {
        type: Sequelize.DATE,
        defaultValue: () => new Date()
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      archivedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Category',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todo')
  }
}
