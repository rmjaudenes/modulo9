//que importe el modelo a través de models.js

var models = require('../models/models.js');

// GET/quizes/question
//ahora las preguntas se han de buscar
//en la base de datos

//GET/quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  })
};



//GET/quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: quiz});
  })
};





//aplicando findAll devuelve un array con el contenido
//de la base de datos
//con success introducimos el callback
//que renderiza quizes.question pasandole como
//pregunta o respueta el contenido en la base de datos
// GET/quizes/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer',{quiz:quiz,  respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', {quiz:quiz, respuesta: 'Incorrecto'});
    }
  })
};