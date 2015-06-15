
var express = require('express');
var router = express.Router();

//importar el enrutador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//el enrutador es esta pagina, index.js, ha de importar el controlador
//llevan a ejecutar las acciones referiadas a question y answer
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer',   quizController.answer);


module.exports = router;

