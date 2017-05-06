var keystone = require('keystone'),
    importRoutes = keystone.importer(__dirname),
    i18n = require('i18n'),
    initErrorHandlers = require('./middlewares/initErrorHandlers.js'),
    flashMessages = require('./middlewares/flashMessages.js'),
    initPage = require('./middlewares/initPage.js'),
    initLanguage = require('./middlewares/initLanguage.js'),
    initLocals = require('./middlewares/initLocals.js');

// i18n support
keystone.pre('routes', i18n.init);

// send language to controllers
keystone.pre('routes', initLanguage);

// error handling
keystone.pre('routes', initErrorHandlers);

// handle page, language, navigation menu & page locale versions
keystone.pre('render', initPage);

// handle locals to front-end
keystone.pre('render', initLocals);

// flash messages
keystone.pre('render', flashMessages);

// load routes
var routes = {
    views: importRoutes('./views')
};

function redirect(req, res, next) {
    res.status(302).redirect('/keystone');
}

// bind routes
exports = module.exports = function(app) {

    app.all('/', redirect, routes.views.home);

    // admin
    app.get('/keystone', function(req, res)  { res.redirect(301, '/admin'); });

};
