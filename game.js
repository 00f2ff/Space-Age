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

/* these are per minute */
var resourceRates = {
	crystal: undefined,
	steel: undefined,
	titanium: undefined,
	tritium: undefined
}

 

function init() {
	gameLoop();
}

init();

window.setInterval(gameLoop, 100);

function gameLoop() {
	updateResources();
	updateMinePrices();
}

function updateMinePrices() {
	var i, r, nextLevel, nextLevelIndex, j, r2, difference;
	for (i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		nextLevel = mineData.mineLevels[r] + 1;
		nextLevelIndex = nextLevel - 1;
		if (nextLevel <= 21) {
			for (j = 0; j < resourceTypes.length; j++) {
				r2 = resourceTypes[j];
				$('#'+r+'-mine .'+r2+'-price').html(mineCosts[r][r2][nextLevelIndex])
											  .removeClass('affordable')
											  .removeClass('unaffordable');
				if (resources[r] < mineCosts[r][r2][nextLevelIndex]) $('#'+r+'-mine .'+r2+'-price').addClass('unaffordable');
				else $('#'+r+'-mine .'+r2+'-price').addClass('affordable');
			}
			var difference = mineData.production[nextLevelIndex] - mineData.production[nextLevelIndex-1];
			$('#'+r+'-mine .rate-increase').html('+'+difference);
		} else {
			for (j = 0; j < resourceTypes.length; j++) {
				r2 = resourceTypes[j];
				$('#'+r+'-mine .'+r2+'-price').html('')
											  .removeClass('affordable')
											  .removeClass('unaffordable')
											  .addClass('no-upgrades');
			}
			$('#'+r+'-mine .rate-increase').html('')
										   .removeClass('affordable')
										   .removeClass('unaffordable')
									   	   .addClass('no-upgrades');
		}
	}
}

// this is mining-specific
function showPrices(resource, nextLevelIndex) {
	var r;
	for (var i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		// show price and affordability
		$('.'+r+'-count-decrease').html('-'+mineCosts[resource][r][nextLevelIndex]);
		console.log(mineCosts[resource][r][nextLevelIndex])
		if (resources[r] < mineCosts[resource][r][nextLevelIndex]) $('.'+r+'-count-decrease').css('color','red');
		else $('.'+r+'-count-decrease').css('color','green');
	}
	// show improvement
	var difference = mineData.production[nextLevelIndex] - mineData.production[nextLevelIndex];
	$('.'+resource+'-rate-increase').html('+'+difference);
}

function updateResources() {
	var r;
	for (var i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		// update resourceRates
		resourceRates[r] = mineData.production[mineData.mineLevels[r]-1];

		// update resources
		resources[r] += (resourceRates[r] / 600.0); // resources are per minute and loop runs every 1/10 second
		updateResourceUI(r);
	}
}

function updateResourceUI(resource) {
	$('.'+resource+'-count').html(Math.floor(resources[resource]));
	$('.'+resource+'-rate').html(Math.floor(resourceRates[resource]));
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
 *  - 
 *
 */