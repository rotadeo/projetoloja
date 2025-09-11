const express = require("express");//importa o módulo express que contruir o servidior
const cors = require("cors");//permite que acesse rotas diferentes(domínios)
const bodyParser= require("body-parser")// middleware que analisa o corpo da requisição de entrada HTTP(dados que vem do formulario)
const {v4:uuid} = require("uuid")//função responsavel por gerar ID´s unicos 
// INSTANCIANDO O EXPRESS
const app = express();
// DEFINE A PORTA DO SERVIDOR
const Port = 3001;

//usando o cors
app.use(cors());
// usando o body-parse para a requisição
app.use(bodyParser.json());

// VARIAVEL QUE RECEBE UM ARRAY VAZIO
let produtos =[];

// CRIANDO A ROTA CADASTRAR PRODUTO (post)

app.post("/produto",(req,res)=>{
    // desestruct- requisição das variaveis que serão manipuladas no corpo da aplicação
    const {nome,descricao} = req.body
    //  validando os campos das variaveis
    if(!nome || !descricao){
        return res.status(400).json({error:"Campos inválidos"})
    }
    //  realiza o novo cadastro com id,nome e descricao
    const novoItem ={id:uuid(),nome,descricao}
    // pega o que foi cadastraro e coloca no array produtos
    produtos.push(novoItem);
    // retorna a mensagem de sucesso
    res.status(201).json({message:"Cadastrado Efetuado com sucesso"})
})

// ROTA PARA CONSULTAR OS PRODUTOS CADASTRADOS (get)
app.get("/produto",(req,res)=>{
    res.json(produtos)
})

// ROTA PARA ALTERAR PRODUTO CADASTRADO

app.put("/produto/:id", (req,res)=>{
     const produtoId =req.params.id;   //Obtém o ID do produto na url
     const {nome,descricao}= req.body;
       //  validando os campos das variaveis
    if(!nome || !descricao){
        return res.status(400).json({error:"Campos inválidos"})
    }
    // verifica se o produto foi alterado
    const produtoIndex = produtos.findIndex(item=>item.id ===produtoId);
      if(produtoIndex === -1){
        return res.status(404).json({error:"Produto não encontrado"})
    }
    produtos[produtoIndex]={id:produtoId,nome, descricao};
    res.json(produtos[produtoIndex])

})

// ROTA PARA DELETAR O PRODUTO CADASTRADO (delete)

app.delete("/produto/:id",(req,res)=>{
     //Obtém o ID do produto na url
    const produtoId =req.params.id;  
    // Armazean o tamanho inicial do array de produtos
    const inicioProduto = produtos.length;
    // filtra o array, removendo o produto com id escolhido
    produtos = produtos.filter(item =>item.id !== produtoId)

    // verifica se o produto foi removido
     if(produtos.length == inicioProduto){
        return res.status(404).json({error:"Produto não encontrado"})
    }
    // mensagem afirmando que o produto foi removido
    res.status(404).send("Produto removido com sucesso")

})


//Executando a escuta do servidor
app.listen(Port, ()=>{
    console.log(`Servidor rodando na porta http://locahost:${Port}`)
})
