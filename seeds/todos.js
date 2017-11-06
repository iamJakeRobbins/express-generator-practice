
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {
					id: 1,
					title: 'make a todo list',
					description: '',
					priority: 1
			},

      ]);
    });
};
