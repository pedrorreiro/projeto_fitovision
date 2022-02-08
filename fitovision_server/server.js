var express = require('express');
var app = express();
const port = 4000;

var bodyParser = require('body-parser');
var { addEnsaio, getEnsaios, getQtdBy, deleteByEnvio } = require('./DAO/DAOEnsaio.js');
var { addEstoque, getEstoque, deleteById } = require('./DAO/DAOEstoque.js');
const cors = require('cors');
const { send } = require('process');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('Olá!');
});

app.post('/addEstoque', function (req, res) {

    const resp = req.body;

    try {
        addEstoque(resp);
        res.send("ok");
    } catch (e) {
        console.log(e);
        res.send("Erro ao adicionar estoque");
    }

});

app.get('/getEstoque/', function (req, res) {

    try {

        var estoques = getEstoque();

        if (estoques != null) {
            estoques.then(function (value) {
                res.send(value);
            })
        }

        else send(null);

    } catch (e) {
        console.log(e);
        res.send("Erro");
    }

});

app.post('/deletarEstoque', function (req, res) {

    const id = req.body.id;

    try {
        deleteById(id);
        res.send("ok");
    } catch (e) {
        console.log(e);
        res.send("Erro ao deletar estoque");
    }

});

app.post('/deletarEnsaio', function (req, res) {

    const envio = req.body.envio;

    try {
        deleteByEnvio(envio);
        res.send("ok");
    } catch (e) {
        console.log(e);
        res.send("Erro ao deletar ensaio");
    }

});

app.post('/addEnsaio', function (req, res) {

    const resp = req.body;

    try {
        addEnsaio(resp);
        res.send("ok");
    } catch (e) {
        console.log(e);
        res.send("Erro ao adicionar ensaio");
    }

});

app.get('/getQtdBy/', function (req, res) {

    const tipo = req.query.tipo;
    const valor = req.query.valor;
    console.log("tipo: " + tipo + " valor: " + valor);

    try {

        var value = getQtdBy(tipo, valor);

        if (value != null) {
            value.then((v) => {
                console.log(v);
                res.send({ resp: v });
            })

        }

        else send(null);

    } catch (e) {
        console.log(e);
        res.send("Erro");
    }

});

app.get('/getEnsaios/', function (req, res) {

    const param = req.query.value;

    try {

        var ensaios = getEnsaios(param);

        if (ensaios != null) {
            ensaios.then(function (value) {
                res.send(value);
            })
        }

        else send(null);

    } catch (e) {
        console.log(e);
        res.send("Erro");
    }

});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);

    (async () => {
        const database = require('./db');
        await database.sync();
    })();

})
