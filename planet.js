
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
		buildingSlots: 12,
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
		buildingSlots: 10,
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
		buildingSlots: 10,
		mineSlots: {
			crystalMine: 1,
			steelMine: 2,
			titaniumMine: 2,
			tritiumMine: 0
		}
	},
}

/*
 * This contains all data for a particular planet
 */
function Planet(type, sun) {
	this.type = type;
	this.sun = sun;
	this.init();

	function init() {
		this.resources = {
			crystal: 1000,
			steel: 1000,
			titanium: 500,
			tritium: 1000
		}
		this.power = 25;
		this.mineRates = this.sun.mineRates;
	}
}
var planetData = {
	resources: {
		crystal: undefined,
		steel: undefined,
		titanium: undefined,
		tritium: undefined
	},
	mineRates: {
		crystalMine: undefined,
		steelMine: undefined,
		titaniumMine: undefined,
		tritiumMine: undefined
	},
	powerRates: {
		hydropowerPlant: undefined,
		thermalPowerPlant: undefined,
		windPowerPlant: undefined,
		planetaryPowerGenerator: 1,
		liquidPowerPlant: 1,
		furnacePowerPlant: 1,
		nuclearPowerPlant: 1
	}
	energy: undefined,
	structures: undefined,
	maxStructures: undefined,
	buildings: {
		mine: {
			crystalMine: [1],
			steelMine: [1],
			titaniumMine: [1],
			tritiumMine: [1]
		},
		storage: {
			crystalStorage: [1],
			steelStorage: [1],
			titaniumStorage: [1],
			tritiumStorage: [1]
		},
		power: {
			hydropowerPlant: [],
			thermalPowerPlant: [],
			windPowerPlant: [],
			planetaryPowerGenerator: [1],
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
		}
	},
	craft: {

	},
	technology: {

	},
	reference: {

	}
}

/*
 * The way this is going to work is there will be a master building file, but I'll keep track of level and quantity in this file
 * Each building node will consist of an array of 0+ elements, each indicating a level of a particular building
 * Those will be subject to a capped length based on planet-specific attributes such as quantity available, as well as available building spots
 * -- Technology and reference perhaps shouldn't be here...
 */