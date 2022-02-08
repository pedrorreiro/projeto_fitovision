import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  DatePicker,
  notification,
  Table
} from 'antd';
import { LeftCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import '../css/AllBlocks.css';
import '../css/Estoque.css';
import { useState, useEffect } from 'react';

function App() {

  const { TextArea } = Input;
  const [produtos, setProdutos] = useState([]);
  const [dadoSelecionado, setDadoSelecionado] = useState([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState(0);
  const [displayNovoProduto, setDisplayNovoProduto] = useState('none');
  const [displayTabela, setDisplayTabela] = useState('block');

  const dataSource = produtos;

  const [data, setData] = useState("");

  const [loadings, setLoadings] = useState([]);

  const { Option } = Select;

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

  const columns = [
    {
      title: 'Produto',
      dataIndex: 'produto',
      key: 'produto',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
    },
    {
      title: 'Lote',
      dataIndex: 'lote',
      key: 'lote',
    },
    {
      title: 'Validade',
      dataIndex: 'validade',
      key: 'validade',
    },
    {
      title: 'Observações',
      dataIndex: 'obs',
      key: 'obs',
    },
    {
      title: 'Deletar',
      dataIndex: 'deletar',
      key: 'deletar',
    }
  ];

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [form] = Form.useForm();

  const axios = require('axios');

  useEffect(()=>{
    async function pegaEstoque(){
      await getEstoque();
    }

    pegaEstoque();

  }, [])

  const getEstoque = async () =>{
    
    const result = await axios.get('http://localhost:4000/getEstoque/');
    
    if(result.data != null){
      var resultado = result.data;
      let count = 1;

      resultado.forEach(e => {
        e['key'] = count.toString();
        delete e.createdAt;
        delete e.updatedAt;
        e.deletar = <DeleteOutlined id="lixeira" onClick={()=>deletarEstoque(e.id)}/>;

        count++;
      })
      
      setProdutos(resultado);
    }

    else{
      openMsg('Erro na conexão!', 'Não conseguimos carregar a lista de ensaios. Contate um administrador!');
    }

  }

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (v) => {
    const e = {
      produto: v.produto,
      validade: data,
      quantidade: v.quantidade,
      unidade: v.unidade,
      lote: v.lote,
      obs: v.obs
    }

    addEstoque(e);

  };

  const openMsg = (tipo, titulo, msg) => {

    notification['success']({
      message: titulo,
      description:
        msg,
    });
  };

  const deletarEstoque = async (id) =>{
 
    await axios.post('http://localhost:4000/deletarEstoque/', {
      id: id
    }).then(()=> {
      openMsg("sucess","Sucesso","Produto excluído com sucesso!");
    });

    getEstoque();

  }

  async function addEstoque(estoque) {
    console.log(estoque);
    setLoadings([true]);

    await axios({
      method: 'post',
      url: 'http://localhost:4000/addEstoque',
      data: estoque
    }).then(function (response) {

      if (response.data === 'ok') {
        openMsg("sucess","Sucesso!","Produto cadastrado com sucesso!");

        getEstoque();

        setLoadings([false]);
      }

      else {
        openMsg('error', 'Erro na conexão!', 'Contate um administrador!');
        setLoadings([false]);
      }

    })
      .catch(error => {

        //console.clear();
        openMsg('error','Erro na conexão!', 'Contate um administrador!');
        setLoadings([false]);

      })
  }

  const onDateChange = (date, dateString) => { // formata a data do input calendar
    var dataString = (dateString.substring(5, 10));
    var dia = dataString.substring(3, 6);
    var mes = dataString.substring(0, 2);
    var ano = dateString.substring(0, 4);

    let dataF = dia + '/' + mes + '/' + ano;

    setData(dataF);
  }

  const changeNovoProduto = () => { // altera entre as telas de tabela e novo produto
    if(displayNovoProduto === 'none'){
      setDisplayNovoProduto('flex');
      setDisplayTabela("none");
    }
    else {
      setDisplayTabela("block");
      setDisplayNovoProduto('none');
      getEstoque();
    }
  }


  return (
    <div className="Estoque container">
      <div id="container">
        <div id="body" style={{display: displayNovoProduto, justifyContent: "flex-start"}}>

          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

          <LeftCircleOutlined id="return" onClick={() => {changeNovoProduto()}} />

            <Form.Item
              label="Produto"
              name="produto"
              rules={[
                {
                  required: true,
                  message: "Campo obrigatório!"
                },
              ]}
            >

              <Input placeholder=""/>
            </Form.Item>

            <Form.Item
              label="Validade"
              name="validade"
              rules={[
                {
                  required: true,
                  message: "Campo obrigatório!"
                },
              ]}
            >

              <DatePicker onChange={onDateChange} placeholder="Selecione a data" />

            </Form.Item>




            <Form.Item
              label="Unidade"
              name="unidade"
              rules={[
                {
                  required: true,
                  message: "Campo obrigatório!"
                },
              ]}
            >

              <Select
                placeholder="Selecione a unidade"
                allowClear
              >
                <Option value="g">g</Option>
                <Option value="kg">kg</Option>
                <Option value="ml">ml</Option>
                <Option value="l">l</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Lote"
              name="lote"
              rules={[
                {
                  required: true,
                  message: "Campo obrigatório!"
                },
              ]}
            >

              <Input placeholder=""/>
            </Form.Item>

            <Form.Item
              label="Quantidade"
              name="quantidade"
              rules={[
                {
                  required: true,
                  message: "Campo obrigatório!"
                },
              ]}
            >

              <InputNumber min={1} max={100000}/>
            </Form.Item>




            <Form.Item
              label="Observação"
              name="obs"
              rules={[
                {
                  required: false
                },
              ]}
            >

              <TextArea showCount maxLength={100} style={{ height: 120, width: 300 }}/>

            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button id="button" loading={loadings[0]} htmlType="submit">
                Adicionar Produto
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Resetar
              </Button>

            </Form.Item>

          </Form>

        </div>

        <div id="tabela" style={{display: displayTabela}}>
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
            
            <div id='button' onClick={() => {changeNovoProduto()}} style={{marginRight: "15px"}}>Novo</div>
          </div>

      </div>

    </div>
  );
}

export default App;
