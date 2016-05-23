

/*
 * This contains all data for a particular planet
 */
var planetData = {
	resources: {
		crystal: undefined,
		steel: undefined,
		titanium: undefined,
		tritium: undefined
	},
	resourceRates: {
		crystal: undefined,
		steel: undefined,
		titanium: undefined,
		tritium: undefined
	},
	energy: undefined,
	structures: undefined,
	maxStructures: undefined,

	buildings: {
		mine: {
			crystal: [1],
			steel: [1],
			titanium: [1],
			tritium: [1]
		},
		storage: {
			crystal: [1],
			steel: [1],
			titanium: [1],
			tritium: [1]
		},
		power: {
			hydro: [],
			thermal: [],
			wind: [],
			ppg: [1],
			liquid: [],
			furnace: [],
			nuclear: []
		},
		economy: {

		},
		fleet: {

		},
		defense: {

		}
	},
	craft: {

	},
	technology: {

	},
	reference: {

	}
}

/*
 * The way this is going to work is there will be a master building file, but I'll keep track of level and quantity in this file
 * Each building node will consist of an array of 0+ elements, each indicating a level of a particular building
 * Those will be subject to a capped length based on planet-specific attributes such as quantity available, as well as available building spots
 */