var keystone = require('keystone'),
    Types = keystone.Field.Types;

var DogRace = new keystone.List('DogRace', {
    label: 'Raças', singular: "Raça", plural: "Raças",

    autokey: { path: 'slug', from: 'name', unique: true, index: true },
});

DogRace.add({
    name: { type: Types.Text, initial: true, required: true, unique: true }
});

DogRace.defaultColumns = 'name';

DogRace.register();