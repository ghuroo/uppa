var keystone = require('keystone'),
	async = require('async'),
	Page = keystone.list('Page'),
	Language = keystone.list('Language');

var items = [
	// pt
    { language: 'pt', URL: '/', name: 'Home', type: 'home' },

	// en
    // { language: 'en', URL: '/', name: 'Home EN', type: 'home' },
];

function createItem(item, done) {
	Language.model.findOne({ iso: item.language }).exec(function(err, result) {
        item.language = result;

		new Page.model(item).save(function(err) {

			if (err) {
				console.error("Error adding page " + item.name + " to the database:");
				console.error(err);
			} else {
				console.log("Added page " + item.name + " to the database.");
			}

			done();
		});
	});
}

exports = module.exports = function(done) {
	async.forEach(items, createItem, done);
};
