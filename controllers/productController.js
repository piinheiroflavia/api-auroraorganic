const express = require ("express");
const db = require ("../db/models");
const router = express.Router();

// Rota para listar todos os produtos
router.get("/", async (req, res) => {
    try {
      const listaProdutos = await db.produtos.findAll();
      res.json(listaProdutos);
    } catch (error) {

        console.error("Erro ao buscar os produtos:", error);
        
        if (error.status === 403) {
            res.status(403).json({
              error: "Erro ao buscar os produtos: acesso não autorizado",
            });
          } else if (error.status === 400) {
            res.status(400).json({
              error: "Erro ao buscar os produtos: dados inválidos",
            });
          } else {
            res.status(500).json({
              error: "Erro ao buscar os produtos: erro interno do servidor",
            });
          }

    }
});

module.exports = router;