var keystone = require('keystone'),
	async = require('async'),
	DogGender = keystone.list('DogGender'),
    _ = require('underscore');

var items = [
    { name: 'Macho' },
    { name: 'Fêmea' }
];

function createItem(item, done) {
	new DogGender.model(item).save(function(err) {

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
