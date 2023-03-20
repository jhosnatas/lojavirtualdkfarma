const Sequelize = require('sequelize')
const db = require ('./db');

//https://www.macoratti.net/asp_50.htm

const Post_produtos = db.sequelize.define('produtos' , {
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
    valor: {
        type: db.Sequelize.DECIMAL(10,2),
        allowNull: false,   
    },
    descricao: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    urlimagem: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    Categoria: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    },
    estoque: {
        type: db.Sequelize.STRING,
        allowNull: false,   
    }
})

module.exports = Post_produtos

//Post_produtos.sync({force: true})