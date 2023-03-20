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
           // console.log(usuario);
            //console.log(usuario.password);
            if ( usuario == null ){
                console.log("Email nao encontrado")
                return done(null, false , {message : "Email nao cadastrado"})
            }
            if(senha == usuario.password ){
                return done (null , usuario)
            }else{
                console.log("senha incorreta")
                return done(null , false , {message : "Senha incorreta"})
            }
        })
    }))
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser(function(id, done) {
        Usuario.findOne({where:{id:id}}).then((usuario) => {
            done(null, usuario);
        }).catch((err) => {
            done(err, null);
        });
      })
}

