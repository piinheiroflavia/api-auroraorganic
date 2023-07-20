'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const listaJson = require('../../../listProdutos.json');
//const carShop = require('./carShop');


module.exports = (sequelize, DataTypes) => {
  class produtos extends Model {
    static associate(models) {
     // Associação com o modelo carShop
      produtos.hasMany(models.carShop, { foreignKey: 'id_produto' });
      
    }
  }
  produtos.init({
    id_produto: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name_produto: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Preco: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    novoPreco: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    imageSrc: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imageAlt: {
      allowNull: false,
      type: DataTypes.STRING
    },
    categoria: {
      allowNull: false,
      type: DataTypes.STRING
    }
    
  }, {
    sequelize,
    modelName: 'produtos',
  });


  produtos.loadFromJSON = async function(jsonData) {
    try {
      await this.bulkCreate(jsonData);
      console.log('Dados carregados com sucesso.');
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };


  return produtos;
};