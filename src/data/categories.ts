type CategoryData = {
	color: string,
	categories: string[]
}

export const categories: Record<string, CategoryData> = {
	"Philosophy": {
		color: "fuchsia",
		categories: [
			"Logical Operators",
			"Logical Fallacies",
			"Paradoxes",
			"Early Chinese Philosophy",
			"Taoism"
		]
	},
	"Psychology": {
		color: "pink",
		categories: [
			"Stimulants",
			"Classical Conditioning"
		]
	},
	"Religion & Mythology": {
		color: "red",
		categories: [
			"Aztec Mythology",
			"Egyptian Mythology"
		]
	},
	"Social Sciences": {
		color: "orange",
		categories: [
			"Technical Analysis",
			"Weird Indicators",
			"Companies",
			"Cheating",
			"Unintended Consequences"
		]
	},
	"Language": {
		color: "amber",
		categories: [
			"Greek Letters",
			"Old English Letters"
		]
	},
	"Biology": {
		color: "emerald",
		categories: [
			"Ants",
			"Sugars"
		]
	},
	"Mathematics": {
		color: "teal",
		categories: [
			"Irrationals",
			"Sequences",
		]
	},
	"Natural Sciences": {
		color: "cyan",
		categories: [
			"Functional Groups",
			"Alcohols",
			"Quantum Mechanics",
			"Medicine",
			"Beyond the Standard Model",
			"Alchemy"
		]
	},
	"Applied Sciences": {
		color: "sky",
		categories: [
			"Quantum Computing",
			"Spices",
			"Early Technology"
		]
	},
	"The Arts": {
		color: "blue",
		categories: [
			"Poker",
			"Aesthetics",
			"Music Theory",
			"Music Technology",
			"Illusions"
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
			"Historical Libraries",
			"The Pythagoreans",
			"Aerial Warfare"
		]
	},
}

export function getCategoryColors(categoryFindName: string): string[] {
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

export function getCategory(categoryFindName: string): string[] {	  
	const categoriesToFind = categoryFindName.split(" × ");
	let colors: string[] = [];

	for (const categoryName in categories) {
		const currentCategory = categories[categoryName];

		const subcategory = currentCategory.categories.find(category => categoriesToFind.includes(category));

		if (subcategory) {
			colors = [
				...colors,
				categoryName
			]
		}
	}

	if (Object.keys(colors).length === 0) {
		return [];
	} else {
		return Object.values(colors)
	}
}