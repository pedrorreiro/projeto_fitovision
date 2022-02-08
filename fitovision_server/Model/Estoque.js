const Sequelize = require('sequelize');
const database = require('../db');

const Estoque = database.define('estoque', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true.valueOf,
        primaryKey: true,
        allowNull: false
    },
    
    produto: {
        type: Sequelize.STRING(25),
        allowNull: false
    },

    validade: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    unidade: {
        type: Sequelize.STRING(10),
        allowNull: false
    },

    lote: {
        type: Sequelize.STRING(25),
        allowNull: false
    },

    obs: {
        type: Sequelize.STRING(100),
        allowNull: true
    }
});

module.exports = Estoque;