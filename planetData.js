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
		},
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
		},
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
		},
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
		},
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
		},
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
		},
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
		},
		maxBuildingSlots: 12,
		mineSlots: {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 2,
			tritiumMine: 0
		}
	}
}