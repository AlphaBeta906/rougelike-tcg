type CategoryData = {
	color: string,
	categories: string[]
}

export const categories: Record<string, CategoryData> = {
	"Philosophy & Psychology": {
		color: "fuchsia",
		categories: [
			"Logical Operators",
			"Paradoxes",
			"Early Chinese Philosophy",
			"Taoism"
		]
	},
	"Religions": {
		color: "red",
		categories: []
	},
	"Social Sciences": {
		color: "orange",
		categories: [
			"Technical Analysis",
			"Weird Indicators",
			"Companies",
			"Cheating"
		]
	},
	"Language": {
		color: "amber",
		categories: [
			"Greek Letters"
		]
	},
	"Natural Sciences": {
		color: "teal",
		categories: [
			"Functional Groups",
			"Stimulants",
			"Alcohols",
			"Quantum Mechanics",
			"Ants",
			"Medicine",
			"Irrationals",
			"Beyond the Standard Model",
			"Sequences"
		]
	},
	"Applied Sciences": {
		color: "sky",
		categories: []
	},
	"The Arts": {
		color: "blue",
		categories: [
			"Poker",
			"Aesthetics"
		]
	},
	"Literature": {
		color: "indigo",
		categories: [
			"Poetic Devices"
		]
	},
	"History & Geography": {
		color: "violet",
		categories: [
			"Historical Libraries"
		]
	},
}

export default function getCategory(categoryFindName: string): string[] {
	interface Dict {
		[key: number]: string;
	}
	  
	const categoriesToFind = categoryFindName.split(" × ");
	let colors: Dict = {};

	for (const categoryName in categories) {
		const currentCategory = categories[categoryName];

		const subcategory = currentCategory.categories.find(category => categoriesToFind.includes(category));

		if (subcategory) {
			colors = {
				...colors,
				[categoriesToFind.findIndex(category => category === subcategory)]: currentCategory.color
			}
		}
	}

	if (Object.keys(colors).length === 0) {
		return ["gray"];
	} else if (Object.keys(colors).length !== categoriesToFind.length) {
		for (let i = 0; i < categoriesToFind.length; i++) {
			if (!(i in colors)) {
				colors[i] = 'gray';
			}
		}

		return Object.values(colors)
	} else {
		return Object.values(colors)
	}
}
