import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  Checkbox,
  DatePicker,
  notification
} from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../css/AllBlocks.css';
import '../css/NovoEnsaio.css';
import { useState } from 'react';

function App() {

  const { Option } = Select;

  const [data, setData] = useState("");
  const [ano, setAno] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [reg, setReg] = useState(false);
  const [validar, setValidar] = useState(false);
  const [criarPbs, setCriarPbs] = useState(false);
  const [reteste, setReteste] = useState(false);
  const [planejado, setPlanejado] = useState(false);

  const axios = require('axios');
  const navigate = useNavigate();
  const [form] = Form.useForm();

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

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (v) => {

    console.log(v.reteste);

    const e = {
        envio: v.Envio,
        ensaio: v.Ensaio,
        dataRecebida: data,
        planejado: planejado,
        reteste: reteste,
        estacao: v.Estacao,
        ano: ano,
        criarPbs: criarPbs,
        validar: validar,
        geracao: v.Geracao,
        ADTorPDT: v.ADTorPDT,
        reg: reg,
        evento: v.Evento,
        pais: v.Pais,
        macro: v.Macro,
        etapa: v.Etapa,
        projeto: v.Projeto,
        solicitante: v.Solicitante,
        amostrasRecebidas: v.Amostras
    }

    addEnsaio(e);
    
  };

  const openError = (titulo, msg) => {

    notification['error']({
      message: titulo,
      description:
        msg,
    });
  };

  async function addEnsaio(ensaio) {
    
    setLoadings([true]);

    await axios({
      method: 'post',
      url: 'http://localhost:4000/addEnsaio',
      data: ensaio
    }).then(function (response) {

      if (response.data === 'ok') {
        console.log("Cadastro com sucesso!");
        navigate('/novoEnsaio/sucesso');
      }

      else {
        openError('Erro na conexão!', 'Contate um administrador!');
        setLoadings([false]);
      }

    })
      .catch(error => {

        //console.clear();
        openError('Erro na conexão!', 'Contate um administrador!');
        setLoadings([false]);

      })
  }

  const onDateChange = (date, dateString) => {
    
    var dataString = (dateString.substring(5, 10));
    var dia = dataString.substring(3, 6);
    var mes = dataString.substring(0, 2);
    var ano = dateString.substring(0, 4);

    let dataF = dia + '/' + mes;
    console.log(dataF);
    setData(dataF);
    setAno(ano);
  }

  const onRegChange = (e) =>{
    setReg(e.target.checked);
  }

  const onValidarChange = (e) =>{
    setValidar(e.target.checked);
  }

  const onCriarPbsChange = (e) =>{
    setCriarPbs(e.target.checked);
  }

  const onRetesteChange = (e) =>{
    setReteste(e.target.checked);
  }

  const onPlanejadoChange = (e) =>{
    setPlanejado(e.target.checked);
  }

  return (
    <div className="NovoEnsaio container">
      <Link to='../listaEnsaios'>
        <LeftCircleOutlined id="return" />
      </Link><br></br>

      <div id="container">
        <div id="body">

          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <div className='metade'>
              {/* <Form.Item
                name="Envio"
                label="Envio"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={1} max={1000} onChange={onEnvioChange} />
              </Form.Item> */}

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Ensaio"
                label="Ensaio"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Input placeholder=""/>
              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Evento"
                label="Evento"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Input placeholder=""/>
              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Projeto"
                label="Projeto"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Input placeholder=""/>
              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Solicitante"
                label="Solicitante"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Input placeholder=""/>
              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Amostras"
                label="Amostras recebidas"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <InputNumber min={1} max={100000}/>
              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Data"
                label="Data recebida"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <DatePicker onChange={onDateChange} placeholder="Selecione a data" />

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="ADTorPDT"
                label="ADT/PDT"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Select
                  placeholder="Selecione a opção"
                  allowClear
                >
                  <Option value="ADT">ADT</Option>
                  <Option value="PDT">PDT</Option>
                </Select>
              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Macro"
                label="Macro"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Select
                  placeholder="Selecione a macro"
                  allowClear
                >
                  <Option value="M3">M3</Option>
                  <Option value="M4">M4</Option>
                  <Option value="M5">M5</Option>
                </Select>
              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Etapa"
                label="Etapa"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Select
                  placeholder="Selecione a etapa"
                  allowClear
                >
                  <Option value="SINC">SINC</Option>
                  <Option value="Outro">Outro</Option>
                </Select>
              </Form.Item>

            </div>

            <div className='metade'>

              <Form.Item
                name="Geracao"
                label="Geração"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Select
                  placeholder="Selecione a geração"
                  allowClear
                >
                  <Option value="W/S">W/S</Option>
                  <Option value="S/S">S/S</Option>
                </Select>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Estacao"
                label="Estação"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Select
                  placeholder="Selecione a estação"
                  allowClear
                >
                  <Option value="Primavera">Primavera</Option>
                  <Option value="Verão">Verão</Option>
                  <Option value="Outono">Outono</Option>
                  <Option value="Inverno">Inverno</Option>
                </Select>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item
                name="Pais"
                label="País"
                rules={[
                  {
                    required: true,
                    message: "Campo obrigatório!"
                  },
                ]}
              >
                <Select
                  placeholder="Selecione o país"
                  allowClear
                >
                  <Option value="BRA">BRA</Option>
                  <Option value="USA">USA</Option>
                  <Option value="ESP">ESP</Option>
                  <Option value="JAP">JAP</Option>
                </Select>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item valuePropName="checked"
                name="REG"
                label="REG"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Checkbox checked={false} onChange={onRegChange}></Checkbox>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item valuePropName="checked"
                name="Validar"
                label="Validar"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Checkbox checked={false} onChange={onValidarChange}></Checkbox>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item valuePropName="checked"
                name="CriarPbs"
                label="Criar PBS"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Checkbox checked={false} onChange={onCriarPbsChange}></Checkbox>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item valuePropName="checked"
                name="Reteste"
                label="Reteste"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Checkbox checked={false} onChange={onRetesteChange}></Checkbox>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

              <Form.Item valuePropName="checked"
                name="Planejado"
                label="Planejado"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Checkbox checked={false} onChange={onPlanejadoChange}></Checkbox>

              </Form.Item>

              {/* --------------------------------------------------------------- */}

            </div>

            <Form.Item {...tailLayout}>
              <Button id="button" loading={loadings[0]} htmlType="submit">
                Adicionar Ensaio
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Resetar
              </Button>

            </Form.Item>

          </Form>

        </div>

      </div>

    </div>
  );
}

export default App;
