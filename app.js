const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const db = require("./db/models");
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Listar as tabelas do banco de dados
    db.sequelize
      .query('SHOW TABLES')
      .then(([results, metadata]) => {
        console.log('Tabelas no banco de dados:', results);
      })
      .catch((error) => {
        console.error('Erro ao obter as tabelas do banco de dados:', error);
      });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// Importar o controller
const cadastro = require("./controllers/cadastro.js");
const login = require("./controllers/login.js");
const productController = require("./controllers/productController.js");
const carShopController = require("./controllers/carShopController.js");
const { Model } = require("sequelize");


//passa o endpoint
app.use('/cadastro', cadastro);
app.use('/login', login);
app.use("/produtos", productController);
// o parâmetro :id nas rotas /carrinho/produto/:id e carrinho/remover-carrinho/:id
// indica um valor dinâmico que pode ser acessado no controlador através do objeto req.params.id
app.use("/carrinho", carShopController);



app.listen(9080, () => {
  console.log("Servidor iniciado na porta 9080: http://localhost:9080");
});
