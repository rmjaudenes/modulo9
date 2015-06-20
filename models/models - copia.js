//en este fichero definimos como se construye todo el modelo
//importamos path y luego sequelize, porque con ello
//construimos nuestro modelo

var path= require ('path');
var Sequelize = require('sequelize');
//luego se crea la variable sequelize
//luego se crea un objeto con este modulo
//clase squelize, como si fuera la clase de bases de datos
//al constructor del objeto se le pasan 3 nulos
//el dialecto que es squlite yluego storage, fichero donde se guardaran
//los datos

var sequelize= new Sequelize (null, null, null,
                {dialect: "sqlite", storage: "quiz.sqlite"}
                     
                              );

//ahora se  le importa la tabla creada en quiz.js
//a sequelize se le aplica el metodo import con la ruta al fichero quiz


var Quiz=sequelize.import (path.join(__dirname, 'quiz'));
//aqui se epxorta para que se pueda aplicar a otros lugares
//de la aplicación
exports.Quiz = Quiz;
//Ahora se crea la base de datos y se inicializa
//sincronizando el modelo
//con .sync se inicializa la base de datos del modelo
//se instala con success un callback con la base de datos

sequelize.sync().success(function() {
    
    //quiz.count dice el numero de filas que hay en la tabla
    Quiz.count().success(function(count){
        if (count===0) {
            Quiz.create ({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
                
            })
        .success(function(){console.log('Base de datos inicializada')});
        };
        
        
        });
    
    
});