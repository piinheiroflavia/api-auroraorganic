const express = require ("express");
const db = require ("../db/models");
const router = express.Router();
//import { baseUrlLogin } from '../../src/configReq'; 


router.post("/", async (req, res) => {
    var data = req.body;

    await db.cliente.create(data).then((datamessage) => {
        return res.json({
            error: false,
            message: "Cadastrado com sucesso!",
            data: datamessage,
            //redirectUrl: `${baseUrlLogin}/auroraorganic/login`
        });
    }).catch((error) => {
        return res.json({
            error: true,
            message: "Erro ao cadastrar!",
            data: error   
        });
    });
});

module.exports = router;
