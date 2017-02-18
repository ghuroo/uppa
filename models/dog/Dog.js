var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Dog = new keystone.List('Dog', {
    // label: 'Cão', singular: "Cão", plural: "Cães",

    autokey: { path: 'slug', from: 'name', unique: true },
    track: true
});

Dog.add(
    'Dados',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Nome' },
        color: { type: Types.Relationship, ref: 'DogColor', many: true, initial: true, required: true, label: 'Cor' },
        photo: { type: Types.CloudinaryImage, initial: true, label: 'Foto' }
    }
);

// virtual schema
Dog.schema.virtual('canAccessKeystone').get(function () {
	if (this.isAdmin) return true;
});

// ui columns
Dog.defaultColumns = 'name, color, photo, createdBy';

Dog.register();
