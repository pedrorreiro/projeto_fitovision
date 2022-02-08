import { Button, Input, Result } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../css/AllBlocks.css';
import '../css/ListaEnsaios.css';

function App() {

  const { Search } = Input;
  const onSearch = value => console.log(value);

  return (
    <div className="ListaEnsaios container">
      <Result
        status="success"
        title="Ensaio cadastrado com sucesso!"
        subTitle=""
        extra={[
          <Link to='../' key="inicio">
            <Button type="primary">
              Início
            </Button>
          </Link>
          ,
          <Link to='../novoEnsaio' key="cadastrarOutro">
            <Button key="cadastrarOutro">
              Cadastrar outro
            </Button>
          </Link>
          ,
        ]}
     />
    </div>
  );
}

export default App;
