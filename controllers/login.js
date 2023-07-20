const express = require("express");
const db = require("../db/models");
const router = express.Router();
//import { baseUrl, baseUrlLogin } from '../../src/configReq'; 

router.post("/", async (req, res) => {
  const {  email_cliente, senha_cliente } = req.body;


  try {
    // Verifique se o usuário com o email fornecido existe no banco de dados
    const usuario = await db.cliente.findOne({ where:{email_cliente}});
    if (!usuario) {
      return res.json({
        error: true,
        message: "Esse usuário não existe.",
      });
    }

    // Verifique se a senha fornecida coincide com a senha armazenada no banco de dados
     if (usuario.senha_cliente != senha_cliente) {
      return res.json({
        error: true,
        message: "Senha Incorreta.",
      });
    }
    // Se a autenticação for bem-sucedida, você pode retornar uma resposta com sucesso
    return res.json({
      error: false,
      message: "Usuário Logado, seja bem vindo!"  ,
      data: usuario,
      //redirectUrl: `${baseUrlLogin}/auroraorganic`

    });

  } catch (error) {
    return res.json({
      error: true,
      message: "Erro ao Realizar o Login.",
      data: error,

    });
  }
});

module.exports = router;