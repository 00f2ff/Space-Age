
/*
 * The class that contains all DOM modifications
 */
function UI() {

}

/*
 * Extension of String.prototype that capitalizes the first letter of a string, or splits and capitalizes a string
 *
 * return String
 */
String.prototype.capitalize = function() {
	// won't look good for io, so hardcode that
	if (this[0] === 'i' && this[1] === 'o') {
		return 'Input-Output';
	}

	var stringArray,
		returnString = '',
		i;

	// check if snake_case
	if (this.indexOf('_') > -1) {
		stringArray = this.split('_');
	}
	else {
		stringArray = [this]
	}

	for (i = 0; i < stringArray.length; i++) {
		returnString += stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);

		if (i < stringArray.length - 1) {
			returnString += ' ';
		}
	}
    return returnString;
}

UI.prototype.generateSecondaryInterface = function(category) {
	// clear secondary UI
	$('#secondary-active-wrapper').empty();
	switch(category) {
		case 'io':
			for (var i = 0; i < planet.resource_types.length; i++) {
				this.generateIOSecondaryInterface(planet.resource_types[i]);
			}
			break;
		case 'economy':
			this.generateEconomySecondaryInterface();
			break;
		case 'fleet':
			break;
		case 'defense':
			break;
		case 'technology':
			break;
		default:
			break;
	}
}

UI.prototype.generateEconomySecondaryInterface = function() {
	var $div = $('<div class="row col-md-7"></div>');
	var $table = $('<table class="table table-bordered">\
			        <thead>\
			          <tr> \
			            <th class="col-md-6">Trade Center</th>\
			            <th class="col-md-3">\
			            	<div class="dropdown">\
  								<button class="btn btn-default dropdown-toggle" type="button" id="trade-center-give" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\
    							Give\
							    <span class="caret"></span>\
								</button>\
								<ul class="dropdown-menu" aria-labelledby="trade-center-dropdown">\
								    <li><a href="#">Crystal</a></li>\
								    <li><a href="#">Steel</a></li>\
								    <li><a href="#">Titanium</a></li>\
								    <li><a href="#">Tritium</a></li>\
								</ul>\
							</div>\
			            </th>\
			            <th class="col-md-3">\
			            	<div class="dropdown trade-center-dropdown">\
  								<button class="btn btn-default dropdown-toggle" type="button" id="trade-center-receive" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\
    							Receive\
							    <span class="caret"></span>\
								</button>\
								<ul class="dropdown-menu" aria-labelledby="trade-center-dropdown">\
								    <li><a href="#">Crystal</a></li>\
								    <li><a href="#">Steel</a></li>\
								    <li><a href="#">Titanium</a></li>\
								    <li><a href="#">Tritium</a></li>\
								</ul>\
							</div>\
			            </th>\
			          </tr>\
			        </thead>\
			        <tbody>\
			          <tr>\
			            <td class="col-md-6 slider-cell" style="padding-left:40px"></td>\
			            <td class="col-md-3" id="'+resource+'-slider-deduction"></td>\
			            <td class="col-md-3" id="'+resource+'-slider-production"></td>\
			          </tr>\
			        </tbody>\
			      </table>'); // need a button that executes the trade too
	var $slider = $('<input class="slider" type="text"/>');
	$slider.attr({
		'data-slider-id': plant, 
		'data-slider-step': 1, 
		'data-slider-value': planet.mine_rate_deductions[resource], 
		'data-slider-min': 0, 
		'data-slider-max': planet.mine_rates[resource]
	});
	
	$table.find('.slider-cell').append($slider);
	$div.append($table);
	$('#secondary-active-wrapper').append($div);
	// needs to be appended to DOM before it can be activated
	$slider.slider()
		   .on('slide', function(e) {
		   		var rateDeduction = e.value;
		   		var powerIncrease = e.value * planet.io_multipliers[plant];
		   		// reduce energy by previous increase
		   		planet.power -= (planet.mine_rate_deductions[resource] * planet.io_multipliers[plant]);
		   		// increase energy
		   		planet.power += powerIncrease;
		   		// reset rate deduction
		   		planet.mine_rate_deductions[resource] = rateDeduction;

		   		$('#'+resource+'-slider-deduction').html(rateDeduction);
		   		$('#'+resource+'-slider-production').html(powerIncrease);
		   });
	// since planet.io_multipliers are set to 1 by default for easy scaling, using a slider when a plant is either level
	// 0 or 1 would result in the same effect
	if (planet.buildings.io[plant].length === 0) {
		$slider.slider('disable');
	}
	else {
		$slider.slider('enable');
	}
}

