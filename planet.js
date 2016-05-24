
// Move this to another file
function Sun() {
	this.strength = Math.round(Math.random() * 4 + 1);
	if (this.strength === 3) {
		this.mineMultipliers = {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 1,
			tritiumMine: 1
		}
	} else if (this.strength > 3) {
		this.mineMultipliers = {
			crystalMine: 1,
			steelMine: 1 - (this.strength - 3) * 0.05,
			titaniumMine: 1 - (this.strength - 3) * 0.05,
			tritiumMine: 1 + (this.strength - 3) * 0.05
		}
	} else {
		this.mineMultipliers = {
			crystalMine: 1,
			steelMine: 1 + (this.strength - 3) * 0.05,
			titaniumMine: 1 + (this.strength - 3) * 0.05,
			tritiumMine: 1 - (this.strength - 3) * 0.05
		}
	}
}

// Move this to another file
/*
 * This contains planet rate and building spot data
 */
var planetData = {
	superTerra: {
		mineMultipliers: {
			crystalMine: 2,
			steelMine: 2,
			titaniumMine: 2,
			tritiumMine: 2
		},
		powerMultipliers: {
			hydropowerPlant: 1,
			thermalPowerPlant: 1,
			windPowerPlant: 1,
			planetaryPowerGenerator: 1,
			liquidPowerPlant: 1,
			furnacePowerPlant: 1,
			nuclearPowerPlant: 1
		}
		maxBuildingSlots: 12,
		mineSlots: {
			crystalMine: 2,
			steelMine: 2,
			titaniumMine: 2,
			tritiumMine: 2
		}
	},
	terra: {
		mineMultipliers: {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 1,
			tritiumMine: 1
		},
		powerMultipliers: {
			hydropowerPlant: 1,
			thermalPowerPlant: 1,
			windPowerPlant: 1,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1,
			furnacePowerPlant: 1,
			nuclearPowerPlant: 1
		}
		maxBuildingSlots: 10,
		mineSlots: {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 1,
			tritiumMine: 1
		}
	},
	volcanic: {
		mineMultipliers: {
			crystalMine: 1,
			steelMine: 1.5,
			titaniumMine: 1.5,
			tritiumMine: 0
		},
		powerMultipliers: {
			hydropowerPlant: 0,
			thermalPowerPlant: 2,
			windPowerPlant: 1.5,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1.5,
			furnacePowerPlant: 2,
			nuclearPowerPlant: 0
		}
		maxBuildingSlots: 10,
		mineSlots: {
			crystalMine: 1,
			steelMine: 2,
			titaniumMine: 2,
			tritiumMine: 0
		}
	},
	aqua: {
		mineMultipliers: {
			crystalMine: 1,
			steelMine: 0,
			titaniumMine: 0.5,
			tritiumMine: 2.5
		},
		powerMultipliers: {
			hydropowerPlant: 1.5,
			thermalPowerPlant: 0.5,
			windPowerPlant: 1.5,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1,
			furnacePowerPlant: 0,
			nuclearPowerPlant: 1.5
		}
		maxBuildingSlots: 7,
		mineSlots: {
			crystalMine: 1,
			steelMine: 0,
			titaniumMine: 1,
			tritiumMine: 2
		}
	},
	airy: {
		mineMultipliers: {
			crystalMine: 3,
			steelMine: 0,
			titaniumMine: 0,
			tritiumMine: 1
		},
		powerMultipliers: {
			hydropowerPlant: 1,
			thermalPowerPlant: 0,
			windPowerPlant: 2.9,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 0.7,
			furnacePowerPlant: 0.7,
			nuclearPowerPlant: 0.7
		}
		maxBuildingSlots: 3,
		mineSlots: {
			crystalMine: 3,
			steelMine: 0,
			titaniumMine: 0,
			tritiumMine: 1
		}
	},
	crag: {
		mineMultipliers: {
			crystalMine: 0,
			steelMine: 1.5,
			titaniumMine: 2.5,
			tritiumMine: 0
		},
		powerMultipliers: {
			hydropowerPlant: 0,
			thermalPowerPlant: 1,
			windPowerPlant: 1,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 0.5,
			furnacePowerPlant: 2,
			nuclearPowerPlant: 1.5
		}
		maxBuildingSlots: 10,
		mineSlots: {
			crystalMine: 0,
			steelMine: 3,
			titaniumMine: 3,
			tritiumMine: 0
		}
	},
	outcrop: {
		mineMultipliers: {
			crystalMine: 0.5,
			steelMine: 1,
			titaniumMine: 1.5,
			tritiumMine: 1
		},
		powerMultipliers: {
			hydropowerPlant: 0.5,
			thermalPowerPlant: 0.5,
			windPowerPlant: 1.5,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1,
			furnacePowerPlant: 1.5,
			nuclearPowerPlant: 1
		}
		maxBuildingSlots: 12,
		mineSlots: {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 2,
			tritiumMine: 0
		}
	}
}

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
	this.init();

	function init() {
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
				crystal: [1],
				steel: [1],
				titanium: [1],
				tritium: [1]
			}
			this.usedBuildingSlots = 4;
			this.buildings.power.planetaryPowerGenerator = [1];
		}
	}
}

