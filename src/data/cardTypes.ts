const rarity = ["common", "rare", "epic", "legendary"] as const
type Rarity = typeof rarity[number];

const type = ["combatant", "resource", "effect", "tool"] as const
type Type = typeof type[number];

const moveType = ["ability", "start", "draw", "play", "return", "end round", "end turn", "linger"] as const
export type MoveType = typeof moveType[number];

const availability = ["none", "limited", "restricted"] as const
export type Availability = typeof availability[number];

export type Move<T extends MoveType> = {
	type: T,
	description: string
} & (T extends "ability" ? { price: number } : {});

export type CardData = {
	image: string,
	type: Type,
	rarity: Rarity,
	availability?: Availability,
	energy: number,
	power: number,
	moves: Move<MoveType>[],
	category: string
	bgCover?: boolean
}

export type TCard = {
	name: string,
	image: string,
	type: Type,
	rarity: Rarity,
	availability?: Availability,
	energy: number,
	power: number,
	moves: Move<MoveType>[],
	category: string,
	bgCover?: boolean
}