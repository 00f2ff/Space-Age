
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
$('button').click(function() {
	switch($(this).attr('class')) {
		case 'buy-button':
			console.log($(this).parent().data());
			// If the index is -1, we just update the row / buy
			// remember to verify if purchase is acceptable
			// If the index is >= 0, we buy and regenerate the table (new instance)
			break;
		case 'upgrade-button':

			break;
		case 'delete-button':
			var del = confirm("Are you sure you want to delete this building?");
			if (del) {

			} else {

			}

			break;
		default:
			break;
	}
});