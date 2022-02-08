import '../css/AllBlocks.css';
import '../css/Inicio.css';
import CanvasJSReact from '../canvasjs.react';
import { useState, useEffect } from 'react';
import { notification, Carousel } from 'antd';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function App() {

  const axios = require('axios');

  const [ensaios, setEnsaios] = useState([]);
  const [qtdEnsaios, setQtdEnsaios] = useState(0);
  const [estacoes, setEstacoes] = useState([]);
  const [amostras, setAmostras] = useState({});
  const [meses, setMeses] = useState({});
  const [atividades, setAtividades] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vencidos, setVencidos] = useState([]);
  
  const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'white',
    padding: '30px'
  };

  const verificaVencidos = (produtos) =>{
    setVencidos([]);

    var hoje = new Date();

    produtos.forEach(p =>{
  
      var dia = parseInt(p.validade.substring(0,2));
      var mes = parseInt(p.validade.substring(3,5));
      var ano = parseInt(p.validade.substring(6,10));
      
      var diaAtual = parseInt(hoje.getDate());
      var mesAtual = parseInt(hoje.getMonth() + 1);
      var anoAtual = parseInt(hoje.getFullYear());
      
      if(ano - anoAtual < 0){
        let v = vencidos;
        v.push(p);
        setVencidos(v);
      }

      else if(ano - anoAtual === 0){
        if(mes - mesAtual < 0){
          let v = vencidos;
          v.push(p);
          setVencidos(v);
        }

        else if(mes - mesAtual === 0){
          if(dia - diaAtual <= 0){
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

  const getEstoque = async () =>{
    
    const result = await axios.get('http://localhost:4000/getEstoque/');
    
    if(result.data != null){
      var resultado = result.data;
      let count = 1;

      resultado.forEach(e => {
        e['key'] = count.toString();
        delete e.createdAt;
        delete e.updatedAt;

        count++;
      })
      
      setProdutos(resultado);

      verificaVencidos(resultado);
    }

    else{
      openError('Erro na conexão!', 'Não conseguimos carregar a lista de ensaios. Contate um administrador!');
    }

  }

  const openError = (titulo, msg) => {

    notification['error']({
      message: titulo,
      description:
        msg,
    });
  };

  const options = {
    animationEnabled: true,
    title: {
      text: ""
    },
    subtitles: [{
      text: "Total: " + qtdEnsaios + " ensaios",
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Primavera", y: estacoes.primavera },
        { name: "Verão", y: estacoes.verao },
        { name: "Outono", y: estacoes.outono },
        { name: "Inverno", y: estacoes.inverno }
      ]
    }]
  }

  const calculo = (e) => {

    var lista = {
      janeiro: 0,
      fevereiro: 0,
      marco: 0,
      abril: 0,
      maio: 0,
      junho: 0,
      julho: 0,
      agosto: 0,
      setembro: 0,
      outubro: 0,
      novembro: 0,
      dezembro: 0
    };

    e.forEach(en => {
      switch(en.ano){
        case 2022:
          switch(en.dataRecebida.substring(3, 5)){ // switch do mes
            case '01':
              lista.janeiro+= en.amostrasRecebidas;
              break;
            case '02':
              lista.fevereiro+= en.amostrasRecebidas;
              break;
            case '03':
              lista.marco+= en.amostrasRecebidas;
              break;
            case '04':
              lista.abril+= en.amostrasRecebidas;
              break;
            case '05':
              lista.maio+= en.amostrasRecebidas;
              break;
            case '06':
              lista.junho+= en.amostrasRecebidas;
              break;
            case '07':
              lista.julho+= en.amostrasRecebidas;
              break;
            case '08':
              lista.agosto+= en.amostrasRecebidas;
              break;
            case '09':
              lista.setembro+= en.amostrasRecebidas;
              break;
            case '10':
              lista.outubro+= en.amostrasRecebidas;
              break;
            case '11':
              lista.novembro+= en.amostrasRecebidas;
              break;
            case '12':
              lista.dezembro+= en.amostrasRecebidas;
              break;
          }
          
      }
    })

    setMeses(lista);
  }

  const options2 = {
    animationEnabled: true,
    title: {
      text: "Amostras Recebidas - 2022"
    },
    axisX: {
      valueFormatString: "MMM"
    },
    axisY: {
      title: "Quantidade de amostras",
      prefix: ""
    },
    data: [{
      yValueFormatString: "#,###",
      xValueFormatString: "MMMM",
      type: "spline",
      dataPoints: [
        { x: new Date(2022, 0), y: meses.janeiro},
        { x: new Date(2022, 1), y: meses.fevereiro },
        { x: new Date(2022, 2), y: meses.marco },
        { x: new Date(2022, 3), y: meses.abril },
        { x: new Date(2022, 4), y: meses.maio },
        { x: new Date(2022, 5), y: meses.junho },
        { x: new Date(2022, 6), y: meses.julho },
        { x: new Date(2022, 7), y: meses.agosto },
        { x: new Date(2022, 8), y: meses.setembro },
        { x: new Date(2022, 9), y: meses.outubro },
        { x: new Date(2022, 10), y: meses.novembro },
        { x: new Date(2022, 11), y: meses.dezembro }
      ]
    }]
  }

  const getEnsaios = async (orderBy) => {

    var url;
    const result = await axios.get('http://localhost:4000/getEnsaios/', { params: { value: "" } });

    if (result.data != null) {
      var resultado = result.data;

      let count = 1;

      resultado.forEach(e => {
        e['key'] = count.toString();
        delete e.id;
        delete e.createdAt;
        delete e.updatedAt;

        Object.keys(e).forEach(prop => {
          if (e[prop] === true) e[prop] = "Sim";
          else if (e[prop] === false) e[prop] = "Não";
        })

        count++;
      })

      return resultado;
    }

    else {
      openError('Erro na conexão!', 'Não conseguimos carregar a lista de ensaios. Contate um administrador!');
    }

  }

  const getQtdBy = async (tipo, valor) => {

    var url;
    const result = await axios.get('http://localhost:4000/getQtdBy/', { params: { tipo: tipo, valor: valor } });

    if (result.data != null) {
      var resultado = result.data.resp;

      return resultado;
    }

    else {
      openError('Erro na conexão!', 'Não conseguimos carregar a lista de ensaios. Contate um administrador!');
    }

  }

  useEffect(async () => {
    const e = await getEnsaios("");
    setEnsaios(e);
    var tamanho = e.length;
    setQtdEnsaios(tamanho);
    getEstoque();

    // console.log("Quantidade de registros: " + e.length);

    var primavera = await getQtdBy("estacao", "Primavera");
    var verao = await getQtdBy("estacao", "Verão");
    var outono = await getQtdBy("estacao", "Outono");
    var inverno = await getQtdBy("estacao", "Inverno");

    var amostras2022 = e.filter(ens => { return ens.ano === 2022 });
    var amostras2021 = e.filter(ens => { return ens.ano === 2021 });
    var amostras2020 = e.filter(ens => { return ens.ano === 2020 });

    primavera = (primavera / tamanho) * 100;
    verao = (verao / tamanho) * 100;
    outono = (outono / tamanho) * 100;
    inverno = (inverno / tamanho) * 100;

    setAmostras({
      ano2022: amostras2022,
      ano2021: amostras2021,
      ano2020: amostras2020
    });

    setEstacoes({
      primavera,
      outono,
      verao,
      inverno
    })

    calculo(amostras2022);

    // console.log("Primavera: " + est.primavera);
    // console.log("Verao: " + est.verao);
    // console.log("outono: " + est.outono);
    // console.log("inverno: " + est.inverno);

  }, [])

  return (
    <div className="Inicio container">
      <div id="corpo">

      <Carousel>
          <div>
            <div style={contentStyle}>
              <CanvasJSChart options={options} />
            </div>
            
          </div>
          <div>
          <div style={contentStyle}>
              <CanvasJSChart options={options2} />
            </div>
          </div>
        </Carousel>

      <div id="atividades">
          <h1 style={{textAlign: "center"}}>Atividades</h1>

          <div id="lista">

            {vencidos.map((item,i) => 
            <div className="atividade" key={item.id}>
              <p><strong>Atenção! O produto "{item.produto}" está vencido desde {item.validade}</strong></p>
            </div>
            )}

          </div>
        </div>   

      </div>
    </div>
  );
}

export default App;
