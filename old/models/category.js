module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      /* options */
    }
  )
  Category.associate = models => {
    Category.hasMany(models.Todo, {
      /* options */
    })
  }
  return Category
}
