var keystone = require('keystone'),
    Types = keystone.Field.Types;

var DogGender = new keystone.List('DogGender', {
    label: 'Sexos', singular: "Sexo", plural: "Sexos",

    autokey: { path: 'slug', from: 'name', unique: true, index: true },
});

DogGender.add({
    name: { type: Types.Text, initial: true, required: true, unique: true }
});

DogGender.defaultColumns = 'name';

DogGender.register();