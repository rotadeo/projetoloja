import { useState,useEffect } from "react";
import axios from "axios";

const Produto = () => {
    // DECLARANDO A URL DA API QUE SERA CONSUMIDA
    const API_URL = "http://localhost:3001/produto";

    // HOOK - useState Mainupla o estado da variavel
    const [produto, setProduto] = useState([]);
    const [novoProduto, setNovoProduto] = useState({nome:"",descricao:""});
    const [editar, setEditar] = useState(false);
    const [pesquisar, setPesquisar] = useState("");

    // CADASTRAR PRODUTO
    const cadastrarProduto = async ()=>{
        // VALIDAR CAMPOS
        if(!novoProduto.nome || !novoProduto.descricao){
            alert("Campos obrigatórios")
            return;
        }

        // TRATAMENTO DE ERROS
        try{
            const response = await axios.post(API_URL,novoProduto);
            setProduto([...produto,response.data])
            setNovoProduto({nome:"",descricao:""})
            setEditar(false);
        }
        catch(error){
            console.log("Erro ao cadastrar o produto", error)
        }
    }

    // CONSULTAR PRODUTOS CADASTRADOS
    const consultarProdutos = async()=>{
        try{
            // verifica se trouxe uma pesquisa especiica senão devolve a lista com todos
            const url = pesquisar ? `${API_URL}/search?pesquisa=${pesquisar}` : API_URL
            const response = await axios.get(url);
            setProduto(response.data);
        }
        catch(error){
            console.log("Erro ao consultao produto", error)
        }
    };

    // HOOK useEffect - EFEITO PARA CARREGAR A LISTA DE TODOS OS PRODUTOS CADASTRADOS
    useEffect(()=>{
        const timer=setTimeout(()=>{
            consultarProdutos();
        },300) // 3 segundos
        return ()=>clearTimeout(timer)
    },[pesquisar])

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
    const deletarProduto = async(id)=>{
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
    <div className="mx-auto p-4 bg-gray-200 min-h-screen">
      <h1 className="font-bold text-2xl text-center mb-5">Cadastro de Produto</h1>
      <form className="mb-4">
        <div>
            <input type="text" 
            placeholder="Pesquisar..." 
            value={pesquisar} 
            onChange={(e)=>setPesquisar(e.target.value)} 
            className="w-[300px] pl-4 pr-4 py-2 border-gray-400 rounded-full"/>
        </div>
        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">Nome Produto</label>
          <input className="mt-2 border rounded w-full "
           type="text"
           id="nome" 
           placeholder="Digite o nome Produto"
           value={novoProduto.nome} //pega a variavel do useState
            // pega o que o for digitado no campo    
           onChange={(e)=>setNovoProduto({...novoProduto, nome: e.target.value})}
           
           />
        </div>

        <div>
          <label className="block text-xl font-medium text-gray-700">Descrição Produto</label>
          <input className="mt-2 border rounded w-full "
            type="text"
            id="descricao"
            placeholder="Digite descrição Produto"
            value={novoProduto.descricao}
            onChange={(e)=>setNovoProduto({...novoProduto, descricao : e.target.value})}
          />
        </div>
            <button onClick={handleSubmit} className="bg-blue-400 hover:bg-blue-500 font-bold py-0.5 px-2 mt-4 rounded">
                {editar ? "Alterar" : "Cadastrar"}
            </button>
      </form>
      <ul>
        {produto.map(item =>(
        <li key={item.id} className="border p-2 mb-4 rounded flex items-center justify-between  ">
            <div>
                <strong className="font-semibold">{item.nome} - </strong>{item.descricao}
            </div>
            <div>
                <button onClick={()=>handleAlterar(item)} className="bg-amber-300 hover:bg-amber-500 text-black font-bold py-0.5 px-2 rounded mr-3">Editar</button>
                <button onClick={()=>deletarProduto(item.id)} className="bg-red-500 hover:bg-red-700 text-black font-bold py-0.5 px-2 rounded mr-3">Deletar</button>
            </div>
        </li>
        ))}     
      </ul>
    </div>
  );
};

export default Produto;
