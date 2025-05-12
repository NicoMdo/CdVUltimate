'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts', // Relación con la tabla 'Posts'
          key: 'id',
        },
        onDelete: 'CASCADE', //si se elimina un Post, las imágenes asociadas también se eliminan
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Relación con la tabla 'Users'
          key: 'id',
        },
        onDelete: 'SET NULL', //si se elimina un User, el userId de las imágenes se pone en NULL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostImages');
  }
};
