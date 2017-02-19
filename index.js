var keystone = require('keystone'),
    package = require('./package.json'),
    i18n = require('i18n'),
    _ = require('underscore'),
    environment = process.env.NODE_ENV || 'development';

// versioning
package.version_src = '?v=' + package.version;

// .env
require('dotenv').config();

// languages
var languages = [
    { value: 'pt', label:'Português' },
    // { value: 'en', label:'English' }
];

var dogColors = [
    { value: 'black', label:'Preto' },
    { value: 'brown', label: 'Castanho' },
    { value: 'beige', label: 'Bege' }
];

// localization
i18n.configure({
    locales: _.map(languages, function(language) { return language.value; }),
    directory: __dirname + '/locales',
    autoReload: true,
    syncFiles: true,
    objectNotation: true,
    defaultLocale: 'pt',
});

keystone.init({

    'port': process.env.PORT || 3000,

    // app info
    'name': package.title,
    'appname': package.name,
    'version': package.version,

    // package object with project related data
    'package': package,

    // public assets folder
    'static': ['assets/public'],

    'views': 'templates/views',
    'view engine': 'pug',

    'auto update': true,
    // 'mongo': 'mongodb://localhost/' + package.name,
    'mongo': process.env.MONGO_URI,

    'session': true,
    'user model': 'User',
    'auth': true,
    'cookie secret': process.env.COOKIE_SECRET,

    // cloudinary
    'cloudinary config': process.env.CLOUDINARY_URL,
    'cloudinary prefix': package.name,
    'cloudinary folders': true,

    // helpers
    'languages': languages, // languages array to be populated
    'dogColors': dogColors, // array to be populated

});

// models
require('./models');

keystone.set('routes', require('./routes'));

keystone.set( 'nav', {
    'utilizadores': [
        'User'
    ],
    'cães': [
        'Dog',
        'DogColor'
    ],
});

keystone.set('signin logo', '../img/favicon/favicon-160.png');

// iframe
keystone.set('frame guard', true);

keystone.start();
