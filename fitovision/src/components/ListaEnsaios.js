import { Input, Table, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../css/AllBlocks.css';
import '../css/ListaEnsaios.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { HexColorPicker } from "react-colorful";

const axios = require('axios');

function App() {

  const { Search } = Input;

  const [ensaios, setEnsaios] = useState([]);
  const [filtrarPor, setFiltrarPor] = useState("");
  const [dadoSelecionado, setDadoSelecionado] = useState([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState(1);
  const [color, setColor] = useState("#aabbcc");
  const [displayCor, setDisplayCor] = useState('none');
  const [displayMenu1, setDisplayMenu1] = useState('block');
  const [displayMenu2, setDisplayMenu2] = useState('none');

  useEffect(() => {
    async function pegaEnsaios(){
      getEnsaios(filtrarPor);
    }
    
    pegaEnsaios();
  }, [])

  const dataSource = ensaios;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setLinhaSelecionada(selectedRowKeys);
      setDadoSelecionado(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const mudarCor = (valor) => {
    console.log(valor + " -> linha: " + linhaSelecionada);

    //document.body.querySelectorAll(`td:nth-child(${linhaSelecionada})`).style.background = color;

    document.body.querySelectorAll(`.ant-table-row:nth-child(${linhaSelecionada})`).forEach(el => { // mudando background color da linha
      el.style.background = valor;
    })
  }

  const marcarCor = () => {
    console.log("mudando cor");
    if (displayCor === 'flex') setDisplayCor('none');
    else setDisplayCor('flex');


  }

  const columns = [
    {
      title: 'Deletar',
      dataIndex: 'deletar',
      key: 'deletar',
    },
    {
      title: 'Envio',
      dataIndex: 'envio',
      key: 'envio',
    },
    {
      title: 'Ensaio',
      dataIndex: 'ensaio',
      key: 'ensaio',
    },
    {
      title: 'Data Recebida',
      dataIndex: 'dataRecebida',
      key: 'dataRecebida',
    },
    {
      title: 'Planejado',
      dataIndex: 'planejado',
      key: 'planejado',
    },
    {
      title: 'Reteste',
      dataIndex: 'reteste',
      key: 'reteste',
    },
    {
      title: 'Estação',
      dataIndex: 'estacao',
      key: 'estacao',
    },
    {
      title: 'Ano',
      dataIndex: 'ano',
      key: 'ano',
    },
    {
      title: 'Criar PBS',
      dataIndex: 'criarPbs',
      key: 'criarPbs',
    },
    {
      title: 'Validar',
      dataIndex: 'validar',
      key: 'validar',
    },
    {
      title: 'Geração',
      dataIndex: 'geracao',
      key: 'geracao',
    },
    {
      title: 'ADT ou PDT',
      dataIndex: 'ADTorPDT',
      key: 'ADTorPDT',
    },
    {
      title: 'Reg',
      dataIndex: 'reg',
      key: 'reg',
    },
    {
      title: 'Evento',
      dataIndex: 'evento',
      key: 'evento',
    },
    {
      title: 'País',
      dataIndex: 'pais',
      key: 'pais',
    },
    {
      title: 'Macro',
      dataIndex: 'macro',
      key: 'macro',
    },
    {
      title: 'Etapa',
      dataIndex: 'etapa',
      key: 'etapa',
    },
    {
      title: 'Projeto',
      dataIndex: 'projeto',
      key: 'projeto',
    },
    {
      title: 'Solicitante',
      dataIndex: 'solicitante',
      key: 'solicitante',
    },
    {
      title: 'Amostras Recebidas',
      dataIndex: 'amostrasRecebidas',
      key: 'amostrasRecebidas',
    }
  ];

  const onSearch = value => {

    if (value === '') {
      getEnsaios('');
      return;
    }

    else {
      getEnsaios('').then(() => {
        var novaLista = [];

        ensaios.forEach(e => {
          if (((e.ensaio).toLowerCase().includes(value.toLowerCase()))) novaLista.push(e);
        })

        if (novaLista.length === 0) setEnsaios([]);

        setEnsaios(novaLista);
      });
    }
  }

  const onSearchEstacao = value => {
    if (value === '') {
      getEnsaios('');
      return;
    }

    else {
      getEnsaios('').then(() => {
        var novaLista = [];

        ensaios.forEach(e => {
          if (((e.estacao).toLowerCase().includes(value.toLowerCase()))) novaLista.push(e);
        })

        if (novaLista.length === 0) setEnsaios([]);

        setEnsaios(novaLista);
      });
    }
  }

  const onSearchPais = value => {
    if (value === '') {
      getEnsaios('');
      return;
    }

    else {
      getEnsaios('').then(() => {
        var novaLista = [];

        ensaios.forEach(e => {
          if (((e.pais).toLowerCase().includes(value.toLowerCase()))) novaLista.push(e);
        })

        if (novaLista.length === 0) setEnsaios([]);

        setEnsaios(novaLista);
      });
    }
  }

  const onSearchSolicitante = value => {
    if (value === '') {
      getEnsaios('');
      return;
    }

    else {
      getEnsaios('').then(() => {
        var novaLista = [];

        ensaios.forEach(e => {
          if (((e.solicitante).toLowerCase().includes(value.toLowerCase()))) novaLista.push(e);
        })

        if (novaLista.length === 0) setEnsaios([]);

        setEnsaios(novaLista);
      });
    }
  }

  const openMsg = (tipo, titulo, msg) => {

    notification['success']({
      message: titulo,
      description:
        msg,
    });
  };


  const deletarEnsaio = async (dado) => {

    await axios.post('http://localhost:4000/deletarEnsaio/', {
      envio: dado
    }).then(() => {
      openMsg("sucess","Sucesso","Produto excluído com sucesso!");
    })

    getEnsaios('');
  
  }

  const openError = (titulo, msg) => {

    notification['error']({
      message: titulo,
      description:
        msg,
    });
  };

  const getEnsaios = async (orderBy) => {

    const result = await axios.get('http://localhost:4000/getEnsaios/', { params: { value: orderBy } });

    if (result.data != null) {
      var resultado = result.data;

      let count = 1;

      resultado.forEach(e => {
        e['key'] = count.toString();
        delete e.createdAt;
        delete e.updatedAt;
        e.deletar = <DeleteOutlined id="lixeira" onClick={()=>deletarEnsaio(e.envio)}/>;

        Object.keys(e).forEach(prop => {
          if (e[prop] === true) e[prop] = "Sim";
          else if (e[prop] === false) e[prop] = "Não";
        })

        count++;
      })

      setEnsaios(resultado);
    }

    else {
      openError('Erro na conexão!', 'Não conseguimos carregar a lista de ensaios. Contate um administrador!');
    }

  }

  const filtrarBy = (value) => {
    if (value === "") {
      console.log("Sem filtro");
    }

    else {
      console.log("Filtrando por " + value);
    }

    setFiltrarPor(value);
    getEnsaios(value);

  }

  const alterarConteudo = (menu) =>{
    switch(menu){
      case '1':
        setDisplayMenu1("block");
        setDisplayMenu2("none");
        break;
      case '2':
        setDisplayMenu2("block");
        setDisplayMenu1("none");
        break;
    }
  }

  return (
    <div className="ListaEnsaios container">
      <div id="navbar">

        <div className="item" onClick={()=>alterarConteudo('1')}>
          <p>Informações dos Projetos</p>
        </div>

        <div className="item" onClick={()=>alterarConteudo('2')}>
          <p>Controle de Qualidade</p>
        </div>

      </div>

      <div id="contentListEnsaios">
        <div id="infoContent" style={{display: displayMenu1}} >

          <div id='camposFiltro'>
            <Link to="/novoEnsaio"><div id="button">Novo ensaio</div></Link><br></br><br></br>
            <Search placeholder="Buscar ensaios" onSearch={onSearch} enterButton /><br></br><br></br>

            <Search placeholder="Filtrar por estação..." onSearch={onSearchEstacao} enterButton /><br></br><br></br>
            <Search placeholder="Filtrar por país..." onSearch={onSearchPais} enterButton /><br></br><br></br>
            <Search placeholder="Filtrar por solicitante..." onSearch={onSearchSolicitante} enterButton /><br></br><br></br>
          </div><br></br>

          <div id="divTabela">

            <input id="alternarFiltro" type="checkbox" />
            <label htmlFor="alternarFiltro" style={{ textAlign: "center" }} id="buttonMostrarFiltro">
              <div id='button'>Filtros</div>
            </label>

            <div id="maeFiltros">
              <div id="filtros">
                <div className="filtro"
                  onClick={() => { filtrarBy('ensaio') }}
                >Ensaio</div>

                <div className='filtro'
                  onClick={() => { filtrarBy('evento') }}
                >Evento</div>

                <div className="filtro"
                  onClick={() => { filtrarBy('estacao') }}
                >Estação</div>

                <div className='filtro'
                  onClick={() => { filtrarBy('solicitante') }}
                >Solicitante</div>

                <div className='filtro'
                  onClick={() => { filtrarBy('amostrasRecebidas') }}
                >Amostras Recebidas</div>

                <div className='filtro'
                  onClick={() => { filtrarBy('pais') }}
                >País</div>

                <div className='filtro'
                  onClick={() => { filtrarBy('macro') }}
                >Macro</div>

              </div>
            </div>

            <div id="tabela">
              <div>
                <Table
                  rowSelection={{
                    type: "radio",
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={dataSource}
                />
              </div>
            </div><br></br>

            <div id='button' onClick={() => marcarCor() } style={{ marginRight: "15px" }}>Marcar</div>
            <div id='button' onClick={() => { filtrarBy("") }}>Limpar filtros</div>
            <HexColorPicker color={color} onChange={mudarCor} style={{ display: displayCor }} />
            
          </div>

          

        </div>

        <div style={{textAlign: "center", display: displayMenu2}}>
          <br></br><br></br>
          <span>Tela de controle de qualidade</span>
        </div>

        <div>

        </div>
      </div>

    </div>
  );

}

export default App;
