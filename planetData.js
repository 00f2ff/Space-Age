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
			hydro: 1,
			thermal: 1,
			wind: 1,
			ppg: 1,
			liquid: 1,
			furnace: 1,
			nuclear: 1
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
			hydro: 1,
			thermal: 1,
			wind: 1,
			ppg: 0,
			liquid: 1,
			furnace: 1,
			nuclear: 1
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
			hydro: 0,
			thermal: 2,
			wind: 1.5,
			ppg: 0,
			liquid: 1.5,
			furnace: 2,
			nuclear: 0
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
			hydro: 1.5,
			thermal: 0.5,
			wind: 1.5,
			ppg: 0,
			liquid: 1,
			furnace: 0,
			nuclear: 1.5
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
			hydro: 1,
			thermal: 0,
			wind: 2.9,
			ppg: 0,
			liquid: 0.7,
			furnace: 0.7,
			nuclear: 0.7
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
			hydro: 0,
			thermal: 1,
			wind: 1,
			ppg: 0,
			liquid: 0.5,
			furnace: 2,
			nuclear: 1.5
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
			hydro: 0.5,
			thermal: 0.5,
			wind: 1.5,
			ppg: 0,
			liquid: 1,
			furnace: 1.5,
			nuclear: 1
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