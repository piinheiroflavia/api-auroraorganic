'use strict';
const { Model, DataTypes } = require('sequelize');
const db = require('./index');
const cliente = require('./cliente');
const produto = require('./produtos');
module.exports = (sequelize, DataTypes) => {
  class carShop extends Model {
    static associate(models) {
      // relaciona com a tabela "clientes" e "produtos"
      carShop.belongsTo(models.cliente, { foreignKey: 'id_cliente' });
      carShop.belongsTo(models.produtos, { foreignKey: 'id_produto' });
    }
  }
  carShop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        references: {
          model: 'clientes',
          key: 'id_cliente'
        }
      },
      id_produto: {
        type: DataTypes.INTEGER,
        references: {
          model: 'produtos',
          key: 'id_produto'
        }
      },
      quantidade: {
        type: DataTypes.INTEGER
      },
      valor_total: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'carShop',
      tableName: 'carshops',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  );
  return carShop;
};