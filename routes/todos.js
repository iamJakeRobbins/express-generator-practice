var express = require('express');
var router = express.Router();
const knex = require('../db/knex');

// this router is mounted at localhost:3000/todo
router.get('/', function(req, res, next) {
	knex('todos')
		.select()
		.then(todos => {
  res.render('all', { todos: todos});
})
});

module.exports = router;
