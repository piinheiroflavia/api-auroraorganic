const express = require("express");
const db = require("../db/models");
const CarShop = db.carShop;
const router = express.Router();
const Produto = db.produtos;

// const Produtos = require("../db/models/produtos");
// const Cliente = require("../db/models/cliente")


  
router.get("/", async (req, res) => {
  try {
    const produtosCarrinho = await CarShop.findAll({
      include: [{ model: Produto, as: "produto" }],
    });

    const produtosQuantidade = {};

    produtosCarrinho.forEach((item) => {
      const produtoId = item.produto.id_produto;
      if (produtosQuantidade[produtoId]) {
        produtosQuantidade[produtoId].quantidade += item.quantidade;
      } else {
        produtosQuantidade[produtoId] = {
          quantidade: item.quantidade,
          produto: {
            id_produto: item.produto.id_produto,
            name_produto: item.produto.name_produto,
            Preco: item.produto.Preco,
            novoPreco: item.produto.novoPreco,
            imageSrc: item.produto.imageSrc,
            imageAlt: item.produto.imageAlt,
            categoria: item.produto.categoria,
          },
        };
      }
    });

    const listaProdutos = Object.values(produtosQuantidade);

    res.status(200).json(listaProdutos);
  } catch (error) {
    console.error("Erro ao obter a lista de produtos do carrinho:", error);
    res.status(500).json({ error: "Erro ao obter a lista de produtos do carrinho" });
  }
});


// Adiciona o produto ao carrinho
router.post("/enviar-carrinho", async (req, res) => {
  try {
    const { id_cliente, id_produto, quantidade } = req.body;
    console.log("Dados recebidos do corpo da requisição:", id_cliente, id_produto, quantidade);

    // Consulta o produto no banco de dados para obter o preço unitário
    const produto = await db.produtos.findOne({ where: { id_produto: id_produto } });


    if (!produto) {
      console.log("Produto não encontrado");
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    const valor_total = produto.Preco * quantidade;
    const novoCarrinho = await CarShop.create({
      id_cliente,
      id_produto,
      quantidade,
      valor_total,
    });
    console.log("Produto adicionado ao carrinho:", novoCarrinho);
    res.status(201).json(novoCarrinho);
  } catch (error) {
    console.error("Erro ao adicionar o produto ao carrinho:", error);
    res.status(500).json({ error: "Erro ao adicionar o produto ao carrinho" });
  }
});


// Remove o produto do carrinho
router.delete("/remover-carrinho/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const carrinho = await CarShop.findByPk(id);

    if (!carrinho) {
      console.log("Carrinho não encontrado");
      return res.status(404).json({ error: "Carrinho não encontrado" });
    }

    const produtoId = carrinho.id_produto;

    await CarShop.destroy({ where: { produtoId: produtoId} });
    //const carShop = await db.carts.findOne({ where: { carShop: id } });

    console.log("Produto removido do carrinho com sucesso");
    res.status(200).json({ message: "Produto removido do carrinho com sucesso", produtoId });
    
  } catch (error) {
    console.error("Erro ao remover o produto do carrinho:", error);
    res.status(500).json({ error: "Erro ao remover o produto do carrinho" });
  }
});


module.exports = router;