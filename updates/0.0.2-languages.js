var keystone = require('keystone'),
	async = require('async'),
	Language = keystone.list('Language'),
    _ = require('underscore');

languages = keystone.get('languages');
var items = [];
_.each(languages, function(object){ items.push({ iso: object.value, name: object.label }); });

function createItem(item, done) {
	new Language.model(item).save(function(err) {

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
