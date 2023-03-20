////const { Sequelize } = require("sequelize");
const Sequelize = require('sequelize')
const db = require ('./db');

const Post_postagens = db.sequelize.define('postagens' , {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.TEXT
    },
    mensagem: {
        type: db.Sequelize.TEXT
    }

})

module.exports = Post_postagens

//Post_postagens.sync({force: true})

