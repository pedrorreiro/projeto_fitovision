import { Link } from 'react-router-dom'
import { BarsOutlined } from '@ant-design/icons';
import '../css/MenuMobile.css';

function App() {

  return (
    <div id="bodyMenuMobile">
      <input id="alternar" type="checkbox" />
      <label htmlFor="alternar" style={{textAlign: "center"}}>
        <div id="icone"><BarsOutlined id='sair' /></div>
      </label>

      <div className="Menu">
        <Link to="/" className="op">
          <div className="block">
            <span>Início</span>
          </div>
        </Link>

        <Link to="/listaEnsaios" className="op">
          <div className="block">
            <span>Lista de Ensaios</span>
          </div>
        </Link>

        <Link to="/Estoque" className="op">
          <div className="block">
            <span>Estoque</span>
          </div>
        </Link>

        <Link to="/Calendario" className="op">
          <div className="block">
            <span>Calendário</span>
          </div>
        </Link>
        
      </div>

    </div>
  );
}

export default App;
