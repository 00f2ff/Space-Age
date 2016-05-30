/*
 * This contains planet rate and building spot data
 */
var planetData = {
	super_terra: {
		mine_rate_multipliers: {
			crystal: 2,
			steel: 2,
			titanium: 2,
			tritium: 2
		},
		power_multipliers: {
			hydro_power_plant: 1,
			thermal_power_plant: 1,
			wind_power_plant: 1,
			planetary_power_generator: 1
		},
		io_multipliers: {
			liquid_power_plant: 1,
			furnace_power_plant: 1,
			nuclear_power_plant: 1
		},
		max_building_slots: 12,
		mine_slots: {
			crystal: 2,
			steel: 2,
			titanium: 2,
			tritium: 2
		}
	},
	terra: {
		mine_rate_multipliers: {
			crystal: 1,
			steel: 1,
			titanium: 1,
			tritium: 1
		},
		power_multipliers: {
			hydro_power_plant: 1,
			thermal_power_plant: 1,
			wind_power_plant: 1,
			planetary_power_generator: 0
		},
		io_multipliers: {
			liquid_power_plant: 1,
			furnace_power_plant: 1,
			nuclear_power_plant: 1
		},
		max_building_slots: 10,
		mine_slots: {
			crystal: 1,
			steel: 1,
			titanium: 1,
			tritium: 1
		}
	},
	volcanic: {
		mine_rate_multipliers: {
			crystal: 1,
			steel: 1.5,
			titanium: 1.5,
			tritium: 0
		},
		power_multipliers: {
			hydro_power_plant: 0,
			thermal_power_plant: 2,
			wind_power_plant: 1.5,
			planetary_power_generator: 0
		},
		io_multipliers: {
			liquid_power_plant: 1.5,
			furnace_power_plant: 2,
			nuclear_power_plant: 0
		},
		max_building_slots: 10,
		mine_slots: {
			crystal: 1,
			steel: 2,
			titanium: 2,
			tritium: 0
		}
	},
	aqua: {
		mine_rate_multipliers: {
			crystal: 1,
			steel: 0,
			titanium: 0.5,
			tritium: 2.5
		},
		power_multipliers: {
			hydro_power_plant: 1.5,
			thermal_power_plant: 0.5,
			wind_power_plant: 1.5,
			planetary_power_generator: 0
		},
		io_multipliers: {
			liquid_power_plant: 1,
			furnace_power_plant: 0,
			nuclear_power_plant: 1.5
		},
		max_building_slots: 7,
		mine_slots: {
			crystal: 1,
			steel: 0,
			titanium: 1,
			tritium: 2
		}
	},
	airy: {
		mine_rate_multipliers: {
			crystal: 3,
			steel: 0,
			titanium: 0,
			tritium: 1
		},
		power_multipliers: {
			hydro_power_plant: 1,
			thermal_power_plant: 0,
			wind_power_plant: 2.9,
			planetary_power_generator: 0
		},
		io_multipliers: {
			liquid_power_plant: 0.7,
			furnace_power_plant: 0.7,
			nuclear_power_plant: 0.7
		},
		max_building_slots: 3,
		mine_slots: {
			crystal: 3,
			steel: 0,
			titanium: 0,
			tritium: 1
		}
	},
	crag: {
		mine_rate_multipliers: {
			crystal: 0,
			steel: 1.5,
			titanium: 2.5,
			tritium: 0
		},
		power_multipliers: {
			hydro_power_plant: 0,
			thermal_power_plant: 1,
			wind_power_plant: 1,
			planetary_power_generator: 0
		},
		io_multipliers: {
			liquid_power_plant: 0.5,
			furnace_power_plant: 2,
			nuclear_power_plant: 1.5
		},
		max_building_slots: 10,
		mine_slots: {
			crystal: 0,
			steel: 3,
			titanium: 3,
			tritium: 0
		}
	},
	outcrop: {
		mine_rate_multipliers: {
			crystal: 0.5,
			steel: 1,
			titanium: 1.5,
			tritium: 1
		},
		power_multipliers: {
			hydro_power_plant: 0.5,
			thermal_power_plant: 0.5,
			wind_power_plant: 1.5,
			planetary_power_generator: 0
		},
		io_multipliers: {
			liquid_power_plant: 1,
			furnace_power_plant: 1.5,
			nuclear_power_plant: 1
		},
		max_building_slots: 12,
		mine_slots: {
			crystal: 1,
			steel: 1,
			titanium: 2,
			tritium: 0
		}
	}
}