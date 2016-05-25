
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
				return {
					crystal: this.high(level),
					steel: this.high(level),
					titanium: this.mid(level),
					tritium: this.low(level)
				}
				break;
			case 'steel':
				return {
					crystal: this.high(level),
					steel: this.mid(level),
					titanium: this.high(level),
					tritium: this.low(level)
				}
				break;
			case 'titanium':
				return {
					crystal: this.high(level),
					steel: this.mid(level),
					titanium: this.high(level),
					tritium: this.low(level)
				}
				break;
			case 'tritium':
				return {
					crystal: this.low(level),
					steel: this.mid(level),
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
					steel: this.mid(level),
					titanium: this.power(level),
					tritium: this.mid(level)
				}
				break;
			case 'steel':
				return {
					crystal: this.mid(level),
					steel: this.low(level),
					titanium: this.low(level),
					tritium: this.mid(level)
				}
				break;
			case 'titanium':
				return {
					crystal: this.mid(level),
					steel: this.low(level),
					titanium: this.low(level),
					tritium: this.mid(level)
				}
				break;
			case 'tritium':
				return {
					crystal: this.mid(level),
					steel: this.mid(level),
					titanium: this.power(level),
					tritium: this.high(level)
				}
				break;
			default:
				break;
		}
	}
}