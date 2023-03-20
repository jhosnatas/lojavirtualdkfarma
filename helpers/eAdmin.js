module.exports = {
    eAdmin: function(req, res , next){
        if(req.isAuthenticated()){
            return next();
        }

        req.flash("error_msg", "Voce deve estar logado")
        res.redirect("/login")

    }
}