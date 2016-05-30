function Sun() {
	this.strength = Math.round(Math.random() * 4 + 1);

	var effect = (this.strength - 3) * 0.05;
	
	if (this.strength === 3) {
		this.mine_rate_multipliers = {
			crystal: 1,
			steel: 1,
			titanium: 1,
			tritium: 1
		}
	} else if (this.strength > 3) {
		this.mine_rate_multipliers = {
			crystal: 1,
			steel: 1 - effect,
			titanium: 1 - effect,
			tritium: 1 + effect
		}
	} else {
		this.mine_rate_multipliers = {
			crystal: 1,
			steel: 1 + effect,
			titanium: 1 + effect,
			tritium: 1 - effect
		}
	}
}