//creamos así la tabla,con una función
//Definición del modelo Quiz
//creamos un fichero quiz.js

//a sequelize se le aaplica la funcion .define
//le pasamos, el nombre de la tabla, que se llama Quiz
//y los objetos
//el nombre de la tabla en mayúscula Quiz
//poqrue es un constructor de objetos

// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      }
    }
  );
}



    //son dos campos tipo string, pregunta y respuesta

