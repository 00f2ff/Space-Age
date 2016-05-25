
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
			hydropowerPlant: [],
			thermalPowerPlant: [],
			windPowerPlant: [],
			planetaryPowerGenerator: [],
			liquidPowerPlant: [],
			furnacePowerPlant: [],
			nuclearPowerPlant: []
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
	this.power = 25;
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
			crystal: [0],
			steel: [0],
			titanium: [0],
			tritium: [0]
		}
		this.usedBuildingSlots = 4;
		this.buildings.power.planetaryPowerGenerator = [0];
	}
}

//// BUILDING FUNCTIONS ////

Planet.prototype.canUpgradeBuilding = function(category, name, instance) {
	var nextLevelIndex, i, r;
	if (instance < 0) nextLevelIndex = 0; // check because canBuyBuilding calls this function
	else nextLevelIndex = this.buildings[category][name][instance] + 1;
	if (category === 'mine' && name === 'crystal') {console.log(category, name, instance, nextLevelIndex);console.log('---')}
	
	// check not max level
	if (nextLevelIndex <= 21) {
		// check available power
		if (this.power < buildingData[category][name].power[nextLevelIndex]) return false;
		// check available resources
		for (i = 0; i < this.resourceTypes.length; i++) {
			r = this.resourceTypes[i];
			if (this.resources[r] < buildingData[category][name].cost[r][nextLevelIndex]) return false;
		}
		return true;
		// return this.canAfford(category, name, nextLevelIndex); // why do I need to check twice? some bug probably
	} else return false;
}

// Instance in this case is the index of a particular level index
Planet.prototype.upgradeBuilding = function(category, name, instance) {
	if (this.canUpgradeBuilding(category, name, instance)) {
		// increase level
		this.buildings[category][name][instance]++;
		// modify power
		if (category === 'power') this.power += buildingData[category][name].production[this.buildings[category][name][instance]];
		else this.power -= buildingData[category][name].power[this.buildings[category][name][instance]];
	}
	this.spend(category, name, this.buildings[category][name][instance]);
	this.updateUIVariables(category, name);
}

Planet.prototype.canBuyBuilding = function(category, name) {
	// check available building / mine slots
	if (category === 'mine') {
		if (this.buildings.mine[name].length === this.mineSlots[name]) return false;
	} else {
		if (this.usedBuildingSlots === this.maxBuildingSlots) return false;
	}
	return this.canUpgradeBuilding(category, name, -1); // -1 sets nextLevelIndex to 0
}

Planet.prototype.buyBuilding = function(category, name) {
	if (this.canBuyBuilding(category, name)) {
		this.buildings[category][name].push(0); // add a level 1 building
		var instanceIndex = this.buildings[category][name][this.buildings[category][name].length - 1];
		if (category !== 'mine') this.usedBuildingSlots++;
		// modify power
		if (category === 'power') this.power += buildingData[category][name].production[this.buildings[category][name][instanceIndex]];
		else this.power -= buildingData[category][name].power[this.buildings[category][name][instanceIndex]];
	}
	this.spend(category, name, this.buildings[category][name][instanceIndex]);
	this.updateUIVariables(category, name);
}

Planet.prototype.canAfford = function(category, name, instance) {
	var buildingResources = buildingData[category][name].cost;
	for (var r in this.resources) {
		if (!this.resources.hasOwnProperty(r)) continue;
		if (this.resources[r] < buildingResources[r][instance]) return false;
	}
	return true;
}

Planet.prototype.spend = function(category, name, instance) {
	var buildingResources = buildingData[category][name].cost;
	for (var r in this.resources) {
		if (!this.resources.hasOwnProperty(r)) continue;
		this.resources[r] -= buildingResources[r][instance];
	}
}

Planet.prototype.deleteBuilding = function(category, name, instance) {
	var deleteIndex = this.buildings[category][name].indexOf(instance); // instance is the adjusted level
	this.power += buildingData[category][name].power[this.buildings[category][name][deleteIndex]]; // increase power
	if (deleteIndex > -1) this.buildings[category][name].splice(deleteIndex, 1); // remove 1 instance
	if (category !== 'mine') this.usedBuildingSlots--; // increase available slots
}

//// RESOURCE FUNCTIONS ////

// Helper to recalculate mineRates / storage (power is already handled in buy / upgrade functions)
Planet.prototype.updateUIVariables = function(category, name) {
	switch(category) {
		case 'mine':
			console.log(this.mineMultipliers)
			this.mineRates[name] = this.sum('mine', name, 'production') * this.mineMultipliers[name];
			break;
		case 'capacity':
			this.storage[name] = this.sum('storage', name, 'capacity');
			break;
		default:
			break;
	}
}

// Helper to calculate a sum of a particular attribute given a building level array
Planet.prototype.sum = function(category, name, attribute) {
	var total = 0,
		instances = this.buildings[category][name];
	for (var i = 0; i < instances.length; i++) {
		total += buildingData[category][name][attribute][instances[i]];
	}
	return total;
}

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