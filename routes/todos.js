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

router.get('/new', (req,res) =>{
	res.render('new')
})

router.get('/:id/edit', (req,res) => {
	const id = req.params.id;
	knex('todos')
	.select()
	.where('id', id)
	.first()
	.then(todos =>{
	res.render('edit', todos)
})
})

router.get('/:id', (req,res) =>{
	const id = req.params.id;
	if (typeof id != 'undefined') {
		knex('todos')
		.select()
		.where ('id', id)
		.first()
		.then(todos => {
		res.render('single', todos)
	})
	}else {
		res.status(500)
		res.render('error', {
			message: 'invalid todo'
	})
}
})

function validTodo(todos){
	return typeof todos.title == 'string' &&
		todos.title.trim() != '' &&
		typeof todos.priority != 'undefined'
}


function newfunction(req,res,callback){
	if(validTodo(req.body)){
		const todos = {
			title: req.body.title,
			description: req.body.description,
			priority: req.body.priority
		};

		callback(todos);
} else {
	res.status(500)
	res.render('error', {
		message: 'invalid todo'
	})
}
}
router.post('/', (req, res) =>{
	newfunction(req,res,(todos) =>{
		knex('todos').insert(todos, 'id')
		.then(ids => {
			const id = ids[0];
			console.log(id)
			res.redirect(`/todos/${id}`)
		})
})
});

router.put('/:id', (req, res) =>{
newfunction(req,res,(todos)=> {
	knex('todos')
	.where('id', req.params.id)
	.update(todos, 'id')
	then(() =>{
		const id = ids[0]
		res.redirect(`/todos/${id}`)
	})
})
})

module.exports = router;
