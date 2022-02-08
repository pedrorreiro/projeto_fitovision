const Sequelize = require('sequelize');
const database = require('../db');

const Ensaio = database.define('ensaio', {

    envio: {
        type: Sequelize.INTEGER,
        autoIncrement: true.valueOf,
        primaryKey: true,
        allowNull: false
    },
    
    ensaio: {
        type: Sequelize.STRING(25),
        allowNull: false
    },

    dataRecebida: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    planejado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    reteste: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    estacao: {
        type: Sequelize.STRING(25),
        allowNull: false
    },

    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    criarPbs: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    validar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    geracao: {
        type: Sequelize.STRING(10),
        allowNull: false
    },

    ADTorPDT: {
        type: Sequelize.STRING(3),
        allowNull: false
    },

    reg: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    evento: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    pais: {
        type: Sequelize.STRING(30),
        allowNull: false
    },

    macro: {
        type: Sequelize.STRING(10),
        allowNull: false
    },

    etapa: {
        type: Sequelize.STRING(15),
        allowNull: false
    },

    projeto: {
        type: Sequelize.STRING(50),
        allowNull: false
    },

    solicitante: {
        type: Sequelize.STRING(25),
        allowNull: false
    },

    amostrasRecebidas: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Ensaio;