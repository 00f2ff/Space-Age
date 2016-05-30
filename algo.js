
// I may add more functions in the future, but for now Mine, Storage and Power all use calculate
function Global() {
	this.calculate = function(level, constant, divisor) {
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}
}

var glob = new Global();

// This is the sort of thing I could turn into a module
/*
 * Many functions that don't incorporate name and/or level have them for abstraction purposes
 */
function Mine() {
	this.production = function(name, level) {
		return glob.calculate(level, 10, 10.0);
	}

	this.power = function(name, level) {
		return glob.calculate(level, 5, 7.0);
	}

	this.cost = function(name, level) {
		switch(name) {
			case 'crystal':
				// console.log(name, level)
				return {
					crystal: glob.calculate(level, 20, 8.7),
					steel: glob.calculate(level, 20, 8.7),
					titanium: glob.calculate(level, 20, 9.65),
					tritium: glob.calculate(level, 20, 10.1)
				}
				break;
			case 'steel':
				return {
					crystal: glob.calculate(level, 20, 8.7),
					steel: glob.calculate(level, 20, 9.65),
					titanium: glob.calculate(level, 20, 8.7),
					tritium: glob.calculate(level, 20, 10.1)
				}
				break;
			case 'titanium':
				return {
					crystal: glob.calculate(level, 20, 8.7),
					steel: glob.calculate(level, 20, 9.65),
					titanium: glob.calculate(level, 20, 8.7),
					tritium: glob.calculate(level, 20, 10.1)
				}
				break;
			case 'tritium':
				return {
					crystal: glob.calculate(level, 20, 10.1),
					steel: glob.calculate(level, 20, 9.65),
					titanium: glob.calculate(level, 20, 8.7),
					tritium: glob.calculate(level, 20, 8.7)
				}
				break;
			default:
				break;
		}
	}
}

function Storage() {
	this.capacity = function(name, level) {
		return glob.calculate(level, 2000, 41.8);
	}

	this.power = function(name, level) {
		return 0;
	}

	this.cost = function(name, level) {
		switch(name) {
			case 'crystal':
				return {
					crystal: glob.calculate(level, 20, 8.5),
					steel: glob.calculate(level, 20, 8.7),
					titanium: 0,
					tritium: glob.calculate(level, 20, 8.7)
				}
				break;
			case 'steel':
				return {
					crystal: glob.calculate(level, 20, 8.7),
					steel: glob.calculate(level, 20, 9.5),
					titanium: glob.calculate(level, 20, 9.5),
					tritium: glob.calculate(level, 20, 8.7)
				}
				break;
			case 'titanium':
				return {
					crystal: glob.calculate(level, 20, 8.7),
					steel: glob.calculate(level, 20, 9.5),
					titanium: glob.calculate(level, 20, 9.5),
					tritium: glob.calculate(level, 20, 8.7)
				}
				break;
			case 'tritium':
				return {
					crystal: glob.calculate(level, 20, 8.7),
					steel: glob.calculate(level, 20, 8.7),
					titanium: 0,
					tritium: glob.calculate(level, 20, 8.5)
				}
				break;
			default:
				break;
		}
	}
}

function Power() {
	this.production = function(name, level) {
		if(name === 'planetary_power_generator') {
			return glob.calculate(level, 50, 17.0);
		}
		else if (name === 'hydro_power_plant' || name === 'wind_power_plant' || name === 'thermal_power_plant') {
			return glob.calculate(level, 10, 9.1);
		}		
	}	

	this.power = function(name, level) {
		return 0;
	}

	this.cost = function(name, level) {
		switch(name) {
			case 'hydro_power_plant':
				return {
					crystal: glob.calculate(level, 20, 11.6),
					steel: glob.calculate(level, 20, 11.6),
					titanium: glob.calculate(level, 10, 9.7),
					tritium: glob.calculate(level, 20, 10.8)
				}
				break;
			case 'wind_power_plant':
				return {
					crystal: glob.calculate(level, 20, 11.6),
					steel: glob.calculate(level, 20, 11.6),
					titanium: glob.calculate(level, 20, 11.6),
					tritium: glob.calculate(level, 20, 11.6)
				}
				break;
			case 'thermal_power_plant':
				return {
					crystal: glob.calculate(level, 20, 11.6),
					steel: glob.calculate(level, 10, 9.7),
					titanium: glob.calculate(level, 10, 9.7),
					tritium: glob.calculate(level, 20, 11.6)
				}
				break;
			case 'planetary_power_generator':
				return {
					crystal: glob.calculate(level, 200, 23.5),
					steel: Math.floor(glob.calculate(level, 200, 23.5) / 2),
					titanium: Math.floor(glob.calculate(level, 200, 23.5) / 2),
					tritium: Math.floor(glob.calculate(level, 200, 23.5) / 2)
				}
				break;
			default:
				break;
		}
	}
}

