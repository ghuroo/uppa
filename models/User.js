var keystone = require('keystone'),
    Types = keystone.Field.Types;

var User = new keystone.List('User', {
    // label: 'Utilizadores', singular: "Utilizador", plural: "Utilizadores",

    autokey: { path: 'slug', from: 'email', unique: true },
    noedit: false,
    track: true
});

User.add(
    'Account',
    {
        name: { type: Types.Name, initial: true, required: true, hidden: false },
        email: { type: Types.Email, initial: true, hidden: false, unique: true },
        password: { type: Types.Password, initial: true, required: false, hidden: true }
    },

    'Permissions',
    { isAdmin: { type: Types.Boolean, initial: false, required: false, default: false, noedit: true } }
);

// virtual schema
User.schema.virtual('canAccessKeystone').get(function () {
	if (this.isAdmin) return true;
});

User.schema.virtual('fullName').get(function () {
	return this.name.first + ' ' + this.name.last;
});

// ui columns
User.defaultColumns = 'name, email, createdAt';

User.register();
