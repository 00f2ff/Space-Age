
// Move this to another file
function Sun() {
	this.strength = Math.round(Math.random() * 4 + 1);
	if (this.strength === 3) {
		this.mineRates = {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 1,
			tritiumMine: 1
		}
	} else if (this.strength > 3) {
		this.mineRates = {
			crystalMine: 1,
			steelMine: 1 - (this.strength - 3) * 0.05,
			titaniumMine: 1 - (this.strength - 3) * 0.05,
			tritiumMine: 1 + (this.strength - 3) * 0.05
		}
	} else {
		this.mineRates = {
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
		mineRates: {
			crystalMine: 2,
			steelMine: 2,
			titaniumMine: 2,
			tritiumMine: 2
		},
		powerRates: {
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
		mineRates: {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 1,
			tritiumMine: 1
		},
		powerRates: {
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
		mineRates: {
			crystalMine: 1,
			steelMine: 1.5,
			titaniumMine: 1.5,
			tritiumMine: 0
		},
		powerRates: {
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
		mineRates: {
			crystalMine: 1,
			steelMine: 0,
			titaniumMine: 0.5,
			tritiumMine: 2.5
		},
		powerRates: {
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
		mineRates: {
			crystalMine: 3,
			steelMine: 0,
			titaniumMine: 0,
			tritiumMine: 1
		},
		powerRates: {
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
		mineRates: {
			crystalMine: 0,
			steelMine: 1.5,
			titaniumMine: 2.5,
			tritiumMine: 0
		},
		powerRates: {
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
		mineRates: {
			crystalMine: 0.5,
			steelMine: 1,
			titaniumMine: 1.5,
			tritiumMine: 1
		},
		powerRates: {
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
			crystalMine: [],
			steelMine: [],
			titaniumMine: [],
			tritiumMine: []
		},
		storage: {
			crystalStorage: [],
			steelStorage: [],
			titaniumStorage: [],
			tritiumStorage: []
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
		this.power = 25;
		// assign mineRates from sun
		this.mineRates = this.sun.mineRates;
		// modify mineRates from planet type
		for (var rate in this.mineRates) {
			if (!this.mineRates.hasOwnProperty(key)) continue;
			this.mineRates[rate] *= planetData[type].mineRates[rate];
		}
		// assign planet type data
		this.powerRates = planetData[type].powerRates;
		this.usedBuildingSlots = 0;
		this.maxBuildingSlots = planetData[type].maxBuildingSlots;
		this.mineSlots = planetData[type].mineSlots;
		// build specific buildings only for Super Terra
		if (type === 'superTerra') {
			this.buildings.storage = {
				crystalStorage: [1],
				steelStorage: [1],
				titaniumStorage: [1],
				tritiumStorage: [1]
			}
			this.usedBuildingSlots = 4;
			this.buildings.power.planetaryPowerGenerator = [1];
		}
	}
}

Planet.prototype.canUpgradeBuilding = function(category, name, index) {
	var nextLevelIndex, i, r;
	nextLevelIndex = this.buildings[category][name][index] + 1;
	// check available power
	if (this.power < buildingData[category][name].power[nextLevelIndex]) return false;
	// check available resources
	for (i = 0; i < resourceTypes.length; i++) {
		r = resourceTypes[i];
		if (this.resources[r] < buildingData[category][name].cost[r][nextLevelIndex]) return false;
	}
	return true;
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

/*
 * The way this is going to work is there will be a master building file, but I'll keep track of level and quantity in this file
 * Each building node will consist of an array of 0+ elements, each indicating a level of a particular building
 * Those will be subject to a capped length based on planet-specific attributes such as quantity available, as well as available building spots
 * -- Technology and reference perhaps shouldn't be here...
 */