var keystone = require('keystone'),
	async = require('async'),
	DogSize = keystone.list('DogSize'),
    _ = require('underscore');

var items = [
    { name: 'Pequeno (0kg ~ 9kg)' },
    { name: 'Médio (10kg ~ 24kg)' },
    { name: 'Grande (25kg ~ 44kg)' },
    { name: 'Gigante (45kg ~ 60kg)' }
];

function createItem(item, done) {
	new DogSize.model(item).save(function(err) {

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
