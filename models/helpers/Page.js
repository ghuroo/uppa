var keystone = require('keystone'),
    utils = keystone.utils,
    Types = keystone.Field.Types,
    Language = keystone.list('Language');

var Page = new keystone.List('Page', {
    nodelete: true,
    hidden: true,
});

Page.add(
    'Details',
    {
        name: { type: Types.Text, initial: true, required: true },
        key: { type: Types.Text, unique: true, index: true, initial: false, noedit: true },
        URL: { type: Types.Text, noedit: true }
    },
    'Tipology',
    {
        type: { type: Types.Text, required: true, initial: true }
    },
    'Localization',
    {
        language: { type: Types.Relationship, ref: 'Language', many: false, required: true, initial: true },
    }
);

// set key
Page.schema.pre('save', function(next) {
    var schema = this;
    schema.key = '';
    schema.key += schema.type;

    Language.model.findById(this.language, function (err, result) {
        schema.key += '-' + result.iso;
        schema.key = utils.slug(schema.key);

        next();
    });
});

// ui columns
Page.defaultColumns = 'name, URL, type, language';

Page.register();
