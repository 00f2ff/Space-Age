
/*
 * This contains all data for a planet
 */
function Planet(type, sun) {
	var mult,
		r;

	this.type = type;
	this.sun = sun;
	this.resource_types = ["crystal", "steel", "titanium", "tritium"];

	this.buildings = {
		mine: {
			crystal: [],
			steel: [],
			titanium: [],
			tritium: []
		},
		storage: {
			crystal: [],
			steel: [],
			titanium: [],
			tritium: []
		},
		power: {
			hydro_power_plant: [],
			thermal_power_plant: [],
			wind_power_plant: [],
			planetary_power_generator: []
		},
		io: {
			liquid_power_plant: [],
			furnace_power_plant: [],
			nuclear_power_plant: []
		},
		economy: {
			trade_center: []
		},
		fleet: {
			fleet_base: [],
			military_shipyard: [],
			neutral_shipyard: [],
			customization_shipyard: []
		},
		defense: {
			defense_factory: []
		},
		craft: {

		},
		technology: {
			purifier: []
		},
		reference: {

		}
	}

	// assign initial values
	this.resources = {
		crystal: 1000,
		steel: 1000,
		titanium: 500,
		tritium: 1000
	}

	this.mine_rates = {
		crystal: 0,
		steel: 0,
		titanium: 0,
		tritium: 0
	}

	// Due to IO conversions
	this.mine_rate_deductions = {
		crystal: 0,
		steel: 0,
		titanium: 0,
		tritium: 0
	}

	this.storage = {
		crystal: 2000,
		steel: 2000,
		titanium: 2000,
		tritium: 2000
	}

	this.power = 50;

	this.ship_rate_multiplier = 1;
	this.defense_rate_multiplier = 1;

	// assign mine_rate_multipliers from sun
	this.mine_rate_multipliers = this.sun.mine_rate_multipliers;

	// modify mine_rate_multipliers from planet type
	for (mult in this.mine_rate_multipliers) {
		if (!this.mine_rate_multipliers.hasOwnProperty(mult)) continue;

		this.mine_rate_multipliers[mult] *= planetData[type].mine_rate_multipliers[mult];
	}

	// assign planet type data
	this.power_multipliers = planetData[type].power_multipliers;
	this.io_multipliers = planetData[type].io_multipliers;

	this.used_building_slots = 0;
	this.max_building_slots = planetData[type].max_building_slots;
	this.mine_slots = planetData[type].mine_slots;

	// build specific buildings only for Super Terra
	if (type === 'super_terra') {
		this.buildings.storage = {
			crystal: [1],
			steel: [1],
			titanium: [1],
			tritium: [1]
		}

		this.buildings.mine = {
			crystal: [1],
			steel: [1],
			titanium: [1],
			tritium: [1]
		}

		// start mine_rates
		for (r in this.mine_rate_multipliers) {
			if (!this.mine_rate_multipliers.hasOwnProperty(r)) continue;

			this.mine_rates[r] = mine.production(r, 1) * this.mine_rate_multipliers[r];
		}

		this.used_building_slots = 4;

		this.buildings.power.planetary_power_generator = [1];
	}
}

/*
 * Giant switch statement to find and return correct buildingClass for category
 *
 * Type      Parameter      Description
 * String    category       The building category for the table
 *
 * return Object
 */
Planet.prototype.pickBuildingClass = function(category) {
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
		case 'io':
			buildingClass = io;
			break;
		case 'economy':
			buildingClass = economy;
			break;
		case 'fleet':
			buildingClass = fleet;
			break;
		case 'defense':
			buildingClass = defense;
			break;
		case 'technology':
			buildingClass = technology;
			break;
		default:
			break;
	}

	return buildingClass;
}

/*
 * Checks whether a building can be upgraded
 *
 * Type      Parameter      Description
 * String    category       The building category for the table
 * String    name           The name of the building
 * Int       level          The building's current level (OPTIONAL)
 *
 * return Boolean
 */
Planet.prototype.canUpgradeBuilding = function(category, name, level) {
	var nextLevel = level + 1,
		buildingClass,
		powerCost,
		resourceCost,
		i,
		r;

	// Check building not already at max level
	if (nextLevel <= 21) {
		buildingClass = this.pickBuildingClass(category);

		// determine costs
		powerCost = buildingClass.power(name, nextLevel);

		resourceCost = buildingClass.cost(name, nextLevel);

		// check if costs acceptable
		if (this.power < powerCost) {
			return false;
		}

		for (i = 0; i < this.resource_types.length; i++) {
			r = this.resource_types[i];

			if (this.resources[r] < resourceCost[r]) {
				return false;
			}
		}

		return true;
	} 
	else {
		return false;
	}
}

