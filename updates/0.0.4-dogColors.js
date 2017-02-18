var keystone = require('keystone'),
	async = require('async'),
	DogColor = keystone.list('DogColor'),
    _ = require('underscore');

var configItems = keystone.get('dogColors');
var items = [];
_.each(configItems, function(object){ items.push({ name: object.label }); });

function createItem(item, done) {
	new DogColor.model(item).save(function(err) {

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
