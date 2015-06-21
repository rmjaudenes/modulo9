//que importe el modelo a través de models.js

var models = require('../models/models.js');

// GET/quizes/question
//ahora las preguntas se han de buscar
//en la base de datos
exports.question = function(req, res) {
  models.Quiz.findAll().then(function(quiz) {
    res.render('quizes/question', { pregunta: quiz[0].pregunta});
  })
};
//aplicando findAll devuelve un array con el contenido
//de la base de datos
//con success introducimos el callback
//que renderiza quizes.question pasandole como
//pregunta o respueta el contenido en la base de datos
// GET/quizes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll().then(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/answer', { respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', { respuesta: 'Incorrecto'});
    }
  })
};