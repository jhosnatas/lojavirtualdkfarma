//sequelize db
const Sequelize = require('sequelize');
//const { default: ModelManager } = require('sequelize/types/model-manager');

const sequelize = new Sequelize('dkfarmadbs' , 'admin' , 'admin' , {host :'144.22.209.192', dialect: 'mysql'});

module.exports = { Sequelize: Sequelize , sequelize: sequelize}
