'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follower.belongsTo(models.User, {
        foreignKey: 'followerId',
        as: 'follows'
      });
      Follower.belongsTo(models.User, {
        foreignKey: 'followedId',
        as: 'followeds'
      });
    }
  }
  Follower.init({
    followerId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Follower',
    timestamps: false
  });
  return Follower;
};