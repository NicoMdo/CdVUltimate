'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // un usuario puede tener muchos posts
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts'
      });

      // Un usuario puede tener muchos comentarios
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments', // Alias de la asociación
      });

      // Un usuario puede tener muchos seguidores 
      User.hasMany(models.Follower, {
        foreignKey: 'followedId',
        as: 'followeds'
      });
      // Un usuario puede seguir muchos usuarios 
      User.hasMany(models.Follower, {
        foreignKey: 'followerId',
        as: 'follows'
      });


    }
  }
  User.init({
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};