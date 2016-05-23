/*
 * In the interest of not overcomplicating this endeavor from the outset, I'm going to start small and gradually increase complexity
 */

var resources = {
	crystal: 1000,
	steel: 1000,
	titanium: 500,
	tritium: 1000
}

var resourceTypes = ["crystal", "steel", "titanium", "tritium"];

/* these are per minute, and are base (resources update with multiplier, however) */
var resourceRates = {
	crystal: undefined,
	steel: undefined,
	titanium: undefined,
	tritium: undefined
}

var solarMultiplier = [
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

var planetMultiplier = { // just contains resource multipliers
	crystal: 1,
	steel: 1,
	titanium: 1,
	tritium: 1
}

var sun;

function Sun() {
	this.strength = Math.round(Math.random() * (solarMultiplier.length-1) + 1);
	this.multiplier = solarMultiplier[this.strength];
	for (var key in this.multiplier) {
		if (!this.multiplier.hasOwnProperty(key)) continue;
		planetMultiplier[key] *= this.multiplier[key];
	}
}

function init() {
	sun = new Sun();
	$('.sun').html($('.sun').html()+' '+sun.strength)
	gameLoop();
}

init();

window.setInterval(gameLoop, 100);

function gameLoop() {
	updateMultipliers();
	updateResources();
	updateMinePrices();
	
}

function updateMultipliers() {
	for (var key in planetMultiplier) {
		if (!planetMultiplier.hasOwnProperty(key)) continue;
		$('.'+key+'-multiplier').html(planetMultiplier[key]);
	}
}

function updateMinePrices() {
	var i, r, nextLevel, nextLevelIndex, j, r2, difference;
	for (i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		nextLevel = mineData.mineLevels[r] + 1;
		nextLevelIndex = nextLevel - 1;
		// mine button UI change
		if (canUpgradeMine(r, nextLevelIndex)) $('#'+r+'-button').css('color','green');
		else $('#'+r+'-button').css('color','red');
		if (nextLevel <= 21) {
			for (j = 0; j < resourceTypes.length; j++) {
				r2 = resourceTypes[j];
				$('#'+r+'-mine .'+r2+'-price').html(mineCosts[r][r2][nextLevelIndex])
											  // .removeClass('affordable')
											  // .removeClass('unaffordable');
				// if (resources[r] < mineCosts[r][r2][nextLevelIndex]) $('#'+r+'-mine .'+r2+'-price').addClass('unaffordable');
				// else $('#'+r+'-mine .'+r2+'-price').addClass('affordable');
			}
			var difference = Math.round((mineData.production[nextLevelIndex] - mineData.production[nextLevelIndex-1]) * planetMultiplier[r] * 10) / 10;
			$('#'+r+'-mine .rate-increase').html('+'+difference);
		} else {
			for (j = 0; j < resourceTypes.length; j++) {
				r2 = resourceTypes[j];
				$('#'+r+'-mine .'+r2+'-price').html('');
											  // .removeClass('affordable')
											  // .removeClass('unaffordable')
											  // .addClass('no-upgrades');
			}
			$('#'+r+'-mine .rate-increase').html('');
										   // .removeClass('affordable')
										   // .removeClass('unaffordable')
									   	//    .addClass('no-upgrades');
		}
	}
}

function updateResources() {
	var r;
	for (var i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		// update resourceRates
		resourceRates[r] = mineData.production[mineData.mineLevels[r]-1];

		// update resources
		resources[r] += (resourceRates[r] * planetMultiplier[r] / 600.0); // resources are per minute and loop runs every 1/10 second
		updateResourceUI(r);
	}
}

function updateResourceUI(resource) {
	$('.'+resource+'-count').html(Math.floor(resources[resource]));
	$('.'+resource+'-rate').html(Math.round(resourceRates[resource] * planetMultiplier[resource] * 10) / 10);
	$('.'+resource+'-level').html(mineData.mineLevels[resource]);
}

// currently this just handles mine upgrading. I'll need to abstract this later on
$('button').click(function() {
	var resource = $(this).attr('id').split('-')[0];
	var nextLevel = mineData.mineLevels[resource] + 1;
	var nextLevelIndex = nextLevel - 1;
	if (nextLevel <= 21) {
		if (canUpgradeMine(resource, nextLevelIndex)) {
			upgradeMine(resource, nextLevelIndex);
		}
	}
})

function canUpgradeMine(resource, nextLevelIndex) {
	var r;
	for (var i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		if (resources[r] < mineCosts[resource][r][nextLevelIndex]) return false;
	}
	return true;
}

function upgradeMine(resource, nextLevelIndex) {
	mineData.mineLevels[resource]++;
	var r;
	for (var i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		resources[r] -= mineCosts[resource][r][nextLevelIndex];
	}
}


/*
 * To Do
 *  - Support UI changes
 *  - Energy
 *  - Update rates to allow scaled; same with energy generation (if applicable)
 *  - Planet (start with just Super Terra)
 *  - Building spots + buildings
 *  - Sun
 *  - Solar system (aka planet abstraction)
 *  - Tooltips
 *  - Programmatic UI generation (or build with partials via Node)
 */