UI.prototype.generateIOSecondaryInterface = function(resource) {
	var plant;
	switch(resource) {
		case 'crystal':
			plant = 'liquid_power_plant';
			break;
		case 'steel':
			plant = 'furnace_power_plant';
			break;
		case 'titanium':
			plant = 'furnace_power_plant';
			break;
		case 'tritium':
			plant = 'nuclear_power_plant';
			break;
		default:
			break;
	}
	var $div = $('<div class="row col-md-7"></div>');
	var $table = $('<table class="table table-bordered">\
			        <thead>\
			          <tr> \
			            <th class="col-md-6">'+plant.capitalize()+'</th>\
			            <th class="col-md-3">'+resource.capitalize()+' Rate</th>\
			            <th class="col-md-3">Energy</th>\
			          </tr>\
			        </thead>\
			        <tbody>\
			          <tr>\
			            <td class="col-md-6 slider-cell" style="padding-left:40px"></td>\
			            <td class="col-md-3" id="'+resource+'-slider-deduction"></td>\
			            <td class="col-md-3" id="'+resource+'-slider-production"></td>\
			          </tr>\
			        </tbody>\
			      </table>');
	var $slider = $('<input class="slider" type="text"/>');
	$slider.attr({
		'data-slider-id': plant, 
		'data-slider-step': 1, 
		'data-slider-value': planet.mine_rate_deductions[resource], 
		'data-slider-min': 0, 
		'data-slider-max': planet.mine_rates[resource]
	});
	
	$table.find('.slider-cell').append($slider);
	$div.append($table);
	$('#secondary-active-wrapper').append($div);
	// needs to be appended to DOM before it can be activated
	$slider.slider()
		   .on('slide', function(e) {
		   		var rateDeduction = e.value;
		   		var powerIncrease = e.value * planet.io_multipliers[plant];
		   		// reduce energy by previous increase
		   		planet.power -= (planet.mine_rate_deductions[resource] * planet.io_multipliers[plant]);
		   		// increase energy
		   		planet.power += powerIncrease;
		   		// reset rate deduction
		   		planet.mine_rate_deductions[resource] = rateDeduction;

		   		$('#'+resource+'-slider-deduction').html(rateDeduction);
		   		$('#'+resource+'-slider-production').html(powerIncrease);
		   });
	// since planet.io_multipliers are set to 1 by default for easy scaling, using a slider when a plant is either level
	// 0 or 1 would result in the same effect
	if (planet.buildings.io[plant].length === 0) {
		$slider.slider('disable');
	}
	else {
		$slider.slider('enable');
	}
}

/*
 * Generates a table for a specific building category
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * [String]  attributes  Additional table columns specific to the building type
 *
 */
