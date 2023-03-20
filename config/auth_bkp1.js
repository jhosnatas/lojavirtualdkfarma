const localStrategy = require("passport-local").Strategy ;
const database = require("../models/db") ;
const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');
const passport = require("passport");

const Usuario = require("../models/clientes_bd");
//const { Passport } = require("passport");
require("../models/clientes_bd");

//const emailfindone = Clientes.findOne({where: {id:'1'} })
module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'txtEmail' , passwordField: 'txtSenha'},(email, senha , done) => {
        Usuario.findOne({where: {email: email}}).then((usuario) => {
            if (!usuario){
                return done(null, false , {message : "Email nao cadastrado"})
            }
            bcrypt.compare(senha, usuario.password , (erro , batem ) => {
                if (batem){
                    return done (null , usuario)
                }else{
                    return done(null , false , {message:"Senha incorreta"})
                }
            })
        })
    }))
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })
    passport.deserializeUser((id , done) =>{
        Usuario.findbyid(id , (err, usuario) =>{
          done(err, usuario) 
        })
    })
}
