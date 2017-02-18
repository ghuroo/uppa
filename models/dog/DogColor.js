var keystone = require('keystone'),
    Types = keystone.Field.Types;

var DogColor = new keystone.List('DogColor', {
    label: 'Colors', singular: "Color", plural: "Colors",
});

DogColor.add({
    name: { type: Types.Text, initial: true, required: true, unique: true }
});

DogColor.defaultColumns = 'name';

DogColor.register();
