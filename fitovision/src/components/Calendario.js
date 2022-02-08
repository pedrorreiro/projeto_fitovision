import {
  Calendar, Badge, notification
} from 'antd';
import 'antd/dist/antd.min.css';
import '../css/AllBlocks.css';
import '../css/Estoque.css';
import { useState, useEffect } from 'react';

function App() {

  const axios = require('axios');

  const [vencidos, setVencidos] = useState([]);

  useEffect(() => {
    async function pegaEstoque(){
      await getEstoque();
    }

    pegaEstoque();
    
  }, []);

  const openError = (titulo, msg) => {

    notification['error']({
      message: titulo,
      description:
        msg,
    });
  };

  const verificaVencidos = (produtos) => {
    setVencidos([]);

    var hoje = new Date();

    produtos.forEach(p => {

      var dia = parseInt(p.validade.substring(0, 2));
      var mes = parseInt(p.validade.substring(3, 5));
      var ano = parseInt(p.validade.substring(6, 10));

      var diaAtual = parseInt(hoje.getDate());
      var mesAtual = parseInt(hoje.getMonth() + 1);
      var anoAtual = parseInt(hoje.getFullYear());

      if (ano - anoAtual < 0) {
        let v = vencidos;
        v.push(p);
        setVencidos(v);
      }

      else if (ano - anoAtual === 0) {
        if (mes - mesAtual < 0) {
          let v = vencidos;
          v.push(p);
          setVencidos(v);
        }

        else if (mes - mesAtual === 0) {
          if (dia - diaAtual <= 0) {
            let v = vencidos;
            v.push(p);
            setVencidos(v);
          }
        }
      }
    })

    // console.log("Vencidos:");
    // console.log(vencidos);
    setVencidos(vencidos);
  }

  const getEstoque = async () => {

    const result = await axios.get('http://localhost:4000/getEstoque/');

    if (result.data != null) {
      var resultado = result.data;
      let count = 1;

      resultado.forEach(e => {
        e['key'] = count.toString();
        delete e.createdAt;
        delete e.updatedAt;

        count++;
      })

      // setProdutos(resultado);

      verificaVencidos(resultado);
    }

    else {
      openError('Erro na conexão!', 'Não conseguimos carregar a lista de ensaios. Contate um administrador!');
    }

  }

  function getListData(value) { // Insere os warnings de vencimento no calendário

     var listData = [];  

    vencidos.forEach(p => {
      if(value.format('DD/MM/yyyy') === p.validade){
        listData = [
          { type: 'warning', content: 'O produto ' + p.produto + " venceu!" }
        ];
      }
      
    })

    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="Estoque container">
      <div id="container">
        <div id="body">
          <Calendar dateCellRender={dateCellRender}/>

        </div>
      </div>

    </div>
  );
}

export default App;
