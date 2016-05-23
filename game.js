/*
 * In the interest of not overcomplicating this endeavor from the outset, I'm going to start small and gradually increase complexity
 */

var resources = {
	crystal: 1000,
	steel: 1000,
	titanium: 500,
	tritium: 1000,
	energy: 0
}

var storage = {
	crystal: undefined,
	steel: undefined,
	titanium: undefined,
	tritium: undefined
}

var resourceTypes = ["crystal", "steel", "titanium", "tritium", "energy"];

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
	this.strength = Math.round(Math.random() * (solarMultiplier.length - 1) + 1);
	this.multiplier = solarMultiplier[this.strength - 1];
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
	updateStoragePrices(); // I should be able to build an abstraction around this
	
}

function updateMultipliers() {
	for (var key in planetMultiplier) {
		if (!planetMultiplier.hasOwnProperty(key)) continue;
		$('.'+key+'-multiplier').html(planetMultiplier[key]);
	}
}

// This should happen at some point, but it's going to be brutal
function updateBuildingPrices(type) {

}

function updateStoragePrices() {
	var i, r, nextLevel, nextLevelIndex, j, r2, difference;
	for (i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		if (r === 'energy') continue; // energy doesn't have storage
		nextLevel = storageData.storageLevels[r] + 1;
		nextLevelIndex = nextLevel - 1;
		// mine button UI change
		if (canUpgradeBuilding('storage', r, nextLevelIndex)) $('#'+r+'-storage-button').css('color','green');
		else $('#'+r+'-storage-button').css('color','red');
		if (nextLevel <= 21) {
			for (j = 0; j < resourceTypes.length; j++) {
				r2 = resourceTypes[j];
				$('#'+r+'-storage .'+r2+'-price').html(storageCosts[r][r2][nextLevelIndex])
											  // .removeClass('affordable')
											  // .removeClass('unaffordable');
				// if (resources[r] < mineCosts[r][r2][nextLevelIndex]) $('#'+r+'-mine .'+r2+'-price').addClass('unaffordable');
				// else $('#'+r+'-mine .'+r2+'-price').addClass('affordable');
			}
			difference = storageData.storage[nextLevelIndex] - storageData.storage[nextLevelIndex-1];
			$('#'+r+'-storage .storage-increase').html('+'+difference);
		} else {
			for (j = 0; j < resourceTypes.length; j++) {
				r2 = resourceTypes[j];
				$('#'+r+'-storage .'+r2+'-price').html('');
											  // .removeClass('affordable')
											  // .removeClass('unaffordable')
											  // .addClass('no-upgrades');
			}
			$('#'+r+'-storage .storage-increase').html('');
										   // .removeClass('affordable')
										   // .removeClass('unaffordable')
									   	//    .addClass('no-upgrades');
		}
	}
}

