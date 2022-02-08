
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Inicio from './components/Inicio';
import ListaEnsaios from './components/ListaEnsaios';
import NovoEnsaio from './components/NovoEnsaio';
import Estoque from './components/Estoque';
import Sucesso from './components/Sucesso';
import Calendario from './components/Calendario';
import './css/App.css';

function App() {

  return (

    <BrowserRouter>
      <div className="App">
        <Menu/>
        <div id="box">

          <Routes>
            <Route exact path="/" element={<Inicio />}/>
            <Route path="/listaEnsaios" element={<ListaEnsaios/>} />
            <Route path="/novoEnsaio" element={<NovoEnsaio/>} />
            <Route path="/novoEnsaio/sucesso" element={<Sucesso/>} />
            <Route path="/Estoque/" element={<Estoque/>} />
            <Route path="/Calendario/" element={<Calendario/>} />
          </Routes>
        </div>
    </div>

    </BrowserRouter>

  );
}

export default App;
