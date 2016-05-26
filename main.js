
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
	console.log(data.attributes)
	ui.generateBuildingTable(data.category, data.attributes.split(','));

	ui.generateResourceTable();
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
 *  - 
 *  - Buildings (fleet, economy, etc)
 *  - Technology
 *  - Research (IBRT)
 *  - Ships / missions
 *  - Solar system (aka planet abstraction)
 *  - Periodically test to make sure I don't wait around too long for buildings. If that happens, create new price functions and adjust code to support that
 *  
 *  - Tooltips (I can put this off by adding to reference, although it's a good idea to also provide tooltips)
 *
 *
 * Considerations
 *  
 */

