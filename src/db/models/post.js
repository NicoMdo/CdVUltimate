'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociacion con el usuario 
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author'
      });
      // Asociacion con la imagen
      Post.hasMany(models.PostImage, {
        foreignKey: 'postId',
        as: 'images'
      });
      // Un post puede tener muchos comentarios
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments', // Alias de la asociación
      });
      //Asociacion muchos a muchos entre post y tag
      Post.belongsToMany(models.Tag, {
        through: 'PostTags',
        as: 'tags',
        foreignKey: 'postId',
        otherKey: 'tagId'
      });



    }
  }
  Post.init({
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};