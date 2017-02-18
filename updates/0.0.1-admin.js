var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var items = [
	{
		name: { first: 'Admin', last: 'Uppa' },
        email: 'admin@uppa.com',
        password: 'changethis',
        isAdmin: true
    }
];

function createAdmin(item, done) {
	User.model.findOne({ email: item.email }).exec(function(err, result) {
		item.isAdmin = true;
		new User.model(item).save(function(err) {

			if (err) {
				console.error("Error adding item " + item.email + " to the database:");
				console.error(err);
			} else {
				console.log("Added item " + item.email + " to the database.");
			}

			done();
		});
	});
}

exports = module.exports = function(done) {
	async.forEach(items, createAdmin, done);
};
