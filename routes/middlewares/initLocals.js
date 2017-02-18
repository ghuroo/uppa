var keystone = require('keystone');

// initialises the standard view locals & include anything that should be initialised before route controllers are executed.
exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    locals.user = req.user;
    locals.package = keystone.get('package');

    next();

};