/*
 * Purchases an upgrade or new building
 * Type      Parameter      Description
 * Object    resourceCost   An object containing a building or upgrade's crystal, steel, titanium and tritium costs
 *
 * return void
 */
Planet.prototype.spend = function(resourceCost) {
	var i,
		r;
	for (i = 0; i < this.resource_types.length; i++) {
		r = this.resource_types[i];

		this.resources[r] -= resourceCost[r];
	}
}

/*
 * Helper function to calculate a sum of a particular attribute given a building level array (other than power)
 *
 * Type      Parameter      Description
 * String    category       The building category for the table
 * String    name           The name of the building
 * Object    buildingClass  The specific class of the building
 * Int       level          The building's current level (OPTIONAL)
 *
 * return $
 */
Planet.prototype.sum = function(category, name, buildingClass, attribute, level) {
	var total = 0,
		l,
		i;

	// polymorphism provided by level parameter (won't be 0)
	if (level) {
		for (l = 1; l < level + 1; l++) {
			total += buildingClass[attribute](name, l);
		}
	} 
	else {
		var instances = this.buildings[category][name];

		for (i = 0; i < instances.length; i++) {
			total += buildingClass[attribute](name, instances[i]); // e.g. mine.production('crystal', 2)
		}
	}

	return total;
}

/*
 * Helper that updates a planet's resource data after upgrade or purchase
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 * Int       level       The level of the building (usually new)
 *
 * return void
 */
Planet.prototype.updatePlanetData = function(category, name, level) {
	var buildingClass, 
		resourceCost;

	switch(category) {
		case 'mine': 
			buildingClass = mine;

			// decrease power
			this.power -= mine.power(name, level);

			// recalculate mine production
			this.mine_rates[name] = this.sum(category, name, buildingClass, 'production') * this.mine_rate_multipliers[name];
			break;
		case 'storage':
			buildingClass = storage;

			// decrease power
			this.power -= storage.power(name, level);

			// recalculate storage
			this.storage[name] = this.sum(category, name, buildingClass, 'capacity');
			break;
		case 'power':
			buildingClass = power;

			// increase power (sums differently than mine_rates or storage)
			// remove previous level (if there is one)
			if (level > 1) {
				this.power -= (power.production(name, level - 1) * this.power_multipliers[name]);
			}

			// add current level
			this.power += (power.production(name, level) * this.power_multipliers[name]);
			break;
		case 'io':
			buildingClass = io;

			// recalculate io multipliers
			// remove previous level (if there is one)
			if (level > 1) {
				// reduce power by current rate deduction * multiplier
				switch(name) {
					case 'liquid_power_plant':
						this.power -= (this.mine_rate_deductions.crystal * this.io_multipliers[name])
						break;
					case 'furnace_power_plant':
						this.power -= ((this.mine_rate_deductions.steel + this.mine_rate_deductions.titanium)
										 * this.io_multipliers[name]);
						break;
					case 'nuclear_power_plant':
						this.power -= (this.mine_rate_deductions.tritium * this.io_multipliers[name])
						break;
					default:
						break;
				}
				this.io_multipliers[name] /= io.output_multiplier(name, level - 1);
			}

			// multiply current level
			this.io_multipliers[name] *= io.output_multiplier(name, level);
			// increase power by rate deduction * new multiplier
			switch(name) {
				case 'liquid_power_plant':
					this.power += (this.mine_rate_deductions.crystal * this.io_multipliers[name])
					break;
				case 'furnace_power_plant':
					this.power += ((this.mine_rate_deductions.steel + this.mine_rate_deductions.titanium)
									 * this.io_multipliers[name]);
					break;
				case 'nuclear_power_plant':
					this.power += (this.mine_rate_deductions.tritium * this.io_multipliers[name])
					break;
				default:
					break;
			}
			break;
		case 'economy':
			buildingClass = economy;

			// decrease power
			this.power -= economy.power(name, level);
			break;
		case 'fleet':
			buildingClass = fleet;

			// recalculate ship_rate_multiplier
			if (name === 'customization_shipyard') {
				// remove previous level (if there is one)
				if (level > 1) {
					this.ship_rate_multiplier /= fleet.ship_rate_multiplier(name, level - 1);
				}

				// multiply current level
				this.ship_rate_multiplier *= fleet.ship_rate_multiplier(name, level);		
			}

			// decrease power
			this.power -= fleet.power(name, level);
			break;
		case 'defense':
			buildingClass = defense;

			// recalculate defense_rate_multiplier
			// remove previous level (if there is one)
			if (level > 1) {
				this.defense_rate_multiplier /= defense.defense_rate_multiplier(name, level - 1);
			}

			// multiply current level
			this.defense_rate_multiplier *= defense.defense_rate_multiplier(name, level);	

			// decrease power
			this.power -= defense.power(name, level);
			break;
		case 'technology':
			buildingClass = technology;

			// decrease power
			this.power -= technology.power(name, level);
			break;
		default:
			break;
	}

	// determine costs
	resourceCost = buildingClass.cost(name, level);

	// purchase
	this.spend(resourceCost);
}

