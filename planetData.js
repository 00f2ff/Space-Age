/*
 * This contains planet rate and building spot data
 */
var planetData = {
	superTerra: {
		mineMultipliers: {
			crystal: 2,
			steel: 2,
			titanium: 2,
			tritium: 2
		},
		powerMultipliers: {
			hydropowerPlant: 1,
			thermalPowerPlant: 1,
			windPowerPlant: 1,
			planetaryPowerGenerator: 1,
			liquidPowerPlant: 1,
			furnacePowerPlant: 1,
			nuclearPowerPlant: 1
		},
		maxBuildingSlots: 12,
		mineSlots: {
			crystal: 2,
			steel: 2,
			titanium: 2,
			tritium: 2
		}
	},
	terra: {
		mineMultipliers: {
			crystal: 1,
			steel: 1,
			titanium: 1,
			tritium: 1
		},
		powerMultipliers: {
			hydropowerPlant: 1,
			thermalPowerPlant: 1,
			windPowerPlant: 1,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1,
			furnacePowerPlant: 1,
			nuclearPowerPlant: 1
		},
		maxBuildingSlots: 10,
		mineSlots: {
			crystal: 1,
			steel: 1,
			titanium: 1,
			tritium: 1
		}
	},
	volcanic: {
		mineMultipliers: {
			crystal: 1,
			steel: 1.5,
			titanium: 1.5,
			tritium: 0
		},
		powerMultipliers: {
			hydropowerPlant: 0,
			thermalPowerPlant: 2,
			windPowerPlant: 1.5,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1.5,
			furnacePowerPlant: 2,
			nuclearPowerPlant: 0
		},
		maxBuildingSlots: 10,
		mineSlots: {
			crystal: 1,
			steel: 2,
			titanium: 2,
			tritium: 0
		}
	},
	aqua: {
		mineMultipliers: {
			crystal: 1,
			steel: 0,
			titanium: 0.5,
			tritium: 2.5
		},
		powerMultipliers: {
			hydropowerPlant: 1.5,
			thermalPowerPlant: 0.5,
			windPowerPlant: 1.5,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1,
			furnacePowerPlant: 0,
			nuclearPowerPlant: 1.5
		},
		maxBuildingSlots: 7,
		mineSlots: {
			crystal: 1,
			steel: 0,
			titanium: 1,
			tritium: 2
		}
	},
	airy: {
		mineMultipliers: {
			crystal: 3,
			steel: 0,
			titanium: 0,
			tritium: 1
		},
		powerMultipliers: {
			hydropowerPlant: 1,
			thermalPowerPlant: 0,
			windPowerPlant: 2.9,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 0.7,
			furnacePowerPlant: 0.7,
			nuclearPowerPlant: 0.7
		},
		maxBuildingSlots: 3,
		mineSlots: {
			crystal: 3,
			steel: 0,
			titanium: 0,
			tritium: 1
		}
	},
	crag: {
		mineMultipliers: {
			crystal: 0,
			steel: 1.5,
			titanium: 2.5,
			tritium: 0
		},
		powerMultipliers: {
			hydropowerPlant: 0,
			thermalPowerPlant: 1,
			windPowerPlant: 1,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 0.5,
			furnacePowerPlant: 2,
			nuclearPowerPlant: 1.5
		},
		maxBuildingSlots: 10,
		mineSlots: {
			crystal: 0,
			steel: 3,
			titanium: 3,
			tritium: 0
		}
	},
	outcrop: {
		mineMultipliers: {
			crystal: 0.5,
			steel: 1,
			titanium: 1.5,
			tritium: 1
		},
		powerMultipliers: {
			hydropowerPlant: 0.5,
			thermalPowerPlant: 0.5,
			windPowerPlant: 1.5,
			planetaryPowerGenerator: 0,
			liquidPowerPlant: 1,
			furnacePowerPlant: 1.5,
			nuclearPowerPlant: 1
		},
		maxBuildingSlots: 12,
		mineSlots: {
			crystal: 1,
			steel: 1,
			titanium: 2,
			tritium: 0
		}
	}
}