import { MoveContent } from "@/lib/moveContentParser";

const rarity = ["common", "rare", "epic", "legendary"] as const
type Rarity = typeof rarity[number];

const type = ["combatant", "resource", "effect", "tool", "trap"] as const
type Type = typeof type[number];

const moveType = ["ability", "start", "draw", "play", "trap", "return", "end round", "end turn", "linger", "restriction"] as const
export type MoveType = typeof moveType[number];

const availability = ["none", "limited", "restricted"] as const
export type Availability = typeof availability[number];

export type Move = {
	type: MoveType
	description: string
	moveContent?: MoveContent // will change later
	price?: number
}

export type CardData = {
	image: string,
	type: Type,
	rarity: Rarity,
	availability?: Availability,
	energy: number,
	power: number,
	moves: Move[],
	category: string
	bgCover?: boolean
	mini?: boolean
}

export type TCard = {
	name: string,
	image: string,
	type: Type,
	rarity: Rarity,
	availability?: Availability,
	energy: number,
	power: number,
	moves: Move[],
	category: string,
	bgCover?: boolean
	mini?: boolean
}