/*
 * Verifies whether a building can be updated, increases it's level, and then calls to update memory
 *
 * Type    Parameter    Definition
 * String  category	    The category of a building (e.g. mine, power, storage)
 * String  name			The name of a building (e.g. crystal, ppg)
 * Int     level        The level of the building to be upgraded
 * Int     instance     The building index of this particular level
 *
 * return void
 */
Planet.prototype.upgradeBuilding = function(category, name, level, instance) {
	if (this.canUpgradeBuilding(category, name, level)) {
		// increase level
		level++;

		this.buildings[category][name][instance] = level;

		// make all changes in memory
		this.updatePlanetData(category, name, level);
	}
}

/*
 * Helper function for requirementsMet specifically for mines
 *
 * Type      Parameter   Description
 * String    mine        Which mine or mine combo is required
 * Int       sumLevel    The sum of mine levels required
 *
 * return Boolean
 */
Planet.prototype.mineRequirementsMet = function(mine, sumLevel) {
	var i,
		currentSum = 0,
		j;

	if (mine === 'crystal' || mine === 'steel' || mine === 'titanium' || mine === 'tritium') {
		for (i = 0; i < planet.buildings.mine[mine].length; i++) {
			currentSum += planet.buildings.mine[mine][i];
		}
	} 
	// titanium / steel combo case
	else if (mine === 'metal') {
		for (i = 0; i < planet.buildings.mine.steel.length; i++) {
			currentSum += planet.buildings.mine.steel[i];
		}
		for (i = 0; i < planet.buildings.mine.titanium.length; i++) {
			currentSum += planet.buildings.mine.titanium[i];
		}
	}
	// every single mine type
	else if (mine === 'all') {
		for (i = 0; i < this.resource_types.length; i++) {
			for (j = 0; j < planet.buildings.mine[this.resource_types[i]].length; j++) {
				currentSum += planet.buildings.mine[this.resource_types[i]][j];
			}
		}
	}

	return currentSum >= sumLevel;
}

/*
 * Helper function for canBuyBuilding that verifies all building requirements have been met
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 *
 * return Boolean
 */
Planet.prototype.requirementsMet = function(category, name) {
	var requirements,
		buildingClass,
		req,
		i,
		building,
		value,
		met = true;

	buildingClass = this.pickBuildingClass(category);

	requirements = buildingClass.requirements(name);

	// base case: no requirements (length = 0, falsey)
	if (!Object.keys(requirements).length) {
		return true;
	}

	// iterate through building categories
	for (req in requirements) {
		if (!requirements.hasOwnProperty(req)) continue;

		// iterate through building names
		for (i = 0; i < requirements[req].length; i++) {
			value = requirements[req][i];

			// check for mine case
			if (req === 'mine') {
				met = met && this.mineRequirementsMet(value[0], value[1]);
			}
			else {
				// this format is ok because there's only one of each building type that is referenced as a requirement 
				// that's not a mine
				// aka currently storage and renewable power aren't referenced
				// this is a convoluted naming convention, but req = category, value[0] = name (can't use those vars 
				// though) and value[1] = sumLevel
				if (this.buildings[req][value[0]].length && this.buildings[req][value[0]][0] >= value[1]) {
					met = met && true;
				}
				else {
					return false; // we can eliminate it immediately
				}
			}
		}
	}
	// console.log(category, name, met)

	return met;
}

/*
 * Verifies that a building can be bought
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 *
 * return Boolean
 */
