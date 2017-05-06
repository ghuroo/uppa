var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Dog = new keystone.List('Dog', {
    label: 'Cães', singular: "Cão", plural: "Cães",

    autokey: { path: 'slug', from: 'name', unique: true, index: true },
    track: true
});

Dog.add(
    'Geral',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Nome' },
        photo: { type: Types.CloudinaryImages, initial: true, label: 'Foto' },
        birthday: { type: Types.Date, initial: true, label: 'Data de Nascimento' },
        gender: { type: Types.Relationship, ref: 'DogGender', initial: true, label: 'Sexo' },
    },
    'Anatomia Animal',
    {
        race: { type: Types.Relationship, ref: 'DogRace', label: 'Raça' },
        color: { type: Types.Relationship, ref: 'DogColor', many: true, label: 'Cor' },
        coat: { type: Types.Relationship, ref: 'DogCoat', many: true, label: 'Pelagem' },
        size: { type: Types.Relationship, ref: 'DogSize', many: true, label: 'Porte' },
        notes: { type: Types.Text, label: 'Sinais Particulares' },
    },
    'Uppa',
    {
        microchipNumber: { type: Types.Number, label: 'Nº de Microchip' },
        clinicSituation: { type: Types.Text, label: 'Situação Clínica' },
        entranceDate: { type: Types.Datetime, label: 'Data de Entrada' },
        adoptionDate: { type: Types.Datetime, label: 'Data de Adopção' },
    }
);

// ui columns
Dog.defaultColumns = 'name, photo, gender, race, color, coat, size, microchipNumber';

Dog.register();
