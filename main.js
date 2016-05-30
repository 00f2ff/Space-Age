
// First there's a sun
var sun = new Sun();

// Then there's your first planet
var planet = new Planet('super_terra', sun);

// Then we initiate the UI
var ui = new UI();

// Then we populate initial resource and building data
ui.generateResourceTable();

ui.generateBuildingTable('mine', ['production', 'difference']);

// a planet has storage, and storage has capacity
// ui.generateBuildingTable('storage', ['capacity', 'difference']);

// ui.generateBuildingTable('power', ['production', 'difference']);

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
			break;
		default:
			break;
	}
})


/*
 * To Do
 *  - Add input-output power plants (will need special scalability UI; probably worth sticking in its own table below other plants)
 *  - Other building table + UI support
 *  - Special building / ship / defense unlock file + classes
 *  - Research (IBRT)
 *  - Ships / missions
 *  - Solar system (aka planet abstraction)
 *  - Periodically test to make sure I don't wait around too long for buildings. If that happens, create new price functions and adjust code to support that
 *  
 *  - Tooltips (I can put this off by adding to reference, although it's a good idea to also provide tooltips)
 *
 *
 * Considerations
 *  - prevent shifting of button UI from upgrade / buy to upgrade / buy / delete (separate columns, redo part of ui.js)
 */

