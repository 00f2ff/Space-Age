
/*
 * I'm using the module pattern to encapsulate data about the user. (but not yet for debugging / structure purposes)
 * 
 * Things to look into:
 *  - Saving to localstorage
 *  - Running while tab not open
 *  - Calculating difference when user opens tab again / returns to tab 
 *  - Initial user values are subject to change
 */

var user = (function() {

	// private variables
	var username;
	var resources = {
		crystal: 1000,
		steel: 1000,
		titanium: 500,
		tritium: 1000
	}


	// writing methods for easy return readability




	return {

	}

})();

function User(name) {
	this.username = name;
	this.planets = [];
}

// var planetaryResourceEffects = [
// 	{
// 		crystal: 
// 		tritium: 0.9,
// 		steel: 1.1,
// 		titanium: 1.1
// 	},
// 	{
// 		tritium: 0.95,
// 		steel: 1.05,
// 		titanium: 1.05
// 	},
// 	{
// 		tritium: 1,
// 		steel: 1,
// 		titanium: 1
// 	},
// 	{
// 		tritium: 1.05,
// 		steel: 0.95,
// 		titanium: 0.95
// 	},
// 	{
// 		tritium: 1.1,
// 		steel: 0.9,
// 		titanium: 0.9
// 	}
// ];

function Planet(type) {
	this.type = type;

}

var solarResourceEffects = [
	{
		tritium: 0.9,
		steel: 1.1,
		titanium: 1.1
	},
	{
		tritium: 0.95,
		steel: 1.05,
		titanium: 1.05
	},
	{
		tritium: 1,
		steel: 1,
		titanium: 1
	},
	{
		tritium: 1.05,
		steel: 0.95,
		titanium: 0.95
	},
	{
		tritium: 1.1,
		steel: 0.9,
		titanium: 0.9
	}
];

function Sun() {
	this.strength = Math.round(Math.random() * (solarResourceEffects.length-1));
	this.resourceEffect = solarResourceEffects(this.strength);
}
