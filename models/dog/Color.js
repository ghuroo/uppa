var keystone = require('keystone'),
    Types = keystone.Field.Types;

var DogColor = new keystone.List('DogColor', {
    label: 'Cores', singular: "Cor", plural: "Cores",

    autokey: { path: 'slug', from: 'name', unique: true, index: true },
});

DogColor.add({
    name: { type: Types.Text, initial: true, required: true, unique: true }
});

DogColor.defaultColumns = 'name';

DogColor.register();
