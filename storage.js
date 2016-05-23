
/*
 * Storage consumes no energy, but I'm including it to support abstraction in the future
 * Some storage doesn't require a resource, so I'm using energy as a placehold for that
 */

var storageData = {
	storage: [2000, 3000, 4000, 5000, 6500, 8000, 9500, 11000, 13000, 15000, 17000, 19000, 21000, 24000, 27000, 30000, 33000, 36000, 40000, 50000, 75000],
	energy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	expensive: [200, 400, 600, 800, 1000, 1300, 1600, 2200, 3000, 3400, 4000, 4800, 5800, 7000, 8400, 10000, 11800, 13800, 16000, 18400, 23000],
	midrange: [100, 200, 300, 400, 600, 750, 1000, 1300, 2000, 2800, 3400, 4000, 4800, 5800, 7000, 8400, 10000, 11600, 13400, 15400, 19000],
	cheap: [100, 200, 300, 400, 500, 650, 800, 1100, 1500, 1700, 2000, 2400, 2900, 3500, 4200, 5000, 5900, 6900, 8000, 9200, 11500],
	storageLevels: {
		crystal: 1,
		steel: 1,
		titanium: 1,
		tritium: 1
	}
}

var storageCosts = {
	crystal: {
		crystal: storageData.expensive,
		steel: storageData.midrange,
		titanium: storageData.energy,
		tritium: storageData.midrange,
		energy: storageData.energy
	},
	steel: {
		crystal: storageData.midrange,
		steel: storageData.cheap,
		titanium: storageData.cheap,
		tritium: storageData.midrange,
		energy: storageData.energy
	},
	titanium: {
		crystal: storageData.midrange,
		steel: storageData.cheap,
		titanium: storageData.cheap,
		tritium: storageData.midrange,
		energy: storageData.energy
	},
	tritium: {
		crystal: storageData.midrange,
		steel: storageData.midrange,
		titanium: storageData.energy,
		tritium: storageData.expensive,
		energy: storageData.energy
	}
}