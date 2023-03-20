const Sequelize = require('sequelize')
const db = require ('./db');
const produtos = require ('./produtos_bd')
const clientes = require ('./clientes_bd')

//https://www.macoratti.net/asp_50.htm

const Post_carrinho = db.sequelize.define('carrinho' , {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
        
    codigo: {
        type: db.Sequelize.STRING,
        allowNull: true,   
    },
        
    quantidade: {
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    },
            
    total: {
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    },
            
    valor: {
        type: db.Sequelize.DECIMAL,
        allowNull: true,   
    }
    
    
})

Post_carrinho.belongsTo(produtos , {
    constraint: true ,
    foreignKey: 'produto_id'
}),

Post_carrinho.belongsTo(clientes , {
    constraint: true ,
    foreignKey: 'cliente_id'
})


module.exports = Post_carrinho

Post_carrinho.sync({force: true})