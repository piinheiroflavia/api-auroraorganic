'use strict';
var DataTypes = require('sequelize/lib/data-types');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  //defini as operações de criação da tabela no método up
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id_cliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome_cliente: {
        type: Sequelize.STRING
      },
      email_cliente: {
        type: Sequelize.STRING
      },
      senha_cliente: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('clientes');
  }
};