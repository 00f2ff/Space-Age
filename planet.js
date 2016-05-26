
/*
 * This contains all data for a planet
 */
function Planet(type, sun) {
	var mult,
		r;

	this.type = type;
	this.sun = sun;
	this.resourceTypes = ["crystal", "steel", "titanium", "tritium"];

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
			hydro: [],
			thermal: [],
			wind: [],
			ppg: []//,
			// liquid: [],
			// furnace: [],
			// nuclear: []
		},
		economy: {
			tradeCenter: [],
			purifier: []
		},
		fleet: {
			fleetBase: [],
			militaryShipyard: [],
			neutralShipyard: []
		},
		defense: {
			defenseFactory: []
		},
		craft: {

		},
		technology: {

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

	this.mineRates = {
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

	// assign mineMultipliers from sun
	this.mineMultipliers = this.sun.mineMultipliers;

	// modify mineMultipliers from planet type
	for (mult in this.mineMultipliers) {
		if (!this.mineMultipliers.hasOwnProperty(mult)) continue;

		this.mineMultipliers[mult] *= planetData[type].mineMultipliers[mult];
	}
	// assign planet type data
	this.powerMultipliers = planetData[type].powerMultipliers;

	this.usedBuildingSlots = 0;
	this.maxBuildingSlots = planetData[type].maxBuildingSlots;
	this.mineSlots = planetData[type].mineSlots;

	// build specific buildings only for Super Terra
	if (type === 'superTerra') {
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

		// start mineRates
		for (r in this.mineMultipliers) {
			if (!this.mineMultipliers.hasOwnProperty(r)) continue;

			this.mineRates[r] = mine.production(1) * this.mineMultipliers[r];
		}

		this.usedBuildingSlots = 4;

		this.buildings.power.ppg = [1];
	}
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

		// check if costs acceptable
		if (this.power < powerCost) {
			return false;
		}

		for (i = 0; i < this.resourceTypes.length; i++) {
			r = this.resourceTypes[i];

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
	for (i = 0; i < this.resourceTypes.length; i++) {
		r = this.resourceTypes[i];

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
			total += buildingClass[attribute](l);
		}
	} 
	else {
		var instances = this.buildings[category][name];

		for (i = 0; i < instances.length; i++) {
			total += buildingClass[attribute](instances[i]); // e.g. mine.production(2)
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
			this.power -= mine.power(level);

			// recalculate mine production
			this.mineRates[name] = this.sum(category, name, buildingClass, 'production') * this.mineMultipliers[name];
			break;
		case 'storage':
			buildingClass = storage;

			// decrease power
			this.power -= storage.power(level);

			// recalculate storage
			this.storage[name] = this.sum(category, name, buildingClass, 'capacity');
			break;
		case 'power':
			buildingClass = power;

			// increase power (sums differently than mineRates or storage)
			if (name === 'ppg') {
				// remove previous level (if there is one)
				if (level > 1) {
					this.power -= (power.ppgProduction(level - 1) * this.powerMultipliers[name]);
				}

				// add current level
				this.power += (power.ppgProduction(level) * this.powerMultipliers[name]);
			} 
			else {
				// remove previous level
				if (level > 1) {
					this.power -= (power.production(level - 1) * this.powerMultipliers[name]);
				}

				// add current level
				this.power += (power.production(level) * this.powerMultipliers[name]);
			}
			break;
		default:
			break;
	}

	// determine costs
	resourceCost = buildingClass.cost(level, name);

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
 * Verifies that a building can be bought
 *
 * Type      Parameter   Description
 * String    category    The building category for the table
 * String    name        The name of the building
 *
 * return Boolean
 */
Planet.prototype.canBuyBuilding = function(category, name) {
	// check available building / mine slots
	if (category === 'mine') {
		if (this.buildings.mine[name].length === this.mineSlots[name]) {
			return false;
		}
	} 
	else {
		if (this.usedBuildingSlots === this.maxBuildingSlots) {
			return false;
		}
	}

	return this.canUpgradeBuilding(category, name, 0); // 0 sets nextLevel to 1
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
			this.usedBuildingSlots++;
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
					name === 'ppg';

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
				this.power -= mine.power(1);
			}
			break;
		case 'storage':
			// adjust power
			this.power += this.sum(category, name, storage, 'power', level);

			if (revert) {
				this.power -= storage.power(1);
			}
			else {
				this.usedBuildingSlots--; // adjust building slots
			}
			break;
		case 'power':
			// adjust power (power does not compound)
			if (revert && name === 'ppg') { // shouldn't need second conditional, but there just in case
				this.power -= power.ppgProduction(level);

				// don't let users screw themselves by deleting their core power base
				this.power += power.ppgProduction(1);
			} 
			else {
				this.power -= power.production(level);

				// adjust building slots
				this.usedBuildingSlots--;
			}
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
	for (i = 0; i < this.resourceTypes.length; i++) {
		r = this.resourceTypes[i];

		increment = this.mineRates[r] / 60 / cyclesPerSecond;

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
 * Those will be subject to a capped length based on planet-specific attributes such as quantity available, as well as available building spots
 * -- Technology and reference perhaps shouldn't be here...
 *
 */