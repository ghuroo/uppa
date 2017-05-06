var keystone = require('keystone'),
	async = require('async'),
	DogRace = keystone.list('DogRace'),
    _ = require('underscore');

var items = [
    { name: "Alano Espanhol" },
    { name: "Airedale Terrier " },
    { name: "American Staffordshire Terrier " },
    { name: "American Water Spaniel " },
    { name: "Antigo Cão de Pastor Inglês" },
    { name: "Basset Azul da Gasconha " },
    { name: "Basset Fulvo da Bretanha" },
    { name: "Basset Hound " },
    { name: "Beagle " },
    { name: "Bearded Collie " },
    { name: "Bichon Maltês " },
    { name: "Bobtail " },
    { name: "Border Collie " },
    { name: "Boston Terrier " },
    { name: "Boxer " },
    { name: "Bull Terrier " },
    { name: "Bullmastiff" },
    { name: "Bulldog " },
    { name: "Cão de Montanha dos Pirinéus" },
    { name: "Caniche " },
    { name: "Chihuahua" },
    { name: "Cirneco do Etna" },
    { name: "Chow Chow " },
    { name: "Cocker Spaniel (Americano ou Inglês)" },
    { name: "Dálmata " },
    { name: "Dobermann " },
    { name: "Dogue Alemão" },
    { name: "Dogue Argentino" },
    { name: "Dogue Canário" },
    { name: "Fox Terrier " },
    { name: "Foxhound" },
    { name: "Galgo" },
    { name: "Golden Retriever " },
    { name: "Gos d'Atura " },
    { name: "Husky Siberiano" },
    { name: "Laika " },
    { name: "Labrador Retriever	" },
    { name: "Malamute-do-Alasca" },
    { name: "Mastin dos Pirenéus" },
    { name: "Mastin do Tibete" },
    { name: "Mastin Espanhol" },
    { name: "Mastín Napolitano" },
    { name: "Pastor Alemão" },
    { name: "Pastor Belga " },
    { name: "Pastor de Brie" },
    { name: "Pastor dos Pirenéus de Cara Rosa " },
    { name: "Pequinês" },
    { name: "Perdigueiro" },
    { name: "Pitbull " },
    { name: "Podengo" },
    { name: "Pointer " },
    { name: "Pug" },
    { name: "Rhodesian Ridgeback" },
    { name: "Rottweiler " },
    { name: "Rough Collie" },
    { name: "Sabueso (Espanhol ou Italiano)" },
    { name: "Saluki" },
    { name: "Samoiedo " },
    { name: "São Bernardo " },
    { name: "Scottish Terrier " },
    { name: "Setter Irlandés " },
    { name: "Shar-Pei " },
    { name: "Shiba Inu " },
    { name: "Smooth Collie" },
    { name: "Staffordshire Bull Terrier" },
    { name: "Teckel" },
    { name: "Terra-nova " },
    { name: "Terrier Australiano" },
    { name: "Terrier Escocês " },
    { name: "Terrier Irlandês " },
    { name: "Terrier Japonês" },
    { name: "Terrier Negro Russo" },
    { name: "Terrier Norfolk" },
    { name: "Terrier Norwich" },
    { name: "Terrier Tibetano" },
    { name: "Welhs Terrier" },
    { name: "West Highland T." },
    { name: "Wolfspitz" },
    { name: "Yorkshire Terrier" }
];

function createItem(item, done) {
	new DogRace.model(item).save(function(err) {

		if (err) {
			console.error("Error adding item " + item.name + " to the database:");
			console.error(err);
		} else {
			console.log("Added item " + item.name + " to the database.");
		}

		done();
	});
}

exports = module.exports = function(done) {
	async.forEach(items, createItem, done);
};
