'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //asociacion N:N tag y post
      Tag.belongsToMany(models.Post, {
        through: 'PostTags',
        as: 'posts',
        foreignKey: 'tagId',
        otherKey: 'postId'
      });
    }
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
    timestamps: false
  });
  return Tag;
};