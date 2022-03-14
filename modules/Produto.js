const mongoose = require("mongoose");

//Produto
/*
    Nome
    Fabricante
    Preço

*/

mongoose.model("Produto",{
    nome:{type: String},
    fabricante:{type:String},
    preco:{type:Number}

})