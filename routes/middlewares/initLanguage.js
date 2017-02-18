var keystone = require('keystone'),
    i18n = require('i18n'),
    Language = keystone.list('Language');

// sends current language to controllers
exports = module.exports = function(req, res, next) {

    var locals = res.locals;

    Language.model.findOne()
    .where('iso', i18n.getLocale())
    .exec(function(err, language) {
        res.language = language;

        next();

    });

};
