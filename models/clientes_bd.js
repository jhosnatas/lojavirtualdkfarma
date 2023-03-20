const Sequelize = require('sequelize')
const db = require ('./db');

const Post_cadastro = db.sequelize.define('clientes' , {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    cpf: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },

    nascimento: {
        type: db.Sequelize.DATE,
        allowNull: false,   
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    telefone: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    cep: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    numero: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    rua: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    }, 
    complemento: {
        type: db.Sequelize.STRING,
        allowNull: true,   
    },
    referencia: {
        type: db.Sequelize.STRING,
        allowNull: true,   
    },
    
    password: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    
    session_id: {
        type: db.Sequelize.STRING,
        allowNull: true,   
    }
})

module.exports = Post_cadastro

//Post_cadastro.sync({force: true})