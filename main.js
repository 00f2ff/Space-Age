
// First there's a sun
var sun = new Sun();
// Then there's your first planet
var planet = new Planet('superTerra', sun);
// Then we initiate the UI
var ui = new UI();
// Then we populate initial resource and building data

ui.generateBuildingTable('mine', ['production', 'difference']);
// a planet has storage, and storage has capacity
ui.generateBuildingTable('storage', ['capacity', 'difference']);
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
});