var express = require('express');
var bodyParser = require('body-parser') ;
var app = express();
//const handlebars = require('express-handlebars');
var PORT = 3000;

//carregado helps de logado 

const {eAdmin} = require("./helpers/eAdmin")

//app.engine('handlebars' , handlebars.engine({defaultLayout : 'main'}))
//app.set('view engine', 'handlebars')

const flash = require('connect-flash');

// trazendo contato_db
const Post_postagens = require('./models/contato_db');
const { response, application } = require('express');

//cadastro bd
const Post_cadastro = require('./models/clientes_bd');
const Post_produtos = require('./models/produtos_bd');
const Post_carrinho = require('./models/carrinho_bd');
const Post_pedidos = require('./models/pedidos_bd');

//login engine
const passport = require("passport");
const session = require('express-session');
require("./config/auth")(passport);

//sessão
app.use(session({
  secret: "cursodenode",
  resave: true,
  saveUninitialized: true ,
  cookie : { maxAge: (1000 * 60 * 100) }
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())


//middleware login engine flash message
app.use((req , res , next ) =>{
  res.locals.sussess_msg = req.flash("sucess_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null;
  res.locals.usuario = req.usuario || null;
  next()
})

//app.locals.user = user || null;

// View engine setup
app.set('view engine', 'ejs');
//configurando body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
//add pasta publica
app.use(express.static('./public'));

//jason
app.use(express.json()) ;


// Without middleware
app.get('/home_ORIGINAL', function(req, res){
    // Rendering home.ejs page
    res.render('home');
})



app.get('/home', function(req, res ){
  Post_produtos.findAll( {
  }).then((produto) => {
  //console.log(produto)
  // res.status(200).send(produto)
  res.render('home', {produto: produto} )
}).catch((err) =>{
  console.log("error ao listar produtos" + err)
  //res.redirect("/home")
} )
})

app.get('/', function(req, res){
  res.redirect('/home');
})

app.get('/login', function(req, res){
  // Rendering home.ejs page
  res.render('login');
})

app.get('/cadastrarnovasenha', function(req, res){
  res.render('cadastrarnovasenha');
})

app.get('/base', function(req, res){
  res.render('base');
})

app.get('/login_erro', function(req, res){
  res.render('login_erro');
})


app.get('/cadastro', function(req, res){
  res.render('cadastro');
})

app.get('/carrinho', eAdmin ,function(req, res ){
  Post_carrinho.findAll(
    {
      attributes: [ 
        'id', 'cliente_id', 'produto_id','quantidade'
    ] ,
       where: {cliente_id: res.locals.user.id},
      include: [{
        model:Post_produtos , attributes: 
        [
          'valor' , 'nome' , 'urlimagem' , 'descricao'
        ]
     }]
    }
    ).then((carrinho) => {
      
      const viewcart = carrinho.map(viewitem => {
        return{
          id: viewitem.id,
          prodID: viewitem.produto_id,
          prodqtt: viewitem.quantidade,
          prodnome: viewitem.produto.nome,
          prodimg: viewitem.produto.urlimagem,
          descricao: viewitem.produto.descricao,
          valor: viewitem.produto.valor,
          userID: viewitem.cliente_id
        }
      })      
      const total_item = viewcart.map(valor => {
        return{
          valor: valor.valor * valor.prodqtt
        }
      })
      console.log(total_item)
      var total_cart= viewcart.reduce(getTotal, 0);
      function getTotal(total, item) {
        return total + (item.valor * item.prodqtt);
        }
      console.log(total_cart)
     // res.status(200).send(selah)
    res.render('carrinho', 
    {
      carrinho: viewcart ,
      total_item: total_item ,
      total_cart: total_cart
    })
    }).catch((err) =>{
    //console.log("error ao listar produtos")
    res.redirect("/login")
    })
})


app.get('/pedidos', eAdmin ,function(req, res ){
  Post_carrinho.findAll(
    {
      attributes: [ 
        'id', 'cliente_id', 'produto_id','quantidade'
    ] ,
       where: {cliente_id: res.locals.user.id},
      include: [{
        model:Post_produtos , attributes: 
        [
          'valor' , 'nome' , 'urlimagem' , 'descricao'
        ]
     }]
    }
    ).then((carrinho) => {
      
      const viewcart = carrinho.map(viewitem => {
        return{
          id: viewitem.id,
          prodID: viewitem.produto_id,
          prodqtt: viewitem.quantidade,
          prodnome: viewitem.produto.nome,
          prodimg: viewitem.produto.urlimagem,
          descricao: viewitem.produto.descricao,
          valor: viewitem.produto.valor,
          userID: viewitem.cliente_id
        }
      })      
      const total_item = viewcart.map(valor => {
        return{
          valor: valor.valor * valor.prodqtt
        }
      })
      console.log(total_item)
      var total_cart= viewcart.reduce(getTotal, 0);
      function getTotal(total, item) {
        return total + (item.valor * item.prodqtt);
        }
      console.log(total_cart)
     // res.status(200).send(selah)
    res.render('pedidos', 
    {
      carrinho: viewcart ,
      total_item: total_item ,
      total_cart: total_cart
    })
    }).catch((err) =>{
    //console.log("error ao listar produtos")
    res.redirect("/login")
    })
})



app.post("/add_carinho", eAdmin ,function(request, response, next){
  Post_carrinho.create({
    produto_id: request.body.prodID,
    cliente_id: response.locals.user.id,
    quantidade: '1'
  }).then(function(){
    //response.send("Post criado com sucesso")
    response.redirect("/carrinho")
  }).catch(function(error){
    response.send("ocorreu um erro" + error)
  })
});


app.post("/add_pedido", eAdmin ,function(request, response, next){
  Post_pedidos.create({
    cliente_id: response.locals.user.id,
    valor_total: request.body.valor_total ,
    valor_frete: request.body.valor_frete ,
    valor_itens : request.body.total_cart ,
    pagamento: request.body.pagamento ,
    status: '1'
  }).then(function(){
    //response.send("Post criado com sucesso")
    console.log(request)
    response.redirect("/limpa_carrinho")
  }).catch(function(error){
    response.send("ocorreu um erro" + error)
  })
});

app.post('/del_carrinho', eAdmin ,function(request, response ){
  Post_carrinho.destroy(
    {
      where: {cliente_id: response.locals.user.id , id: request.body.id }
    }).then(function(){
      //response.send("Post criado com sucesso")
      response.redirect("/carrinho")
    }).catch(function(error){
      response.send("ocorreu um erro" + error)
    })
})


app.get('/limpa_carrinho', eAdmin ,function(request, response ){
  Post_carrinho.destroy(
    {
      where: {cliente_id: response.locals.user.id}
    }).then(function(){
      //response.send("Post criado com sucesso")
      response.redirect("/fechamento_pedido")
    }).catch(function(error){
      response.send("ocorreu um erro" + error)
    })
})

app.get('/cliente', eAdmin , function(req, res){
  res.render('cliente');
})

app.get('/cliente_contatos', eAdmin , function(req, res){
  res.render('cliente_contatos');
})

app.get('/cliente_dados', eAdmin , function(req, res){
  res.render('cliente_dados');
})

app.get('/cliente_endereco', eAdmin , function(req, res){
  res.render('cliente_endereco');
})

app.get('/cliente_favoritos', eAdmin , function(req, res){
  res.render('cliente_favoritos');
})

app.get('/cliente_pedidos', eAdmin , function(req, res){
  res.render('cliente_pedidos');
})

app.get('/cliente_senha', eAdmin , function(req, res){
  res.render('cliente_senha');
})

app.get('/confirmcadastrosenha' , function(req, res){
  res.render('confirmcadastrosenha');
})

app.get('/confirmcontato', function(req, res){
  res.render('confirmcontato');
})

app.get('/confirmrecupsenha', function(req, res){
  res.render('confirmrecupsenha');
})

app.get('/contato', function(req, res){
  res.render('contato');
})

app.get('/fechamento_endereco', eAdmin , function(req, res){
  res.render('fechamento_endereco');
})

app.get('/fechamento_itens_original', eAdmin , function(req, res){
  res.render('fechamento_itens');
})


app.get('/fechamento_itens', eAdmin ,function(req, res ){
  Post_carrinho.findAll(
    {
      attributes: [ 
        'id', 'cliente_id', 'produto_id','quantidade'
    ] ,
       where: {cliente_id: res.locals.user.id},
      include: [{
        model:Post_produtos , attributes: 
        [
          'valor' , 'nome' , 'urlimagem' , 'descricao'
        ]
     }]
    }
    ).then((carrinho) => {
      
      const viewcart = carrinho.map(viewitem => {
        return{
          id: viewitem.id,
          prodID: viewitem.produto_id,
          prodqtt: viewitem.quantidade,
          prodnome: viewitem.produto.nome,
          prodimg: viewitem.produto.urlimagem,
          descricao: viewitem.produto.descricao,
          valor: viewitem.produto.valor,
          userID: viewitem.cliente_id
        }
      })      
      const total_item = viewcart.map(valor => {
        return{
          valor: valor.valor * valor.prodqtt
        }
      })
      console.log(total_item)
      var total_cart= viewcart.reduce(getTotal, 0);
      function getTotal(total, item) {
        return total + (item.valor * item.prodqtt);
        }

        let total_frete = total_cart + 10
        
      //  console.log(total_cart)
      //console.log(total_frete)
     // res.status(200).send(selah)
    res.render('fechamento_itens', 
    {
      carrinho: viewcart ,
      total_item: total_item ,
      total_cart: total_cart,
      total_frete: total_frete
    })
    }).catch((err) =>{
    //console.log("error ao listar produtos")
    res.redirect("/login")
    })
})


app.get('/fechamento_pagamento', eAdmin , function(req, res){
  res.render('fechamento_pagamento');
})

app.get('/produto_original', function(req, res ){
  //mensagem: request.body.txtMensagem
 // Post_produtos.findOne({where: {id: 1}}).then((produto) => {
    Post_produtos.findOne({
      where: {id: 1}
    }).then((produto) => {
    var imgName = produto.urlimagem
    res.render('produto', {produto: produto, imgName: imgName} )
  }).catch((err) =>{
    console.log("error ao listar produtos")
    res.redirect("/home")
  } )
})


app.get('/produto', function(req, res ){
    Post_produtos.findOne( {
      where: {id: req.query.prodID }
    }).then((produto) => {
    var imgName = produto.urlimagem
    res.render('produto', {produto: produto, imgName: imgName} )
  }).catch((err) =>{
    console.log("error ao listar produtos" + err)
    res.redirect("/home")
  } )
})

/*
app.get('/fechamento_pedido', eAdmin , function(req, res){
  //Vehicle.max('id', {where : {'vsr_id': 342 }})
  Post_pedidos.max('id', { where : {'cliente_id': res.locals.user.id }})
  .then(function(vehicle_id){
     ...
  })
  .error(function(error){
     ...
  });
})
*/


app.get('/fechamento_pedido', function(req, res ){
  //Post_produtos.findAll( {
  Post_pedidos.max('id', { where : {
    'cliente_id': res.locals.user.id 
  }
  }).then((pedido) => {
  //console.log(produto)
  // res.status(200).send(produto)
  res.render('fechamento_pedido', {pedido: pedido} )
}).catch((err) =>{
  console.log("error ao criar pedido" + err)
  //res.redirect("/home")
} )
})


app.post("/logindkf", (req , res , next) => {
  passport.authenticate("local", {
    successRedirect: ("/carrinho") ,
    failureRedirect: "/login_erro",
    failureFlash: true   
  })(req , res , next)
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
      req.flash('success_msg', "Deslogado com sucesso!")
      res.redirect("/")
  })
})

app.post("/contato_rota", function(request, response, next){
  Post_postagens.create({
    nome: request.body.txtNomeCompleto,
    email: request.body.txtEmail,
    mensagem: request.body.txtMensagem
  }).then(function(){
    //response.send("Post criado com sucesso")
    response.redirect('/home')
  }).catch(function(error){
    response.send("ocorreu um erro" + error)
  })
});

app.post("/cadastro_rota", function(request, response, next){
  Post_cadastro.create({
    nome: request.body.txtNome,
    cpf: request.body.txtCPF,
    nascimento: request.body.txtDataNascimento,
    email: request.body.txtEmail,
    telefone: request.body.txtTelefone,
    cep: request.body.txtCEP,
    numero: request.body.txtNumero,
    rua: request.body.txtNome,
    complemento: request.body.txtComplemento,
    referencia: request.body.txtReferencia,
    password: request.body.txtSenha
  }).then(function(){
    ///response.send("Cliente cadastrado com sucesso")
    response.redirect('/cliente')
  }).catch(function(error){
    response.send("ocorreu um erro" + error)
  })
});

 app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
