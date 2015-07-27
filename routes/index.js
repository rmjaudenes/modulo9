
var express = require('express');
var router = express.Router();

//importar el enrutador
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

var authorController= require ('../controllers/author_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

//autoload de comandos con :quizId
router.param('quizId', quizController.load);

//Definición de rutas de sesión
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión



//el enrutador es esta pagina, index.js, ha de importar el controlador
//llevan a ejecutar las acciones referiadas a question y answer
//definicion de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);


router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);


router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

//creamos las primitivas en el interfaz REST
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);

router.get('/author',   authorController.author);


module.exports = router;