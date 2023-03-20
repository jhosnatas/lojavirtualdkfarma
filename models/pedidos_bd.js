const Sequelize = require('sequelize')
const db = require ('./db');
const produtos = require ('./produtos_bd')
const clientes = require ('./clientes_bd')
const carrinho = require ('./carrinho_bd')

//https://www.macoratti.net/asp_50.htm

const Post_pedidos = db.sequelize.define('pedidos' , {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
        
    pagamento: {
        type: db.Sequelize.STRING,
        allowNull: true,   
    },
        
    valor_frete:{
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    },
    valor_total:{
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    },
    valor_itens:{
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    },
        
        
    status:{
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    }
    
})

Post_pedidos.belongsTo(clientes , {
    constraint: true ,
    foreignKey: 'cliente_id'
})


module.exports = Post_pedidos

//Post_pedidos.sync({force: true})