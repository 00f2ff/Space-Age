

function UI() {

}

// This should probably go somewhere else to not clutter the class, but I only use it here
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Put an alert on delete buttons (also make them red background)

// Note: this is going to get more complicated when I involve availability of mines and whatnot (also buy vs upgrade, etc)
// Note: I may want to do certain capitalizations / splitting of strings 
// Do I want to have an attribute pointing to category, name and instance for easier upgrading / click referencing?
// Also, this should run on start for mines, but only on other tab clicks. It should also remove previous table
UI.prototype.generateBuildingTable = function(category, effects) {
	var $table = $('<table class="table" data-category="'+category+'">\
						<thead>\
							<tr>\
								<th>'+category.capitalize()+'</th>\
								<th>Level</th>\
								<th>Crystal</th>\
					            <th>Steel</th>\
					            <th>Titanium</th>\
					            <th>Tritium</th>\
					            <th>Power</th>\
							</tr>\
						</thead>\
						<tbody>\
						</tbody>\
					</table>');
	// generate unique headers
	var $headerRow = $table.find('tr');
	for (var i = 0; i < effects.length; i++) {
		$headerRow.append('<th>'+effects[i].capitalize()+'</th>');
	}
	// generate header placeholder for upgrade, buy and delete buttons
	$headerRow.append('<th></th>');
	// generate body
	var $tbody = $table.find('tbody');
	for (var name in planet.buildings[category]) {
		if (!planet.buildings[category].hasOwnProperty(name)) continue;
		// loop through building instances
		var instances = planet.buildings[category][name];
		if (instances.length > 0) {
			for (var i = 0; i < instances.length; i++) {
				var index = instances[i];
				var $row = this.generateBuildingRow($tbody, category, name, effects, index);
				$tbody.append($row);
			}
		} else {
			// create row that can be bought
			var $row = this.generateBuildingRow($tbody, category, name, effects, -1);
			$tbody.append($row);
		}	
	}
	$('.container-fluid').append($table); // I should stick this in a row
}

// add a different number of buttons depending on whether building has been bought yet
UI.prototype.generateBuildingRow = function($tbody, category, name, effects, index) {
	var instanceData = buildingData[category][name];
	var nextLevelIndex = index + 1;
	var level = nextLevelIndex;
	/*
	 * To clarify: nextLevelIndex equals the index+1, which means we want to show it to users. 
	 * However, it's also the index of the cost we want to present for upgrading.
	 */
	// Need a naming exception if a building hasn't been bought yet
	if (nextLevelIndex === 0) level = 1;
	if (nextLevelIndex <= 21) {
		var $row = $('<tr>\
			<td>'+name.capitalize()+'</td>\
			<td>'+level+'</td>\
			<td>'+instanceData.cost.crystal[nextLevelIndex]+'</td>\
			<td>'+instanceData.cost.steel[nextLevelIndex]+'</td>\
			<td>'+instanceData.cost.titanium[nextLevelIndex]+'</td>\
			<td>'+instanceData.cost.tritium[nextLevelIndex]+'</td>\
			<td>'+instanceData.power[nextLevelIndex]+'</td>\
		</tr>');
	} else {
		var $row = $('<tr>\
			<td>'+name.capitalize()+'</td>\
			<td>'+level+'</td>\
			<td>--</td>\
			<td>--</td>\
			<td>--</td>\
			<td>--</td>\
			<td>--</td>\
		</tr>');
	}
	
	// add effect columns
	for (var j = 0; j < effects.length; j++) {
		if (effects[j] !== 'difference') {
			// show what it is for current level
			var effect = instanceData[effects[j]][index];
			if (!effect) effect = 0;
			$row.append('<td>'+effect+'</td>');
		} else if (effects[j] === 'difference' && index >= 0) {
			if (nextLevelIndex <= 21) {
				console.log(instanceData[effects[j-1]])
				var difference = instanceData[effects[j-1]][nextLevelIndex] - instanceData[effects[j-1]][index];
				$row.append('<td class="increase">+'+difference+'</td>');
			} else {
				$row.append('<td>--</td>');
			}
		} else if (effects[j] === 'difference' && index < 0) {
			// Note: this assumes 'difference' is never first element
			$row.append('<td class="increase">+'+instanceData[effects[j-1]][nextLevelIndex]+'</td>');
		}
	}
	$buttonTd = $('<td></td>')
	if (nextLevelIndex > 0) {
		// add upgrade button
		$upgradeButton = $('<button class="upgrade-button">Upgrade</button>');
		if (planet.canUpgradeBuilding(category, name, index)) $upgradeButton.css('color','green'); // -1 to get back to current index
		else $upgradeButton.css('color','red');
		$buttonTd.append($upgradeButton);
	}
	if (category === 'mine' || category === 'power' || category === 'storage' || planet.buildings[category][name].length === 0) {
		// add buy button
		$buyButton = $('<button class="buy-button">Buy</button>');
		if (planet.canBuyBuilding(category, name)) $buyButton.css('color','green');
		else $buyButton.css('color','red');
		$buttonTd.append($buyButton);
	}
	if (nextLevelIndex > 0) {
		// add delete button
		$deleteButton = $('<button class="delete-button">Delete</button>');
		$buttonTd.append($deleteButton);
	}
	$row.append($buttonTd);
	return $row;
}

UI.prototype.updateBuildingInformation = function() {
	// update all of that
}

UI.prototype.updateUIVariableInformation = function() {
	// this repopulates resource amounts, storage and mineRates
}

UI.prototype.visualLoop = function() {
	// calls the various things
	// this.generateBuildingTable('mine', ['production', 'difference']);
}