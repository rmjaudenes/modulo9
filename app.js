var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
importamos el paquete ene l fichero
*/
var partials = require ('express-partials');


var methodOverride= require ('method-override');
// se importa el paquete express-session instalado
var session = require('express-session');

var routes = require('./routes/index');
//lo elimino poneindo comentarios var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
se instala el middleware importado arriba generado
como un objeto en la factoría de objetos
*/
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015')); //añadir semilla 'Quiz 2015' para cifrar cookie
app.use(session());//instalar MW session
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


//
app.use(function(req, res, next){
  
    
    // con javaScript metemos en dos variables tanto la fecha como la hora de esa fecha de acceso
    // y en otra variable un valor que serán los milisengudos que han de pasar para la cancelación
    var fecha = new Date ();
    var hora = fecha.getTime ();
    
    var cancelacion = 120000;
    /*
    console.log (fecha);
    console.log (hora);
*/
   // dos ifs anidados para realizar la acción de cancelar el usuario si sobrepasa el intervalo de tiempo
    
    if(req.session && req.session.login) {
      
    var intervalo = hora - req.session.login;
        
        if (cancelacion <= intervalo){
         
            delete req.session.user;
           
        }
        
    }
   
     req.session.login = hora;
   
    next();
});





//guardar path de la solicitud que llega en session.redir para depués del login
// Helpers dinamicos:
app.use(function(req, res, next) {

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

app.use('/', routes);
//lo elimino poniendo comentarios app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;