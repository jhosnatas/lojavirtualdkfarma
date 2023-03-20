const Sequelize = require('sequelize')
const db = require ('./db');
const pedidos = require ('./pedidos_bd')

//https://www.macoratti.net/asp_50.htm

const Post_itenspedidos = db.sequelize.define('itenspedidos' , {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },         
    quantidade: {
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    },                   
    valor: {
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    }    
})
Post_itenspedidos.belongsTo(pedidos , {
    constraint: true ,
    foreignKey: 'pedido_id'
})

module.exports = Post_itenspedidos

Post_itenspedidos.sync({force: true})