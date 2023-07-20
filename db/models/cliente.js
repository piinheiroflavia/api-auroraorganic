'use strict';
const { Model } = require('sequelize');
const carShop = require('./carShop');

module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cliente.hasMany(models.carShop, { foreignKey: 'id_cliente' });
    }
  }
  cliente.init({
    id_cliente: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome_cliente: DataTypes.STRING,
    email_cliente: DataTypes.STRING,
    senha_cliente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cliente',
  });
  return cliente;
};