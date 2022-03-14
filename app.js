const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { ObjectID } = require("bson");

// Configurar bodyParser
app.use(bodyParser.json());


// Confuguração do banco(MongoDB)
mongoose.connect("mongodb+srv://jpqp23:santacruz1@produtos.mz1by.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
    console.log("banco de dados conectado")
})

// Carregando model Produto
require("./modules/Produto")
const Produto = mongoose.model("Produto");

// Endpoint

// Cadastro

app.post("/produto", (req, res) => {

    if (req.body.nome != undefined && req.body.fabricante != undefined && req.body.preco != undefined) {

        var produto = new Produto({
            nome: req.body.nome, fabricante: req.body.fabricante, preco: req.body.preco
        });

        produto.save().then(() => {
            //Dado salvo
            res.statusCode = 201
            res.send();
        }).catch((erro) => {
            if (erro) {
                throw erro;
            }
            // Algo errado aconteceu
            res.statusCode = 417
            res.send()
        })
    } else
        res.statusCode = 406;
    res.send()
})


//Listagem

app.get("/listaProdutos", (req, res) => {
    Produto.find({}, (erro, dados) => {
        if (erro) {
            res.statusCode = 417
            res.send()
        }
        res.json(dados);
    })
})


//Listagem ID

app.get("/listarProduto/:id", (req, res) => {
    Produto.findById(req.params.id).then((produto) => {
        res.statusCode = 200;
        res.json(produto);
    }).catch((erro) => {
        if (erro) {
            res.statusCode = 417;
            res.send();
            throw erro
        }
    })
})


//Deletar produto

app.delete("/produto/:id" , (req , res) =>{
    Produto.findByIdAndRemove(req.params.id).then((produto) =>{
        if(produto){
            res.statusCode = 200
            res.send()
        }else{
            res.statusCode = 404
            res.send()
        }
    }).catch((erro) =>{
        res.statusCode = 417;
        res.send();
        throw erro
    })
})





app.listen(8090, () => {
    console.log("api rodando!");
})