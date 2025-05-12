'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un comentario pertenece a un usuario
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author', // Esto es un alias para la asociación
      });

      // Un comentario pertenece a una publicación
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post', // Alias de la asociación
      });
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    visible: DataTypes.BOOLEAN,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};