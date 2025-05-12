'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts', // Relación con la tabla 'Posts'
          key: 'id',
        },
        onDelete: 'CASCADE', // Si se elimina el post, se eliminan los comentarios asociados
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Relación con la tabla 'Users'
          key: 'id',
        },
        onDelete: 'CASCADE', // Si se elimina el usuario, se eliminan los comentarios asociados
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
    await queryInterface.dropTable('Comments');
  }
};
