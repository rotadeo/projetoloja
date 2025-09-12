const Produto = () => {
  return (
    <div>
      <h1>Cadastro de Produto</h1>
      <form>
        <div>
          <label>Nome Produto</label>
          <input type="text" id="nome" placeholder="Digite o nome Produto" />
        </div>

        <div>
          <label>Descrição Produto</label>
          <input
            type="text"
            id="descricao"
            placeholder="Digite descrição Produto"
          />
        </div>

            <button>Cadastrar</button>

      </form>
      <ul>
        <li>
            <div>
                <strong>produto</strong>
            </div>
            <div>
                <button>Editar</button>
                <button>Deletar</button>
            </div>
        </li>
      </ul>
    </div>
  );
};

export default Produto;
