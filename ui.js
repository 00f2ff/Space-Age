

function UI() {
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
								<th>'+category+'</th>\
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
		$headerRow.append('<th>'+effects[i]+'</th>');
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
				var $row = this.generateBuildingRow($tbody, category, name, effects, index+1); // +1 to go to next level
				$tbody.append($row);
			}
		} else {
			// create row that can be bought
			var $row = this.generateBuildingRow($tbody, category, name, effects, 0);
			$tbody.append($row);
		}	
	}
	$('.container-fluid').append($table); // I should stick this in a row
}

// add a different number of buttons depending on whether building has been bought yet
UI.prototype.generateBuildingRow = function($tbody, category, name, effects, index) {
	var instanceData = buildingData[category][name];
	if (index <= 21) {
		var $row = $('<tr>\
			<td>'+name+'</td>\
			<td>'+(index+1)+'</td>\
			<td>'+instanceData.cost.crystal[index]+'</td>\
			<td>'+instanceData.cost.steel[index]+'</td>\
			<td>'+instanceData.cost.titanium[index]+'</td>\
			<td>'+instanceData.cost.tritium[index]+'</td>\
			<td>'+instanceData.power[index]+'</td>\
		</tr>');
	} else {
		var $row = $('<tr>\
			<td>'+name+'</td>\
			<td>'+(index)+'</td>\
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
			if (index <= 21) $row.append('<td>'+instanceData[effects[j]][index]+'</td>');
			else $row.append('<td>'+instanceData[effects[j]][index-1]+'</td>');
		} else if (effects[j] === 'difference' && index > 0) {
			if (index <= 21) {
				var difference = instanceData[effects[j-1]][index] - instanceData[effects[j-1]][index-1];
				$row.append('<td class="increase">+'+difference+'</td>');
			} else {
				$row.append('<td>--</td>');
			}
		} else if (effects[j] === 'difference' && index === 0) {
			$row.append('<td class="increase">+'+instanceData[effects[j-1]][index]+'</td>');
		}
	}
	$buttonTd = $('<td></td>')
	if (index > 0) {
		// add upgrade button
		$upgradeButton = $('<button class="upgrade-button">Upgrade</button>');
		if (planet.canUpgradeBuilding(category, name, index-1)) $upgradeButton.css('color','green'); // -1 to get back to current index
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
	if (index > 0) {
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