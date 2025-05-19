'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // Asociacion con el post
      PostImage.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });

    }
  }
  PostImage.init({
    url: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostImage',
    timestamps: false
  });
  return PostImage;
};