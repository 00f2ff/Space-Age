
/*
 * This contains all data for a particular planet
 */
function Planet(type, sun) {
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
	for (var mult in this.mineMultipliers) {
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
		this.usedBuildingSlots = 4;
		this.buildings.power.ppg = [1];
	}
}

//// BUILDING FUNCTIONS ////

Planet.prototype.canUpgradeBuilding = function(category, name, instance) {
	var nextLevel, i, r;
	if (instance === 0) nextLevel = 1; // check because canBuyBuilding calls this function
	else nextLevel = this.buildings[category][name][instance] + 1;
	// check not max level
	var powerCost, resourceCost, buildingClass;
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
		if (this.power < powerCost) return false;
		for (i = 0; i < this.resourceTypes.length; i++) {
			r = this.resourceTypes[i];
			if (this.resources[r] < resourceCost[r]) return false;
		}
		return true;
	} else return false;
}

// Purchase an upgrade or building
Planet.prototype.spend = function(resourceCost) {
	for (var i = 0; i < this.resourceTypes.length; i++) {
		r = this.resourceTypes[i];
		this.resources[r] -= resourceCost[r];
	}
}

// Helper to calculate a sum of a particular attribute given a building level array (other than power)
Planet.prototype.sum = function(buildingClass, attribute) {
	var total = 0,
		instances = this.buildings[category][name];
	for (var i = 0; i < instances.length; i++) {
		total += buildingClass[attribute](instances[i]); // e.g. mine.production(2)
	}
	return total;
}

// Helper to update a planet's data after upgrade or purchase
Planet.prototype.updatePlanetData = function(category, name, level) {
	var buildingClass, resourceCost;
	switch(category) {
		case 'mine': 
			buildingClass = mine;
			// decrease power
			this.power -= mine.power(level);
			// recalculate mine production
			this.mineRates[name] = this.sum(buildingClass, 'production') * this.mineMultipliers[name];
			break;
		case 'storage':
			buildingClass = storage;
			// decrease power
			this.power -= storage.power(level);
			// recalculate storage
			this.storage[name] = this.sum(buildingClass, 'capacity');
			break;
		case 'power':
			buildingClass = power;
			// increase power
			if (name === 'ppg') this.power += (power.ppgProduction(level) * this.powerMultipliers[name]);
			else this.power += (power.production(level) * this.powerMultipliers[name]);
			break;
		default:
			break;
	}
	// determine costs
	resourceCost = buildingClass.cost(level, name);
	// purchase
	this.spend(resourceCost);
}

// Instance is the index of a particular level
Planet.prototype.upgradeBuilding = function(category, name, instance) {
	if (this.canUpgradeBuilding(category, name, instance)) {
		// increase level
		this.buildings[category][name][instance]++;
		var level = this.buildings[category][name][instance];
		// make all changes in memory
		this.updatePlanetData(category, name, level);
	}
}

Planet.prototype.canBuyBuilding = function(category, name) {
	// check available building / mine slots
	if (category === 'mine') {
		if (this.buildings.mine[name].length === this.mineSlots[name]) return false;
	} else {
		if (this.usedBuildingSlots === this.maxBuildingSlots) return false;
	}
	return this.canUpgradeBuilding(category, name, 0); // 0 sets nextLevel to 1
}

Planet.prototype.buyBuilding = function(category, name) {
	if (this.canBuyBuilding(category, name)) {
		this.buildings[category][name].push(1); // add a level 1 building
		var level = 1;
		// make all changes in memory
		this.updatePlanetData(category, name, level);
	}
}

Planet.prototype.deleteBuilding = function(category, name, level) {
	// find the instance of the building level we want to delete (we're just choosing 1, so order doesn't matter)
	var instance = this.buildings[category][name].indexOf(level);
	// remove 1 instance of level
	this.buildings[category][name].splice(instance, 1);
	switch(category) {
		case 'mine':
			// adjust power
			this.power += mine.power(level);
			break;
		case 'storage':
			// adjust power
			this.power += storage.power(level);
			// adjust building slots
			this.usedBuildingSlots--;
			break;
		case 'power':
			// adjust power
			if (name === 'ppg') this.power -= power.ppgProduction(level);
			else this.power -= power.production(level);
			// adjust building slots
			this.usedBuildingSlots--;
			break;
		default:
			break;
	}
}

//// RESOURCE FUNCTIONS ////

// This gets called on each game loop
Planet.prototype.dataLoop = function() {
	var cyclesPerSecond = 10; // I can't pass this in as a variable because that would execute before interval
	// modify resources
	var r, i, increment;
	for (i = 0; i < this.resourceTypes.length; i++) {
		r = this.resourceTypes[i];
		increment = this.mineRates[r] / 60 / cyclesPerSecond;
		// increment resource if less than capacity, otherwise set to capacity
		if (this.resources[r] + increment < this.storage[r]) this.resources[r] += increment;
		else this.resources[r] = this.storage[r];
	}
	// economy, fleet, defense, technology? (whatever is changed incrementally)
}

/*
 * Each building node will consist of an array of 0+ elements, each indicating a level of a particular building
 * Those will be subject to a capped length based on planet-specific attributes such as quantity available, as well as available building spots
 * -- Technology and reference perhaps shouldn't be here...
 *
 * The main reason for this approach is to more clearly separate UI and data code
 */