//// BUILDING FUNCTIONS ////

Planet.prototype.canUpgradeBuilding = function(category, name, index) {
	var nextLevelIndex, i, r;
	nextLevelIndex = this.buildings[category][name][index] + 1;
	// check not max level
	if (nextLevelIndex <= 21) {
		// check available power
		if (this.power < buildingData[category][name].power[nextLevelIndex]) return false;
		// check available resources
		for (i = 0; i < resourceTypes.length; i++) {
			r = resourceTypes[i];
			if (this.resources[r] < buildingData[category][name].cost[r][nextLevelIndex]) return false;
		}
		return true;
	} else return false;
}

Planet.prototype.upgradeBuilding = function(category, name, index) {
	if (this.canUpgradeBuilding(category, name, index)) {
		// increase level
		this.buildings[category][name][index]++;
		// modify power
		if ('category' === power) this.power += buildingData[category][name].production[this.buildings[category][name][index]];
		else this.power -= buildingData[category][name].power[this.buildings[category][name][index]];
	}
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
	if (canBuyBuilding(category, name)) {
		this.buildings[category][name].push(1); // add a level 1 building
		if (category !== 'mine') this.usedBuildingSlots++;
		// modify power
		if ('category' === power) this.power += buildingData[category][name].production[this.buildings[category][name][index]];
		else this.power -= buildingData[category][name].power[this.buildings[category][name][index]];
	}
	this.updateUIVariables(category, name);
}

//// RESOURCE FUNCTIONS ////

// Helper to recalculate mineRates / storage (power is already handled in buy / upgrade functions)
Planet.prototype.updateUIVariables = function(category, name) {
	switch(category) {
		case 'mine':
			this.mineRates[name] = this.sum('mine', name, 'production') * this.mineMultipliers[name];
			break;
		case 'storage':
			this.storage[name] = this.sum('storage', name, 'storage');
			break;
		default:
			break;
	}
}

// Helper to calculate a sum of a particular attribute given a building level array
Planet.prototype.sum = function(category, name, attribute) {
	// Sse ECMAScript 6 for inlined reduce function
	return this.buildings[category][name].reduce((a, b) => a + buildingData[category][name][attribute][b], 0);
}

// This gets called on each game loop
Planet.prototype.dataLoop = function(cyclesPerSecond) {
	// modify resources
	var r, i, increment;
	for (i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		increment = this.mineRates[r] / 60 / cyclesPerSecond;
		// increment resource if less than storage, otherwise set to storage
		if (this.resources[r] + increment < this.storage[r]) this.resources[r] += increment;
		else this.resources[r] = this.storage[r];
	}
	// economy, fleet, defense, technology? (whatever is changed incrementally)
}

/*
 * The way this is going to work is there will be a master building file, but I'll keep track of level and quantity in this file
 * Each building node will consist of an array of 0+ elements, each indicating a level of a particular building
 * Those will be subject to a capped length based on planet-specific attributes such as quantity available, as well as available building spots
 * -- Technology and reference perhaps shouldn't be here...
 *
 * The main reason for this approach is to more clearly separate UI and data code
 */