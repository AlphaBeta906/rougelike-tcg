import shuffleArray from "./shuffleArray";
export default function shuffleDictionary<T>(dict: Record<string, T>) {
	const keys = Object.keys(dict);
	const shuffledKeys = shuffleArray(keys);
	const shuffledDict: Record<string, T> = {};
	for (const key of shuffledKeys) {
		shuffledDict[key] = dict[key];
	}
	return shuffledDict;
}