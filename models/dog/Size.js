var keystone = require('keystone'),
    Types = keystone.Field.Types;

var DogSize = new keystone.List('DogSize', {
    label: 'Tamanhos', singular: "Tamanho", plural: "Tamanhos",

    autokey: { path: 'slug', from: 'name', unique: true, index: true },
});

DogSize.add({
    name: { type: Types.Text, initial: true, required: true, unique: true }
});

DogSize.defaultColumns = 'name';

DogSize.register();