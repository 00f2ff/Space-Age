function Sun() {
	this.strength = Math.round(Math.random() * 4 + 1);
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
			steelMine: 1 - (this.strength - 3) * 0.05,
			titaniumMine: 1 - (this.strength - 3) * 0.05,
			tritiumMine: 1 + (this.strength - 3) * 0.05
		}
	} else {
		this.mineMultipliers = {
			crystalMine: 1,
			steelMine: 1 + (this.strength - 3) * 0.05,
			titaniumMine: 1 + (this.strength - 3) * 0.05,
			tritiumMine: 1 - (this.strength - 3) * 0.05
		}
	}
}