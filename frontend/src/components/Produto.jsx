import { useState,useEffect } from "react";
import axios from "axios";

const Produto = () => {
    // DECLARANDO A URL DA API QUE SERA CONSUMIDA
    const API_URL = "http://localhost:3001/produto";

    // HOOK - useState Mainupla o estado da variavel
    const [produto, setProduto] = useState([]);
    const [novoProduto, setNovoProduto] = useState({nome:"",descricao:""});
    const [editar, setEditar] = useState(false);

    // CADASTRAR PRODUTO
    const cadastrarProduto = async ()=>{
        // VALIDAR CAMPOS
        if(!novoProduto.nome || !novoProduto.descricao){
            alert("Campos obrigatórios")
            return;
        }

        // TRATAMENTO DE ERROS
        try{
            const response = await axios.post(API_URL)
            setProduto([...produto,response.data])
            setNovoProduto({nome:"",descricao:""})
            setEditar(false);
        }
        catch(error){
            console.log("Erro ao cadastrar o produto", error)
        }
    }

    // HOOK useEffect - EFEITO PARA CARREGAR A LISTA DE TODOS OS PRODUTOS CADASTRADOS
    useEffect(()=>{
        consultarProdutos();
    })

    // CONSULTAR PRODUTOS CADASTRADOS
    const consultarProdutos = async()=>{
        try{
            const response = await axios.get(API_URL)
        }
        catch(error){
            console.log("Erro ao consultao produto", error)
        }
    }

    // ALTERAR PRODUTO CADASTRADO
    const alterarProduto = async()=>{
        if(!novoProduto.nome || !novoProduto.descricao){
            alert("Campos obrigatórios")
            return;
        }

        // TRATAMENTO DE ERROS
        try{
            const response = await axios.put(`${API_URL}/${novoProduto.id}`, novoProduto)
            setProduto(produto.map(produto => produto.id === novoProduto.id ? response.data : produto))
            setNovoProduto({nome:"",descricao:""})
            setEditar(false);
        }
        catch(error){
            console.log("Erro ao alterar produto", error)
        }
    }

    // DELETAR O PRODUTO CADASTRADO
    const deletarProduto = async()=>{
        if(window.confirm("Tem certeza que deseja deletar este produto")){
            try{
                await axios.delete(`${API_URL}/${id}`);
                setProduto(produto.filter((item)=>item.id !== id));
            }
            catch(error){
                console.log("Error ao excluir um produto", error)
            }
        }
        else{
            console.log("Exclusão do produto cancelada")
        }
    }

    // METODO ALTERAR
    const handleAlterar=(produto)=>{
        setNovoProduto(produto)
        setEditar(true);
    }

    // METODO SUBIR QUE VAI ATUALIZAR O BOTÃO DO FORMULARIO
    const handleSubmit =()=>{
        if(editar){
            alterarProduto();
        }
        else{
            cadastrarProduto();
        }
    }

  return (
    <div>
      <h1>Cadastro de Produto</h1>
      <form>
        <div>
          <label>Nome Produto</label>
          <input 
           type="text"
           id="nome" 
           placeholder="Digite o nome Produto"
           value={novoProduto.nome} //pega a variavel do useState
            // pega o que o for digitado no campo    
           onChange={(e)=>setNovoProduto({...novoProduto, nome: e.target.value})}
           
           />
        </div>

        <div>
          <label>Descrição Produto</label>
          <input
            type="text"
            id="descricao"
            placeholder="Digite descrição Produto"
            value={novoProduto.descricao}
            onChange={(e)=>setNovoProduto({...novoProduto, descricao : e.target.value})}
          />
        </div>
            <button onClick={handleSubmit}>
                {editar ? "Alterar" : "Cadastrar"}
            </button>
      </form>
      <ul>
        {produto.map(item =>(
        <li key={item.id}>
            <div>
                <strong>{item.nome}</strong>{item.descricao}
            </div>
            <div>
                <button onClick={handleAlterar(item)}>Editar</button>
                <button onClick={()=>deletarProduto(item.id)}>Deletar</button>
            </div>
        </li>
        ))}     
      </ul>
    </div>
  );
};

export default Produto;
