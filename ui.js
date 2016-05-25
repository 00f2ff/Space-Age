

function UI() {

}

// This should probably go somewhere else to not clutter the class, but I only use it here
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

UI.prototype.generateBuildingTable = function(category, attributes) {
	// delete existing one
	$('.table[data-category="'+category+'"]').remove();
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
	for (var i = 0; i < attributes.length; i++) {
		$headerRow.append('<th>'+attributes[i].capitalize()+'</th>');
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
				var level = instances[i];
				var $row = this.generateBuildingRow($tbody, category, name, attributes, level, i);
				$tbody.append($row);
			}
		} else {
			// create row that can be bought
			var $row = this.generateBuildingRow($tbody, category, name, attributes, 0, 0);
			$tbody.append($row);
		}	
	}
	$('.container-fluid').append($table); // I should stick this in a row
}

UI.prototype.addAttributeColumnsToRow = function(attributes, buildingClass, level, $row) {
	var nextLevel = level + 1;
	var attributeValue, difference;
	for (var j = 0; j < attributes.length; j++) {
		if (attributes[j] !== 'difference') {
			// show what attribute value is for current level
			attributeValue = buildingClass[attributes[j]](level); // e.g. mine.production(1)
			$row.append('<td>'+attributeValue+'</td>');
		} else if (attributes[j] === 'difference' && level > 0) {
			if (nextLevel <= 21) {
				// calculate difference in attribute values
				difference = buildingClass[attributes[j]](nextLevel) - buildingClass[attributes[j]](level);
				$row.append('<td class="increase">+'+difference+'</td>');
			} else {
				$row.append('<td>--</td>');
			}
		} else if (attributes[j] === 'difference' && index === 0) { // buy case
			// Note: this assumes 'difference' is never first element
			$row.append('<td class="increase">+'+buildingClass[attributes[j]](nextLevel)+'</td>');
		}
	}
	return $row;
}

UI.prototype.addButtonColumnToRow = function(category, name, level, instance, attributes, $row) {
	$buttonTd = $('<td></td>')
	$buttonTd.attr({'data-category': category, 'data-name': name, 'data-level': level, 'data-instance': instance, 'data-attributes': attributes})
	if (nextLevel > 0) {
		// add upgrade button
		$upgradeButton = $('<button class="upgrade-button">Upgrade</button>');
		if (planet.canUpgradeBuilding(category, name, level)) $upgradeButton.css('color','green');
		else $upgradeButton.css('color','red');
		$buttonTd.append($upgradeButton);
	}
	// *** What is the purpose of this big or thing?
	if (category === 'mine' || category === 'power' || category === 'storage' || planet.buildings[category][name].length === 0) {
		// add buy button
		$buyButton = $('<button class="buy-button">Buy</button>');
		if (planet.canBuyBuilding(category, name)) $buyButton.css('color','green');
		else $buyButton.css('color','red');
		$buttonTd.append($buyButton);
	}
	if (nextLevel > 0) {
		// add delete button
		$deleteButton = $('<button class="delete-button">Delete</button>');
		$buttonTd.append($deleteButton);
	}
	$row.append($buttonTd);
	return $row;
}

UI.prototype.generateBuildingRow = function($tbody, category, name, attributes, level, instance) {
	var buildingClass, powerCost, resourceCost;
	switch(category) {
		case 'mine': 
			buildingClass = mine;
			break;
		case 'storage':
			buildingClass = storage;
			break;
		case 'power':
			buildingClass = power;
			break;
		default:
			break;
	}
	// determine costs
	powerCost = buildingClass.power(nextLevel);
	resourceCost = buildingClass.cost(nextLevel, name);
	var nextLevel = level + 1;
	if (nextLevel <= 21) {
		var $row = $('<tr>\
			<td>'+name.capitalize()+'</td>\
			<td>'+level+'</td>\
			<td>'+resourceCost.crystal+'</td>\
			<td>'+resourceCost.steel+'</td>\
			<td>'+resourceCost.titanium+'</td>\
			<td>'+resourceCost.tritium+'</td>\
			<td>'+powerCost+'</td>\
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
	$row = this.addAttributeColumnsToRow(attributes, buildingClass, level, $row)
	$row = this.addButtonColumnToRow(category, name, level, instance, attributes, $row);
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