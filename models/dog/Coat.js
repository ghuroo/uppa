var keystone = require('keystone'),
    Types = keystone.Field.Types;

var DogCoat = new keystone.List('DogCoat', {
    label: 'Pelagens', singular: "Pelagem", plural: "Pelagens",

    autokey: { path: 'slug', from: 'name', unique: true, index: true },
});

DogCoat.add({
    name: { type: Types.Text, initial: true, required: true, unique: true }
});

DogCoat.defaultColumns = 'name';

DogCoat.register();