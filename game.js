/*
 * In the interest of not overcomplicating this endeavor from the outset, I'm going to start small and gradually increase complexity
 */

var resources = {
	crystal: 1000,
	steel: 1000,
	titanium: 500,
	tritium: 1000
}

/* these are per minute */
var resourceRates = {
	crystal: undefined,
	steel: undefined,
	titanium: undefined,
	tritium: undefined
}

 

function init() {
	updateResources();
}

init();

window.setInterval(gameLoop, 100);

function gameLoop() {
	updateResources();

}

function updateResources() {
	for (var key in resources) {
		if (!resources.hasOwnProperty(key)) continue;
		// update resourceRates
		resourceRates[key] = mineData.production[mineData.mineLevels[key]-1]

		// update resources
		resources[key] += (resourceRates[key] / 600.0); // resources are per minute and loop runs every 1/10 second
		updateResourceUI(key);
	}
}

function updateResourceUI(resource) {
	$('.'+resource+'-count').html(Math.floor(resources[resource]));
	$('.'+resource+'-rate').html(Math.floor(resourceRates[resource]));
}

$('button').click(function() {
	var resource = $(this).attr('id').split('-')[0];
	if (mineData.mineLevels[resource] < 21) mineData.mineLevels[resource]++;
})