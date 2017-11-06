
exports.up = function(knex, Promise) {
	 return Promise.all([
	knex.schema.createTable('todos', (table) => {
		table.increments().primary;
		table.text('title');
		table.text('description');
		table.integer('priority');
	})
])
};

exports.down = function(knex, Promise) {
	return Promise.all([
	knex.schema.dropTable('todos')
])
};