Planet.prototype.canBuyBuilding = function(category, name) {
	// check that requirements are met
	if (this.requirementsMet(category, name)) {
		// check available building / mine slots
		if (category === 'mine') {
			if (this.buildings.mine[name].length === this.mine_slots[name]) {
				return false;
			}
		} 
		else {
			if (this.used_building_slots === this.max_building_slots) {
				return false;
			}
		}

		return this.canUpgradeBuilding(category, name, 0); // 0 sets nextLevel to 1
	}
	else {
		return false;
	}
}

/*
 * Verifies that a building can be bought, then adds it in memory and calls a resource update
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 *
 * return void
 */
Planet.prototype.buyBuilding = function(category, name) {
	var level = 1;

	if (this.canBuyBuilding(category, name)) {
		this.buildings[category][name].push(level); // add a level 1 building

		// increase used building slots
		if (category !== 'mine') {
			this.used_building_slots++;
		}

		// make all changes in memory
		this.updatePlanetData(category, name, level);
	}
}

/*
 * Deletes non-critical buildings; reverts critical buildings to level 1
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 * Int       level       The building's current level
 * Int       instance    The index of the building's level in Planet.buildings[category][name]
 *
 * return void
 */
Planet.prototype.deleteBuilding = function(category, name, level, instance) {
	// only delete instance when it's a secondary mine, storage, or non-ppg power plant
	// otherwise revert to level 1
	var revert = ((category === 'mine' || category === 'storage') && 
					this.buildings[category][name].length === 1 && 
					level > 1) || 
					name === 'planetary_power_generator';

	if (revert) {
		this.buildings[category][name][instance] = 1; // reset instance level
	}
	else {
		this.buildings[category][name].splice(instance, 1); // remove 1 instance of level
	}

	switch(category) {
		case 'mine':
			// adjust power
			this.power += this.sum(category, name, mine, 'power', level);

			if (revert) {
				this.power -= mine.power(name, 1);
			}
			break;
		case 'storage':
			// adjust power
			this.power += this.sum(category, name, storage, 'power', level);

			if (revert) {
				this.power -= storage.power(name, 1);
			}
			else {
				this.used_building_slots--; // adjust building slots
			}
			break;
		case 'power':
			// adjust power (power does not compound)
			this.power -= power.production(name, level);
			// shouldn't need second conditional, but there just in case
			if (revert && name === 'planetary_power_generator') { 
				// don't let users screw themselves by deleting their core power base
				this.power += power.production(name, 1);
			} 
			else {
				// adjust building slots
				this.used_building_slots--;
			}
			break;
		case 'io':
			// adjust io_multipliers
			this.io_multipliers[name] /= io.output_multiplier(name, level);

			// adjust building slots
			this.used_building_slots--;
			break;
		case 'economy':
			// adjust power
			this.power += this.sum(category, name, economy, 'power', level);
			break;
		case 'fleet':
			// adjust power
			this.power += this.sum(category, name, fleet, 'power', level);

			// adjust ship_rate_multiplier
			if (name === 'customization_shipyard') {
				this.ship_rate_multiplier /= fleet.ship_rate_multiplier(name, level);
			}

			// adjust building slots
			this.used_building_slots--;
			break;
		case 'defense':
			// adjust power
			this.power += this.sum(category, name, defense, 'power', level);

			// adjust defense_rate_multiplier
			this.defense_rate_multiplier /= defense.defense_rate_multiplier(name, level);

			// adjust building slots
			this.used_building_slots--;
			break;
		case 'technology':
			// adjust power
			this.power += this.sum(category, name, technology, 'power', level);

			// adjust building slots
			this.used_building_slots--;
			break;
		default:
			break;
	}
}

/*
 * Houses data changes that need to be made every interval
 * 
 * Return void;
 */
Planet.prototype.dataLoop = function() {
	// I can't pass this in as a variable because that would execute before interval
	var cyclesPerSecond = 10,
		i,
		r,
		increment; 

	// modify resources
	for (i = 0; i < this.resource_types.length; i++) {
		r = this.resource_types[i];

		increment = (this.mine_rates[r] - this.mine_rate_deductions[r]) / 60 / cyclesPerSecond;

		// increment resource if less than capacity, otherwise set to capacity
		if (this.resources[r] + increment < this.storage[r]) {
			this.resources[r] += increment;
		}
		else {
			this.resources[r] = this.storage[r];
		}
	}
	// economy, fleet, defense, technology? (whatever is changed incrementally)
}

/*
 * Each building node will consist of an array of 0+ elements, each indicating a level of a particular building
 * Those will be subject to a capped length based on planet-specific attributes such as quantity available, as well as 
 * available building spots
 * -- Technology and reference perhaps shouldn't be here...
 *
 */