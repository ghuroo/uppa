var keystone = require('keystone'),
	async = require('async'),
	DogCoat = keystone.list('DogCoat'),
    _ = require('underscore');

var items = [
    { name: 'Nenhuma' },
    { name: 'Curta' },
    { name: 'Comprida' },
];

function createItem(item, done) {
	new DogCoat.model(item).save(function(err) {

		if (err) {
			console.error("Error adding item " + item.name + " to the database:");
			console.error(err);
		} else {
			console.log("Added item " + item.name + " to the database.");
		}

		done();
	});
}

exports = module.exports = function(done) {
	async.forEach(items, createItem, done);
};
