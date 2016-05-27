
// I may add more functions in the future, but for now Mine, Storage and Power all use calculate
function Global() {
	this.calculate = function(level, constant, divisor) {
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}
}

var glob = new Global();

// This is the sort of thing I could turn into a module
function Mine() {
	this.production = function(level) {
		var constant = 10,
			divisor = 10.0;
		return glob.calculate(level, constant, divisor);
	}

	this.power = function(level) {
		var constant = 5,
			divisor = 7.0;
		return glob.calculate(level, constant, divisor);
	}

	this.high = function(level) {
		var constant = 20,
			divisor = 8.7;
		return glob.calculate(level, constant, divisor);
	}

	this.medium = function(level) {
		var constant = 20,
			divisor = 9.65;
		return glob.calculate(level, constant, divisor);
	}

	this.low = function(level) {
		var constant = 20,
			divisor = 10.1;
		return glob.calculate(level, constant, divisor);
	}

	this.cost = function(level, type) {
		switch(type) {
			case 'crystal':
				// console.log(type, level)
				return {
					crystal: this.high(level),
					steel: this.high(level),
					titanium: this.medium(level),
					tritium: this.low(level)
				}
				break;
			case 'steel':
				return {
					crystal: this.high(level),
					steel: this.medium(level),
					titanium: this.high(level),
					tritium: this.low(level)
				}
				break;
			case 'titanium':
				return {
					crystal: this.high(level),
					steel: this.medium(level),
					titanium: this.high(level),
					tritium: this.low(level)
				}
				break;
			case 'tritium':
				return {
					crystal: this.low(level),
					steel: this.medium(level),
					titanium: this.high(level),
					tritium: this.high(level)
				}
				break;
			default:
				break;
		}
	}
}

function Storage() {
	this.capacity = function(level) {
		var constant = 2000,
			divisor = 41.8;
		return glob.calculate(level, constant, divisor);
	}

	this.power = function(level) {
		return 0;
	}

	this.high = function(level) {
		var constant = 20,
			divisor = 8.5;
		return glob.calculate(level, constant, divisor);
	}

	this.medium = function(level) {
		var constant = 20,
			divisor = 8.7;
		return glob.calculate(level, constant, divisor);
	}

	this.low = function(level) {
		var constant = 20,
			divisor = 9.5;
		return glob.calculate(level, constant, divisor);
	}

	this.cost = function(level, type) {
		switch(type) {
			case 'crystal':
				return {
					crystal: this.high(level),
					steel: this.medium(level),
					titanium: this.power(level),
					tritium: this.medium(level)
				}
				break;
			case 'steel':
				return {
					crystal: this.medium(level),
					steel: this.low(level),
					titanium: this.low(level),
					tritium: this.medium(level)
				}
				break;
			case 'titanium':
				return {
					crystal: this.medium(level),
					steel: this.low(level),
					titanium: this.low(level),
					tritium: this.medium(level)
				}
				break;
			case 'tritium':
				return {
					crystal: this.medium(level),
					steel: this.medium(level),
					titanium: this.power(level),
					tritium: this.high(level)
				}
				break;
			default:
				break;
		}
	}
}

// I'm going to figure out how to implement feeder plants later
function Power() {
	this.production = function(level) {
		var constant = 10,
			divisor = 9.1;
		return glob.calculate(level, constant, divisor);
	}

	this.ppgProduction = function(level) {
		var constant = 50,
			divisor = 17.0;
		return glob.calculate(level, constant, divisor);
	}

	this.power = function(level) {
		return 0;
	}

	this.ppgHigh = function(level) {
		var constant = 200,
			divisor = 23.5;
		return glob.calculate(level, constant, divisor);
	}

	this.ppgLow = function(level) {
		return this.ppgHigh(level) / 2;
	}

	this.high = function(level) {
		var constant = 20,
			divisor = 10.8;
		return glob.calculate(level, constant, divisor);
	}

	this.medium = function(level) {
		var constant = 20,
			divisor = 11.6;
		return glob.calculate(level, constant, divisor);
	}

	this.low = function(level) {
		var constant = 10,
			divisor = 9.7;
		return glob.calculate(level, constant, divisor);
	}

	this.cost = function(level, type) {
		switch(type) {
			case 'hydro':
				return {
					crystal: this.medium(level),
					steel: this.medium(level),
					titanium: this.low(level),
					tritium: this.high(level)
				}
				break;
			case 'wind':
				return {
					crystal: this.medium(level),
					steel: this.medium(level),
					titanium: this.medium(level),
					tritium: this.medium(level)
				}
				break;
			case 'thermal':
				return {
					crystal: this.medium(level),
					steel: this.low(level),
					titanium: this.low(level),
					tritium: this.medium(level)
				}
				break;
			case 'ppg':
				return {
					crystal: this.ppgHigh(level),
					steel: this.ppgLow(level),
					titanium: this.ppgLow(level),
					tritium: this.ppgLow(level)
				}
				break;
			default:
				break;
		}
	}
}

function Economy() {
	this.traders = function(level) {
		return level;
	}

	this.power = function(level) {
		return 5 + level * 5; // this function is duplicated in Technology
	}

	this.cost = function(level) {
		return {
			crystal: global.calculate(level, 200, 24.2),
			steel: global.calculate(level, 200, 23.5),
			titanium: 0,
			tritium: global.calculate(level, 200, 23.8)
		}
	}
}

function Fleet() {
	// just for fleet_base
	this.fleets = function(level) {
		return level;
	}

	// just for customization_shipyard
	this.shipRateMultiplier = function(level) {
		if (level < 21) {
			return (100 - level) / 100.0; // 99 - 80
		}
		else {
			return 0.75;
		}
	}

	this.power = function(type, level) { // I should change Power to something like this too (or change how this all works)
		if (type === 'fleet_base') {
			return global.calculate(level, 10, 11.7);
		}
		// All shipyards have same requirements
		else {
			return global.calculate(level, 10, 13.5);
		}
	}

	this.cost = function(type, level) {
		if (type === 'fleet_base') {
			return {
				crystal: global.calculate(level, 300, 27.5),
				steel: global.calculate(level, 300, 27.5) / 2,
				titanium: global.calculate(level, 300, 27.5) / 2,
				tritium: global.calculate(level, 300, 27.5)
			}
		}
		// All shipyards have same requirements
		else {
			return {
				crystal: global.calculate(level, 200, 21.9),
				steel: global.calculate(level, 200, 21.1),
				titanium: 0,
				tritium: global.calculate(level, 200, 21.4)
			}
		}
	}
}

function Defense() {
	this.defenseRateMultiplier = function(level) { // think about moving this function into global for rates
		if (level < 21) {
			return (100 - level) / 100.0; // 99 - 80
		}
		else {
			return 0.75;
		}
	}

	this.power = function(type, level) { // I should change Energy to something like this too (or change how this all works)

	}

	this.cost = function(type, level) {

	}
}

function Technology() {
	this.batchSize = function(level) { // This function is correct, but I don't know how much this matters if I don't take time into consideration
	// look into how Crank does timing. That may be a good implementation
		return 5 + level * 5;
	}

	this.power = function(level) {

	}

	this.cost = function(level) {

	}
}

var mine       = new Mine(),
	storage    = new Storage(),
	power      = new Power(),
	economy    = new Economy(),
	fleet      = new Fleet(),
	defense    = new Defense(),
	technology = new Technology();