function IO() {
	this.output = function(name, level) {
		if (level === 0) {
			return 0;
		} 
		else if (level === 1) {
			return 0.1;
		}
		else if (level < 21) {
			return 0.1 * (level - 1);
		}
		else {
			return 2.5;
		}
	}

	this.power = function(name, level) {
		return 0;
	}

	this.cost = function(name, level) {
		return {
			crystal: glob.calculate(level, 100, 46),
			steel: glob.calculate(level, 800, 44.5),
			titanium: glob.calculate(level, 200, 35),
			tritium: glob.calculate(level, 100, 46)
		}
	}
}

function Economy() {
	this.traders = function(name, level) {
		return level;
	}

	this.power = function(name, level) {
		return 5 + level * 5; // this function is duplicated in Technology
	}

	this.cost = function(name, level) {
		return {
			crystal: glob.calculate(level, 200, 24.2),
			steel: glob.calculate(level, 200, 23.5),
			titanium: 0,
			tritium: glob.calculate(level, 200, 23.8)
		}
	}
}

function Fleet() {
	// just for fleet_base
	this.fleets = function(name, level) {
		return level;
	}

	// just for customization_shipyard
	this.ship_rate_multiplier = function(name, level) {
		if (name === 'customization_shipyard') {
			if (level === 0) {
				return 1;
			}
			else if (level < 21) {
				return (100 - level) / 100.0 - 1; // -0.01 to -0.2
			}
			else {
				return -0.25;
			}
		}
		else {
			return 0;
		}
		
	}

	this.power = function(name, level) {
		if (name === 'fleet_base') {
			return glob.calculate(level, 10, 11.7);
		}
		// All shipyards have same requirements
		else {
			return glob.calculate(level, 10, 13.5);
		}
	}

	this.cost = function(name, level) {
		if (name === 'fleet_base') {
			return {
				crystal: glob.calculate(level, 300, 27.5),
				steel: Math.floor(glob.calculate(level, 300, 27.5) / 2),
				titanium: Math.floor(glob.calculate(level, 300, 27.5) / 2),
				tritium: glob.calculate(level, 300, 27.5)
			}
		}
		// All shipyards have same requirements
		else {
			return {
				crystal: glob.calculate(level, 200, 21.9),
				steel: glob.calculate(level, 200, 21.1),
				titanium: 0,
				tritium: glob.calculate(level, 200, 21.4)
			}
		}
	}
}

function Defense() {
	this.defense_rate_multiplier = function(name, level) { // think about moving this function into global for rates
		if (level === 0) {
			return 1;
		}
		else if (level < 21) {
			return (100 - level) / 100.0 - 1; // -0.01 to -0.2
		}
		else {
			return -0.25;
		}
	}

	this.power = function(name, level) {
		return level * 10;
	}

	this.cost = function(name, level) {
		return {
			crystal: glob.calculate(level, 300, 31.8),
			steel: glob.calculate(level, 200, 29.2),
			titanium: glob.calculate(level, 200, 29.2),
			tritium: glob.calculate(level, 200, 29.2)
		}
	}
}

function Technology() {
	this.batch_size = function(name, level) { // This function is correct, but I don't know how much this matters if I don't take time into consideration
	// look into how Crank does timing. That may be a good implementation
		if (level === 0) {
			return 0;
		}
		else {
			return 5 + level * 5;
		}
	}

	this.power = function(name, level) {
		return level * 20;
	}

	this.cost = function(name, level) {
		return {
			crystal: glob.calculate(level, 1000, 37.4),
			steel: Math.floor(glob.calculate(level, 1000, 37.4) / 2),
			titanium: Math.floor(glob.calculate(level, 1000, 37.4) / 2),
			tritium: Math.floor(glob.calculate(level, 1000, 37.4) / 2)
		}
	}
}

var mine       = new Mine(),
	storage    = new Storage(),
	power      = new Power(),
	io         = new IO(),
	economy    = new Economy(),
	fleet      = new Fleet(),
	defense    = new Defense(),
	technology = new Technology();

