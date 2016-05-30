/*
 * This contains planet rate and building spot data
 */
var planetData = {
	super_terra: {
		mine_multipliers: {
			crystal: 2,
			steel: 2,
			titanium: 2,
			tritium: 2
		},
		power_multipliers: {
			hydro_power_plant: 1,
			thermal_power_plant: 1,
			wind_power_plant: 1,
			planetary_power_generator: 1,
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
		mine_multipliers: {
			crystal: 1,
			steel: 1,
			titanium: 1,
			tritium: 1
		},
		power_multipliers: {
			hydro_power_plant: 1,
			thermal_power_plant: 1,
			wind_power_plant: 1,
			planetary_power_generator: 0,
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
		mine_multipliers: {
			crystal: 1,
			steel: 1.5,
			titanium: 1.5,
			tritium: 0
		},
		power_multipliers: {
			hydro_power_plant: 0,
			thermal_power_plant: 2,
			wind_power_plant: 1.5,
			planetary_power_generator: 0,
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
		mine_multipliers: {
			crystal: 1,
			steel: 0,
			titanium: 0.5,
			tritium: 2.5
		},
		power_multipliers: {
			hydro_power_plant: 1.5,
			thermal_power_plant: 0.5,
			wind_power_plant: 1.5,
			planetary_power_generator: 0,
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
		mine_multipliers: {
			crystal: 3,
			steel: 0,
			titanium: 0,
			tritium: 1
		},
		power_multipliers: {
			hydro_power_plant: 1,
			thermal_power_plant: 0,
			wind_power_plant: 2.9,
			planetary_power_generator: 0,
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
		mine_multipliers: {
			crystal: 0,
			steel: 1.5,
			titanium: 2.5,
			tritium: 0
		},
		power_multipliers: {
			hydro_power_plant: 0,
			thermal_power_plant: 1,
			wind_power_plant: 1,
			planetary_power_generator: 0,
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
		mine_multipliers: {
			crystal: 0.5,
			steel: 1,
			titanium: 1.5,
			tritium: 1
		},
		power_multipliers: {
			hydro_power_plant: 0.5,
			thermal_power_plant: 0.5,
			wind_power_plant: 1.5,
			planetary_power_generator: 0,
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