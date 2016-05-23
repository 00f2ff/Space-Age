

var energyData = {
	production: [],
	energy: [],
	cheaper: [],
	cheap: [],
	midrange: [],
	expensive: [],
	moreexpensive: [],
	energyLevels: {

	}
}

var energyCosts = {
	hydro: 0,
	thermal: 0,
	wind: 0, 
	ppg: 1
}

var mineData = {
	production: [10, 14, 20, 28, 38, 50, 64, 80, 98, 122, 152, 188, 230, 278, 334, 398, 470, 550, 638, 736, 900],
	energy: [5, 8, 12, 17, 23, 30, 38, 47, 57, 70, 86, 105, 127, 153, 183, 217, 255, 297, 343, 399, 500],
	expensive: [0, 20, 50, 125, 310, 403, 517, 666, 860, 1110, 1437, 1862, 2414, 3132, 4065, 5278, 6855, 8906, 11571, 15036, 19540],
	midrange: [0, 10, 35, 85, 210, 273, 348, 446, 573, 740, 955, 1234, 1598, 2071, 2686, 3486, 3486, 4525, 5877, 7633, 9917],
	cheap: [0, 10, 25, 55, 135, 169, 213, 270, 345, 442, 568, 732, 946, 1224, 1584, 2052, 2662, 3454, 4484, 5822, 7563],
	mineLevels: {
		crystal: 1,
		steel: 1,
		titanium: 1,
		tritium: 1
	}	
}

var mineCosts = {
	crystal: {
		crystal: mineData.expensive,
		steel: mineData.expensive,
		titanium: mineData.midrange,
		tritium: mineData.cheap,
		energy: mineData.energy
	},
	steel: {
		crystal: mineData.expensive,
		steel: mineData.expensive,
		titanium: mineData.midrange,
		tritium: mineData.cheap,
		energy: mineData.energy
	},
	titanium: {
		crystal: mineData.expensive,
		steel: mineData.midrange,
		titanium: mineData.expensive,
		tritium: mineData.cheap,
		energy: mineData.energy
	},
	tritium: {
		crystal: mineData.cheap,
		steel: mineData.midrange,
		titanium: mineData.expensive,
		tritium: mineData.expensive,
		energy: mineData.energy
	}
}