UI.prototype.generateBuildingTable = function(category, attributes) {
	// clear active-wrapper, rebuild if power or io
	if (category !== 'io') {
		$('#active-wrapper').empty();
	}
	else {
		$('.table[data-category="io"]').remove();
	}
	// $('.table[data-category="'+category+'"]').remove();

	var $table,
		$headerRow,
		i,
		attribute,
		$tbody,
		name,
		instances,
		level,
		$row;

	$table = $('<table class="table" data-category="'+category+'">\
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
	$headerRow = $table.find('tr');

	for (i = 0; i < attributes.length; i++) {
		attribute = attributes[i].capitalize();
		if (attribute === 'Production' || attribute === 'Capacity') {
			attribute = 'Current ' + attribute;
		}

		$headerRow.append('<th>'+attribute+'</th>');
	}

	// generate header placeholder for upgrade, buy and delete buttons
	$headerRow.append('<th></th>');

	// generate body
	$tbody = $table.find('tbody');

	for (name in planet.buildings[category]) {
		if (!planet.buildings[category].hasOwnProperty(name)) continue;

		// loop through building instances
		instances = planet.buildings[category][name];

		if (instances.length > 0) {
			for (i = 0; i < instances.length; i++) {
				level = instances[i];

				$row = this.generateBuildingRow(category, name, attributes, level, i);

				$tbody.append($row);
			}
		} 
		else {
			// create row that can be bought
			$row = this.generateBuildingRow(category, name, attributes, 0, -1);

			$tbody.append($row);
		}	
	}
	$('#active-wrapper').append($table);
	// build io table if category was power (since power eliminates it)
	if (category === 'power') {
		this.generateBuildingTable('io', ['output_multiplier', 'difference']);
	}	
}

/*
 * Helper function for UI.addAttributeColumnsToRow that reduces repeated multiplier code
 *
 * Type      Parameter      Description
 * String    category       The building category for the table
 * String    name           The name of the building
 * Float     value          The value that needs to be *= by a multiplier
 *
 * return float
 */
UI.prototype.multiplyValue = function(category, name, value) {
	switch (category) {
		case 'mine':
			value = Math.floor(value * planet.mine_rate_multipliers[name]); // don't want to abstract mult here b/c of io
			break;
		case 'power':
			value = Math.floor(value * planet.power_multipliers[name]);
			break;
		case 'io':
			value = Math.round(value * planet.io_multipliers[name] * 10) / 10.0;
			break;
		case 'fleet':
			value *= planet.ship_rate_multiplier;
			break;
		case 'defense':
			value *= planet.defense_rate_multiplier;
			break;
		default:
			break;
	}

	return value;
}

/*
 * Helper function for UI.addAttributeColumnsToRow that returns a non-difference attribute cell
 *
 * Type      Parameter      Description
 * String    category       The building category for the table
 * String    name           The name of the building
 * [String]  attribute      Table column specific to the building type
 * Object    buildingClass  The specific class of the building
 * Int       level          The building's current level
 * $         $row           The previously constructed row for the <td> elements to be appended to
 *
 * return $
 */
UI.prototype.notDifferenceColumn = function(category, name, attribute, buildingClass, level, $row) {
	var attributeValue;

	// show what attribute value is for current level
	if (name === 'customization_shipyard' || name === 'defense_factory') {
		attributeValue = 1;
	}
	else {
		attributeValue = buildingClass[attribute](name, level);
	}

	if (category === 'io' && level > 1) {
		// divide by existing portion of planet.io_multipliers[name]
		attributeValue /= buildingClass[attribute](name, level - 1);
	}

	attributeValue = this.multiplyValue(category, name, attributeValue);

	return '<td>'+attributeValue+'</td>';
}

/*
 * Helper function for UI.addAttributeColumnsToRow that returns a difference attribute cell
 *
 * Type      Parameter      Description
 * String    category       The building category for the table
 * String    name           The name of the building
 * [String]  attribute      Table column specific to the building type
 * Object    buildingClass  The specific class of the building
 * Int       level          The building's current level
 * $         $row           The previously constructed row for the <td> elements to be appended to
 *
 * return $
 */
UI.prototype.differenceColumn = function(category, name, attribute, buildingClass, level, $row) {
	var column,
		difference,
		sign = '+'
		nextLevel = level + 1;

	if (name === 'customization_shipyard' || name === 'defense_factory') {
		sign = '';
	}

	if (nextLevel > 21) {
		column = '<td>--</td>';
	}
	else {
		// *** Note: I should reduce the conditional nesting to 2 levels, but that'll require updating ship and defense 
		// rate calculation logic to support research, which I need to do, but don't want to right now
		if (name === 'customization_shipyard' || name === 'defense_factory') {
			level < 20 ? difference = -0.01 : difference = -0.05; // hardcoded because abstraction adds too much logic
		} 
		else {
			difference = buildingClass[attribute](name, nextLevel) - buildingClass[attribute](name, level);

			// this code still repeats the notDifference version, but it may not be worth refactoring
			if (category === 'io' && level > 1) { 
				// divide by existing portion of planet.io_multipliers[name]
				difference /= buildingClass[attribute](name, level);
			}

			difference = this.multiplyValue(category, name, difference);
		}

		column = '<td class="increase">'+sign+difference+'</td>';
	}

	return column;
}

/*
 * Helper function for UI.generateBuildingTable that adds attribute columns (<td> elements) to a row and returns it
 *
 * Type      Parameter      Description
 * String    category       The building category for the table
 * String    name           The name of the building
 * [String]  attributes     Additional table columns specific to the building type
 * Object    buildingClass  The specific class of the building
 * Int       level          The building's current level
 * $         $row           The previously constructed row for the <td> elements to be appended to
 *
 * return $
 */
UI.prototype.addAttributeColumnsToRow = function(category, name, attributes, buildingClass, level, $row) {
	var nextLevel = level + 1,
		i,
		attribute,
		prevAttribute,
		$column;

	for (i = 0; i < attributes.length; i++) {
		attribute = attributes[i];
		
		if (i > 0) {
			prevAttribute = attributes[i - 1];
		}

		if (attribute !== 'difference') {
			$column = this.notDifferenceColumn(category, name, attribute, buildingClass, level, $row);
		} 
		else {
			$column = this.differenceColumn(category, name, prevAttribute, buildingClass, level, $row);
		}

		$row.append($column);
	}

	return $row;
}

/*
 * Helper function for UI.generateBuildingTable that builds a <td> element containing buttons and
 * returns a row appended with it.
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 * [String]  attributes  Additional table columns specific to the building type
 * Int       level       The building's current level
 * Int       instance    The index of the building's level in Planet.buildings[category][name]
 * $         $row        The previously constructed row for the <td> element to be appended to
 *
 * return $
 */
UI.prototype.addButtonColumnToRow = function(category, name, attributes, level, instance, $row) {
	var $buttonTd = $('<td></td>'),
		$upgradeButton,
		revert,
		$deleteButton;

	$buttonTd.attr({
		'data-category': category, 
		'data-name': name, 
		'data-level': level, 
		'data-instance': instance, 
		'data-attributes': attributes
	});

	if (level > 0) {
		// add upgrade button
		$upgradeButton = $('<button class="upgrade-button">Upgrade</button>');

		// if (planet.canUpgradeBuilding(category, name, level)) {
		// 	$upgradeButton.css('color','green');
		// }
		// else {
		// 	$upgradeButton.css('color','red');
		// }

		$buttonTd.append($upgradeButton);
	}
	// Big string of conditionals to allow both buildings with and without existing instances be have the chance of a 
	// buy button
	// The last part of the conditional checks for all other building types
	if (category === 'mine' || 
		(category === 'power' && name !== 'planetary_power_generator') || 
		category === 'storage' || 
		planet.buildings[category][name].length === 0) { 

		// add buy button
		$buyButton = $('<button class="buy-button">Buy</button>');

		// if (planet.canBuyBuilding(category, name)) {
		// 	$buyButton.css('color','green');
		// }
		// else {
		// 	$buyButton.css('color','red');
		// }

		$buttonTd.append($buyButton);
	}
	// extra conditions to save users from themselves (planet.deleteBuilding has built-in protections as well)
	revert = ((category === 'mine' || category === 'storage') && 
					planet.buildings[category][name].length === 1 && 
					level === 1) || 
					(name === 'planetary_power_generator' && level === 1);

	if (!revert && level > 0) {
		// add delete button
		$deleteButton = $('<button class="delete-button">Delete</button>');

		$buttonTd.append($deleteButton);
	}

	$row.append($buttonTd);

	return $row;
}

/*
 * Helper function for UI.generateBuildingTable that builds and returns a row of data
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 * [String]  attributes  Additional table columns specific to the building type
 * Int       level       The building's current level
 * Int       instance    The index of the building's level in Planet.buildings[category][name]
 *
 * return $
 */
UI.prototype.generateBuildingRow = function(category, name, attributes, level, instance) {
	var buildingClass = planet.pickBuildingClass(category), 
		powerCost, 
		resourceCost,
		nextLevel,
		$row;

	nextLevel = level + 1;
	// determine costs
	powerCost = buildingClass.power(name, nextLevel);

	resourceCost = buildingClass.cost(name, nextLevel);

	if (nextLevel <= 21) {
		$row = $('<tr>\
			<td>'+name.capitalize()+'</td>\
			<td>'+level+'</td>\
			<td>'+Math.floor(resourceCost.crystal)+'</td>\
			<td>'+Math.floor(resourceCost.steel)+'</td>\
			<td>'+Math.floor(resourceCost.titanium)+'</td>\
			<td>'+Math.floor(resourceCost.tritium)+'</td>\
			<td>'+Math.floor(powerCost)+'</td>\
		</tr>');
	} 
	else {
		$row = $('<tr>\
			<td>'+name.capitalize()+'</td>\
			<td>'+level+'</td>\
			<td>--</td>\
			<td>--</td>\
			<td>--</td>\
			<td>--</td>\
			<td>'+Math.floor(powerCost)+'</td>\
		</tr>');
	}

	$row = this.addAttributeColumnsToRow(category, name, attributes, buildingClass, level, $row)

	$row = this.addButtonColumnToRow(category, name, attributes, level, instance, $row);
	return $row;
}

/*
 * Generates the table that contains resource information
 * 
 * Return void;
 */
UI.prototype.generateResourceTable = function() {
	// delete existing one
	// $('#active-wrapper').empty();
	// console.log($('#active-wrapper'))
	$('.table[data-category="resources"]').remove();

	var $table,
		$tbody,
		$row,
		r;

	$table = $('<table class="table" data-category="resources">\
						<thead>\
							<tr>\
								<th>Resource</th>\
								<th>Count</th>\
								<th>Storage</th>\
					            <th>Rate / min</th>\
					            <th>Multiplier</th>\
							</tr>\
						</thead>\
						<tbody>\
						</tbody>\
					</table>');

	$tbody = $table.find('tbody');

	for (r in planet.resources) {
		if (!planet.resources.hasOwnProperty(r)) continue;
		// append resource information to row
		$row = $('<tr data-resource="'+r+'">\
					<td>'+r.capitalize()+'</td>\
					<td class="count">'+Math.floor(planet.resources[r])+'</td>\
					<td class="storage">'+Math.floor(planet.storage[r])+'</td>\
					<td class="rate">'+Math.floor(planet.mine_rates[r] - planet.mine_rate_deductions[r])+'</td>\
					<td class="multiplier">'+planet.mine_rate_multipliers[r]+'</td>\
				</tr>');

		$tbody.append($row);
	}

	// Add a special row for power
	$row = $('<tr data-resource="power">\
				<td>Power</td>\
				<td class="count">'+planet.power+'</td>\
				<td class="storage">--</td>\
				<td class="rate">--</td>\
				<td class="multiplier">--</td>\
			</tr>');

	$tbody.append($row);

	$('#resources-wrapper').append($table); // I should stick this in a .row
}

// I'm being lazy and just redrawing tables on click
// Rationale: it's less work that figuring out how to insert rows upon buy
UI.prototype.updateBuildingInformation = function() {
	// update all of that
}

/*
 * Repopulates resource amounts, storage and multipliers without requiring a full redraw of the table
 *
 * Type    Parameter  Description
 * String  resource   The particular resource that will be updated
 * String  attribute  A class that indicates which cell will change
 * 
 * Return void;
 */
UI.prototype.updateResourceRow = function(resource, attribute) {
	var $td = $('tr[data-resource="'+resource+'"] td.'+attribute),
		value;

	if (resource === 'power') {
		value = planet.power;
	}
	else {
		switch(attribute) {
			case 'count':
				value = planet.resources[resource];
				break;
			case 'storage':
				value = planet.storage[resource];
				break;
			case 'rate':
				value = (planet.mine_rates[resource] - planet.mine_rate_deductions[resource]);
				console.log(planet.mine_rate_deductions)
				break;
			case 'multiplier':
				value = planet.mine_rate_multipliers[resource];
				break;
			default: 
				break;
		}
	}

	// set cell value
	$td.text(Math.floor(value));
}

/*
 * Changes upgrade and buy button styles based on resource / power availability
 * 
 * Return void;
 */
UI.prototype.updateButtonStyle = function() {
	var $buyButtons = $('.buy-button'),
		i,
		bb,
		data,
		j,
		ub,
		$upgradeButtons = $('.upgrade-button');

	for (i = 0; i < $buyButtons.length; i++) {
		bb = $($buyButtons[i]);

		data = bb.parent().data();

		if (planet.canBuyBuilding(data.category, data.name)) {
			bb.css('color','green');
		}
		else {
			bb.css('color','red');
		}
	}

	for (j = 0; j < $upgradeButtons.length; j++) {
		ub = $($upgradeButtons[j]);

		data = ub.parent().data();

		if (planet.canUpgradeBuilding(data.category, data.name, data.level)) {
			ub.css('color','green');
		}
		else {
			ub.css('color','red');
		}
	}
}

/*
 * Houses UI changes that need to be made every interval
 * 
 * Return void;
 */
UI.prototype.visualLoop = function() {
	var i;
	// update all resource counts and mine rates
	for (i = 0; i < planet.resource_types.length; i++) {
		this.updateResourceRow(planet.resource_types[i], 'count');
		this.updateResourceRow(planet.resource_types[i], 'rate');
	}

	this.updateResourceRow('power', 'count');
	this.updateButtonStyle();
}