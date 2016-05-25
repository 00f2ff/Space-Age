
// First there's a sun
var sun = new Sun();
// Then there's your first planet
var planet = new Planet('superTerra', sun);
// Then we initiate the UI
var ui = new UI();
// Then we populate initial resource and building data
ui.generateResourceTable();
ui.generateBuildingTable('mine', ['production', 'difference']);
// a planet has storage, and storage has capacity
ui.generateBuildingTable('storage', ['capacity', 'difference']);
ui.generateBuildingTable('power', ['production', 'difference']);
// Then we start the game loop
window.setInterval(game, 100);

function game() {
	planet.dataLoop();
	ui.visualLoop();
}

//// INTERACTION HANDLERS ////
$(document).on('click', 'button', function() {
	var data = $(this).parent().data(); // contains all necessary lookup information to determine outcome of click
	switch($(this).attr('class')) {
		case 'buy-button':
			planet.buyBuilding(data.category, data.name);
			break;
		case 'upgrade-button':
			planet.upgradeBuilding(data.category, data.name, data.instance);
			break;
		case 'delete-button':
			var del = confirm("Are you sure you want to delete this building?");
			if (del) planet.deleteBuilding(data.category, data.name, data.instance);
			break;
		default:
			break;
	}
	// Regenerate table
	ui.generateBuildingTable(data.category, data.effects.split(','));
	console.log(planet.power);
	console.log(planet.resources);
	console.log(planet.mineRates);
	// console.log(planet.storage);
});


/*
 * To Do
 *  - Periodically test to make sure I don't wait around too long for buildings. If that happens, create new price functions and adjust code to support that
 *  - Solar system (aka planet abstraction)
 *  - Tooltips (I can put this off by adding to reference, although it's a good idea to also provide tooltips)
 */



 /*
   I wonder if there's an easier way to do all of this. I'm spending a lot of time debugging because of weird index dependencies
   and list arrangements. I think I can simplify all of this by:
   1) Creating cost, production and energy use functions
   	-- Don't worry about sticking to the particulars of my previous data, since it might not even be scaled well
   2) Looking into the constructor pattern (and maybe playing around more with data-attributes)



 */