
// First there's a sun
var sun = new Sun();
// Then there's your first planet
var planet = new Planet('superTerra', sun);
// Then we initiate the UI
var ui = new UI();
// Then we populate initial resource and building data

ui.generateBuildingTable('mine', ['production', 'difference']);
ui.generateBuildingTable('storage', ['storage', 'difference']);
// Then we start the game loop
window.setInterval(game, 100);

function game() {
	planet.dataLoop();
	ui.visualLoop();
}