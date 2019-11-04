module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      note: {
        type: DataTypes.STRING(500),
        defaultValue: ''
      },
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      completeDate: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
      },
      archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      archivedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      /* options */
    }
  )
  Todo.associate = models => {
    Todo.belongsTo(models.Category, {
      /* options */
    })
  }
  return Todo
}
