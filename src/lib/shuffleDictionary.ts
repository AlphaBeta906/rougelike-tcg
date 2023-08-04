import shuffleArray from "./shuffleArray";

export default function shuffleDictionary<T>(dict: Record<string, T>) {
	let keys = Object.keys(dict);
	let shuffledKeys = shuffleArray(keys);
	let shuffledDict: Record<string, T> = {};
	for (let key of shuffledKeys) {
		shuffledDict[key] = dict[key];
	}
	return shuffledDict;
}