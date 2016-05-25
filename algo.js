
// This is the sort of thing I could turn into a module
function Mine() {
	this.production = function(level) {
		var constant = 10,
			divisor = 10.0;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.power = function(level) {
		var constant = 5,
			divisor = 7.0;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.high = function(level) {
		var constant = 20,
			divisor = 8.7;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.medium = function(level) {
		var constant = 20,
			divisor = 9.65;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.low = function(level) {
		var constant = 20,
			divisor = 10.1;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
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
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.power = function(level) {
		return 0;
	}

	this.high = function(level) {
		var constant = 20,
			divisor = 8.5;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.medium = function(level) {
		var constant = 20,
			divisor = 8.7;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.low = function(level) {
		var constant = 20,
			divisor = 9.5;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
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
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.ppgProduction = function(level) {
		var constant = 50,
			divisor = 17.0;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.power = function(level) {
		return 0;
	}

	this.ppgHigh = function(level) {
		var constant = 200,
			divisor = 23.5;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.ppgLow = function(level) {
		return this.ppgHigh(level) / 2;
	}

	this.high = function(level) {
		var constant = 20,
			divisor = 10.8;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.medium = function(level) {
		var constant = 20,
			divisor = 11.6;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
	}

	this.low = function(level) {
		var constant = 10,
			divisor = 9.7;
		return Math.floor(Math.pow(constant, (1 + (level - 1) / divisor) ) );
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
			case 'tritium':
				return {
					crystal: this.high(level),
					steel: this.medium(level),
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

var mine = new Mine();
var storage = new Storage();
var power = new Power();
