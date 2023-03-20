const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
 
module.exports = function (passport) {
 
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
 
    passport.deserializeUser(async (id, done) => {
        try {
            const db = require('../models/db');
            const user = await db.findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
 
    passport.use(new LocalStrategy({
        usernameField: 'txtEmail',
        passwordField: 'txtSenha'
    },
        async (username, password, done) => {
            try {
                //const db = require('../models/db');
                const Usuario = require("../models/clientes_bd");
                //const user = await db.findUser(username);
                const user = await Usuario.findOne({where: {email: username}});

                console.log(user);

                // usuário inexistente
                if (!user) { return done(null, false) }
 
                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.password);
                if (!isValid) return done(null, false)
                
                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}