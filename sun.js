function Sun() {
	this.strength = Math.round(Math.random() * 4 + 1);
	var effect = (this.strength - 3) * 0.05;
	if (this.strength === 3) {
		this.mineMultipliers = {
			crystalMine: 1,
			steelMine: 1,
			titaniumMine: 1,
			tritiumMine: 1
		}
	} else if (this.strength > 3) {
		this.mineMultipliers = {
			crystalMine: 1,
			steelMine: 1 - effect,
			titaniumMine: 1 - effect,
			tritiumMine: 1 + effect
		}
	} else {
		this.mineMultipliers = {
			crystalMine: 1,
			steelMine: 1 + effect,
			titaniumMine: 1 + effect,
			tritiumMine: 1 - effect
		}
	}
}