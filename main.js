
// First there's a sun
var sun = new Sun();

// Then there's your first planet
var planet = new Planet('super_terra', sun);

// Then we initiate the UI
var ui = new UI();

// Then we populate initial resource and mine data
ui.generateResourceTable();

ui.generateBuildingTable('mine', ['production', 'difference']);

// Then we start the game loop
window.setInterval(game, 100);

function game() {
	planet.dataLoop();
	ui.visualLoop();
}

//// INTERACTION HANDLERS ////
$(document).on('click', 'button', function() {
	var data = $(this).parent().data(); // contains all necessary lookup information to determine outcome of click

	// change in data and on UI <-- should auto update...
	switch($(this).attr('class')) {
		case 'buy-button':
			planet.buyBuilding(data.category, data.name);
			break;
		case 'upgrade-button':
			planet.upgradeBuilding(data.category, data.name, data.level, data.instance);
			break;
		case 'delete-button':
			var del = confirm("Are you sure you want to delete this building?");
			if (del) planet.deleteBuilding(data.category, data.name, data.level, data.instance);
			break;
		default:
			break;
	}
	// Regenerate table
	ui.generateBuildingTable(data.category, data.attributes.split(','));

	ui.generateResourceTable();
	console.log(planet)
});

/*
 * Note: code will break if 'difference' comes before what you're trying to find the difference of
 */
$(document).on('click', 'li a', function() {
	$('li.active').removeClass('active');

	$(this).parent().addClass('active');

	switch($(this).text().toLowerCase()) {
		case 'mine':
			ui.generateBuildingTable('mine', ['production', 'difference']);
			break;
		case 'storage':
			ui.generateBuildingTable('storage', ['capacity', 'difference']);
			break;
		case 'power':
			ui.generateBuildingTable('power', ['production', 'difference']);
			ui.generateBuildingTable('io', ['output_multiplier', 'difference']); // different enough that it needs its own table
			break;
		case 'economy':
			ui.generateBuildingTable('economy', ['traders', 'difference']);
			break;
		case 'fleet':
			ui.generateBuildingTable('fleet', ['ship_rate_multiplier', 'difference']);
			break;
		case 'defense':
			ui.generateBuildingTable('defense', ['defense_rate_multiplier', 'difference']);
			break;
		case 'technology':
			ui.generateBuildingTable('technology', ['batch_size', 'difference']);
			break;
		default:
			break;
	}
});

/*
 * Only for test purposes; remove later
 * 
 * categories is array of categories of which all buildings will be set to level 10
 */
function cheat(categories) {
	planet.storage = {
		crystal: 2000000000,
		steel: 200000000,
		titanium: 200000000,
		tritium: 20000000
	}
	planet.resources = {
		crystal: 2000000000,
		steel: 200000000,
		titanium: 200000000,
		tritium: 20000000
	}
	planet.power = 2000000000;

	for (var i = 0; i < categories.length; i++) {
		for (var name in planet.buildings[categories[i]]) {
			if (!planet.buildings[categories[i]].hasOwnProperty(name)) continue;
			planet.buildings[categories[i]][name] = [20];
		}
	}
	console.log(planet.buildings.mine)
}


/*
 * To Do
 *  - Go into a new branch and play around with refactoring ui.js into table, button, cell, etc factories. It's getting incredibly
 *    long and complex, and I'd like to make it easier to parse / learn some JS design patterns
 *    - In the same vein, consider how I might use a pub/sub or observer pattern for updating cells / buttons on resource change
 *  - Other building UI support
 *  - Special ship / defense unlock file + classes (model after algo)
 *  - Research (IBRT)
 *  - Ships / missions
 *  - Solar system (aka planet abstraction)
 *  - Periodically test to make sure I don't wait around too long for buildings. If that happens, create new price functions and adjust code to support that
 *  
 *  - Tooltips (I can put this off by adding to reference, although it's a good idea to also provide tooltips)
 *    - Esp. important regarding level unlocking, tech unlocking, why something might not be available, etc
 *
 *
 * Considerations
 *  - prevent shifting of button UI from upgrade / buy to upgrade / buy / delete (separate columns, redo part of ui.js)
 *  - changing ship_rate_multiplier to ship_build_speed and making it a % on the UI
 *    - current implementation might make users think speed is declining, 
 */