function updateMinePrices() {
	var i, r, nextLevel, nextLevelIndex, j, r2, difference;
	for (i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		if (r === 'energy') continue; // energy doesn't have a mine
		nextLevel = mineData.mineLevels[r] + 1;
		nextLevelIndex = nextLevel - 1;
		// mine button UI change
		if (canUpgradeBuilding('mine', r, nextLevelIndex)) $('#'+r+'-mine-button').css('color','green');
		else $('#'+r+'-mine-button').css('color','red');
		if (nextLevel <= 21) {
			for (j = 0; j < resourceTypes.length; j++) {
				r2 = resourceTypes[j];
				$('#'+r+'-mine .'+r2+'-price').html(mineCosts[r][r2][nextLevelIndex])
											  // .removeClass('affordable')
											  // .removeClass('unaffordable');
				// if (resources[r] < mineCosts[r][r2][nextLevelIndex]) $('#'+r+'-mine .'+r2+'-price').addClass('unaffordable');
				// else $('#'+r+'-mine .'+r2+'-price').addClass('affordable');
			}
			difference = Math.round((mineData.production[nextLevelIndex] - mineData.production[nextLevelIndex-1]) * planetMultiplier[r] * 10) / 10;
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
		// update storage
		storage[r] = storageData.storage[storageData.storageLevels[r]-1]
		// update resources
		if (r === 'energy') updateResourceUI(resources[r]); // energy doesn't have a rate
		else if (resources[r] < storage[r]) resources[r] += (resourceRates[r] * planetMultiplier[r] / 600.0); // resources are per minute and loop runs every 1/10 second
		updateResourceUI(r);
	}
}

function updateResourceUI(resource) {
	$('.'+resource+'-count').html(Math.floor(resources[resource]));
	if (!planetMultiplier[resource]) {
		$('.'+resource+'-rate').html('--');
		$('.'+resource+'-storage').html('--');
	} else {
		$('.'+resource+'-rate').html(Math.round(resourceRates[resource] * planetMultiplier[resource] * 10) / 10);
		$('.'+resource+'-storage').html(storage[resource]);
	}
	$('.'+resource+'-level').html(mineData.mineLevels[resource]);
}

// supports mine and storage
$('button').click(function() {
	var type, resource, nextLevel, nextLevelIndex
	console.log($(this).parent().parent())
	type = $(this).parent().parent().attr('id').split('-')[1];

	resource = $(this).attr('id').split('-')[0];
	// I could use a switch here
	if (type === 'mine') nextLevel = mineData.mineLevels[resource] + 1;
	else if (type === 'storage') nextLevel = storageData.storageLevels[resource] + 1;
	nextLevelIndex = nextLevel - 1;
	if (nextLevel <= 21) {
		if (type === 'mine' && canUpgradeBuilding(type, resource, nextLevelIndex)) {
			upgradeBuilding(type, resource, nextLevelIndex);
		} else if (type === 'storage' && canUpgradeBuilding(type, resource, nextLevelIndex)) {
			upgradeBuilding(type, resource, nextLevelIndex);
		}
	}
})

/*
 * Abstracted upgrade function with support for different building types
 *** Todo: Should resource be an optional parameter since this assumes I'm working with mine or storage?
 */
function canUpgradeBuilding(type, resource, nextLevelIndex) {
	var buildingCosts, r; 
	switch(type) {
		case 'mine':
			buildingCosts = mineCosts;
			break;
		case 'storage':
			buildingCosts = storageCosts;
			break;
		default:
			return false;
			break;
	}
	for (var i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		if (resources[r] < buildingCosts[resource][r][nextLevelIndex]) return false;
	}
	return true;
}

/*
 * Abstracted upgrade function with support for different building types
 *** Todo: Should resource be an optional parameter since this assumes I'm working with mine or storage?
 */
function upgradeBuilding(type, resource, nextLevelIndex) {
	var buildingCosts; 
	switch(type) {
		case 'mine':
			mineData.mineLevels[resource]++;
			buildingCosts = mineCosts;
			break;
		case 'storage':
			storageData.storageLevels[resource]++;
			buildingCosts = storageCosts;
			break;
		default:
			return false;
			break;
	}
	for (var i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		resources[r] -= buildingCosts[resource][r][nextLevelIndex];
	}
}

/*
 * To Do
 *  - Energy
 *    - The PPG will be level 1 (make sure that equates to full power needs of level 1 of each mine)
 *    - All others won't have a level, and will need to be bought
 *    - Consider putting off implementation of feeder plants to reduce complexity. On the other hand, I could also implement them now
 *  - Periodically test to make sure I don't wait around too long for buildings. If that happens, create new price functions and adjust code to support that
 *  - Planet (start with just Super Terra)
 *  - Building spots + buildings, backward compatability for new power plants
 *    - Determine if I need to update building spots for allowing storage
 *  - Solar system (aka planet abstraction)
 *  - Tooltips (I can put this off by adding to reference, although it's a good idea to also provide tooltips)
 *  - Programmatic UI generation (or build with partials via Node). Show/hide also works
 */