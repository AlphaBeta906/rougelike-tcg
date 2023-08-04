import { CardData } from "./cardTypes"

export const cards: Record<string, CardData> = {
	"Peak-and-Trough Analysis": {
		image: "img/peak-and-trough.png",
		type: "effect",
		rarity: "rare",
		availability: "limited",
		energy: 4,
		power: 20,
		moves: [
			{
				type: "end turn",
				description: "If you are winning, all cards in your hand permanently gain 10 power."
			},
			{
				type: "end turn",
				description: "If you are winning, all cards in your hand permanently lose 5 power."
			},
		],
		category: "Technical Analysis"
	},
	"Alcohol": {
		image: "img/alcohol.png",
		type: "effect",
		rarity: "rare",
		energy: 6,
		power: 36,
		moves: [
			{
				type: "draw",
				description: "All alcohol cards in your deck, wherever they are, permanently gain 20 power."
			},
			{
				type: "draw",
				description: "Your enemy's Sober and Prohibition cards permanently lose 25 power."
			},
		],
		category: "Functional Groups"
	},
	"Isopropyl alcohol": {
		image: "img/isopropyl-alcohol.png",
		type: "combatant",
		rarity: "common",
		energy: 2,
		power: 30,
		moves: [
			{
				type: "play",
				description: "All bactria and virus cards in your opponent's hand lose 10 power for two moves."
			}
		],
		category: "Alcohols"
	},
	"GreenCross": {
		image: "img/greencross.png",
		type: "combatant",
		rarity: "legendary",
		availability: "limited",
		energy: 8,
		power: 60,
		moves: [
			{
				type: "draw",
				description: "All sanitizer alcohols in your deck, wherever they are, gain 40 power for 10 moves."
			},
			{
				type: "end turn",
				description: "If your enemy drew Biogenic Alcohol, this card loses 60 power."
			}
		],
		category: "Companies × Alcohols"
	},
	"Biogenic Alcohol": {
		image: "img/biogenic.png",
		type: "combatant",
		rarity: "legendary",
		availability: "limited",
		energy: 8,
		power: 60,
		moves: [
			{
				type: "draw",
				description: "All sanitizer alcohols in your deck, wherever they are, gain 40 power for 10 moves."
			},
			{
				type: "end turn",
				description: "If your enemy drew GreenCross, this card loses 60 power."
			}
		],
		category: "Companies × Alcohols",
	},
	"Paracetamol Biogesic": {
		image: "img/paracetamol-biogesic.png",
		type: "combatant",
		rarity: "epic",
		energy: 10,
		power: 57,
		moves: [
			{
				type: "draw",
				description: "Flip a coin. If it lands on heads, your opponent's Biogenic Alcohol will lose all its power and be discarded."
			},
			{
				type: "draw",
				description: "Flip a coin. If it lands on tails, this card will lose all its power and be discarded."
			}
		],
		category: "Companies × Medicine"
	},
	"Asteraforte": {
		image: "img/asteraforte.png",
		type: "combatant",
		rarity: "epic",
		energy: 10,
		power: 57,
		moves: [
			{
				type: "draw",
				description: "Flip a coin. If it lands on heads, your opponent's Paracetamol Biogesic will lose all its power and be discarded."
			},
			{
				type: "draw",
				description: "Flip a coin. If it lands on tails, this card will lose all its power and be discarded."
			}
		],
		category: "Medicine"
	},
	"Plagiarism": {
		image: "img/plagiarism.png",
		bgCover: true,
		type: "combatant",
		rarity: "epic",
		availability: "limited",
		energy: 12,
		power: 77,
		moves: [
			{
				type: "ability",
				description: "Imitate an ability from one of your opponent's cards. This can only be used once until returned.",
				price: 14
			},
			{
				type: "end turn",
				description: "This card loses 20 power."
			}
		],
		category: "Cheating"
	},
	"Planck Constant": {
		image: "img/planck-constant.png",
		type: "tool",
		rarity: "rare",
		energy: 3,
		power: 20,
		moves: [
			{
				type: "play",
				description: "Quantum Mechanics cards using this card will get an extra 30 power boost."
			}
		],
		category: "Quantum Mechanics"
	},
	"January Barometer": {
		image: "img/january-barometer.png",
		bgCover: true,
		type: "effect",
		rarity: "legendary",
		availability: "limited",
		energy: 10,
		power: 0,
		moves: [
			{
				type: "draw",
				description: "This card only works if the card stays at the first turn of a round to the last."
			},
			{
				type: "end round",
				description: "If you win the round, all cards will gain 40 power permanently."
			},
			{
				type: "end round",
				description: "If you lose the round, all cards will lose 40 power permanently."
			}
		],
		category: "Weird Indicators"
	},
	"Support and Resistance": {
		image: "img/support-and-resistance.png",
		type: "effect",
		rarity: "rare",
		energy: 4,
		power: 55,
		moves: [
			{
				type: "draw",
				description: "This card enhances Peak-to-Thorough Progression by 30 power."
			}
		],
		category: "Technical Analysis"
	},
	"Replete": {
		image: "img/replete.png",
		bgCover: true,
		type: "combatant",
		rarity: "epic",
		energy: 9,
		power: 0,
		moves: [
			{
				type: "ability",
				description: "All power generated during the turn will be transferred to the power this card. (The total power of the turn will be 0.)",
				price: 4
			}
		],
		category: "Ants"
	},
	"Caffeine": {
		image: "img/caffeine.png",
		type: "effect",
		rarity: "common",
		availability: "limited",
		energy: 4,
		power: 43,
		moves: [
			{
				type: "play",
				description: "Gain 2-5 energy, however in the next turn lose 2-5 energy."
			}
		],
		category: "Stimulants"
	},
	"Caesura": {
		image: "img/caesura.png",
		type: "effect",
		rarity: "epic",
		availability: "limited",
		energy: 6,
		power: 10,
		moves: [
			{
				type: "play",
				description: "Gain an extra turn. The turn can be dedicated to attack, defense and effect cards."
			}
		],
		category: "Poetic Devices"
	},
	"Oxymoron": {
		image: "img/oxymoron.png",
		type: "effect",
		rarity: "common",
		availability: "limited",
		energy: 5,
		power: 54,
		moves: [
			{
				type: "draw",
				description: "All fusions of two different categories, in both player's hands, will gain 20 power."
			}
		],
		category: "Poetic Devices"
	},
	"Negation": {
		image: "img/negation.png",
		type: "effect",
		rarity: "rare",
		energy: 7,
		power: 56,
		moves: [
			{
				type: "ability",
				description: "An ability from a card that you choose in your hand will do the opposite as it intended.",
				price: 5
			}
		],
		category: "Logical Operators"
	},
	"Golden Ratio": {
		image: "img/golden-ratio.png",
		bgCover: true,
		type: "combatant",
		rarity: "rare",
		energy: 11,
		power: 61,
		moves: [
			{
				type: "draw",
				description: "Your Fibonacci sequence card, wherever it is, gains 16 power permanently."
			}
		],
		category: "Irrationals"
	},
	"Phi": {
		image: "img/phi.png",
		type: "combatant",
		rarity: "legendary",
		availability: "restricted",
		energy: 12,
		power: 100,
		moves: [
			{
				type: "draw",
				description: "All player's Golden Ratio and Wave Function cards, wherever it is, gains 60 power permanently."
			}
		],
		category: "Greek Letters"
	},
	"Wave Function": {
		image: "img/wave-function.png",
		type: "combatant",
		rarity: "epic",
		energy: 6,
		power: 56,
		moves: [
			{
				type: "play",
				description: "Your Schrödinger Equation card gains 44 power this turn."
			}
		],
		category: "Quantum Mechanics"
	},
	"Ultraviolet Catastrophe": {
		image: "img/ultraviolet-catastrophe.png",
		type: "combatant",
		rarity: "rare",
		energy: 12,
		power: 77,
		moves: [
			{
				type: "draw",
				description: "Your Bright Line Spectra, and Photoelectric Effect cards will gain 35 power permanently."
			}
		],
		category: "Paradoxes × Quantum Mechanics"
	},
	"Mucking": {
		image: "img/mucking.png",
		bgCover: true,
		type: "effect",
		rarity: "epic",
		availability: "limited",
		energy: 7,
		power: 56,
		moves: [
			{
				type: "ability",
				description: "Clear your hand. Draw 5 new cards.",
				price: 7
			}
		],
		category: "Cheating × Poker"
	},
	"Taoism": {
		image: "img/taoism.png",
		type: "combatant",
		rarity: "epic",
		availability: "limited",
		energy: 7,
		power: 56,
		moves: [
			{
				type: "draw",
				description: "If you have Lao Tzu or Zhuang Zhou, they gain 20 power permanently."
			}
		],
		category: "Early Chinese Philosophy"
	},
	"Tao": {
		image: "img/tao.png",
		type: "effect",
		rarity: "epic",
		availability: "restricted",
		energy: 11,
		power: 40,
		moves: [
			{
				type: "linger",
				description: "Every move, all cards in your hand will gain 40 power, and all cards in your opponent's hand will lose 40 power.",
			},
			{
				type: "linger",
				description: "Every other move, all cards in your hand will lose 40 power, and all cards in your opponent's hand will gain 40 power.",
			},
		],
		category: "Taoism"
	},
	"Lao Tzu": {
		image: "img/lao-tzu.png",
		bgCover: true,
		type: "combatant",
		rarity: "legendary",
		energy: 12,
		power: 60,
		moves: [
			{
				type: "play",
				description: "All Taoism related cards will gain 30 power permanently.",
			}
		],
		category: "Taoism"
	},
	"Theory of Everything": {
		image: "img/theory-of-everything.png",
		bgCover: true,
		type: "combatant",
		availability: "restricted",
		rarity: "legendary",
		energy: 15,
		power: 99,
		moves: [
			{
				type: "play",
				description: "Your String Theory and Special Relativity cards gain 50 power for 3 turns.",
			},
			{
				type: "play",
				description: "All Quantum Mechanics cards gain 20 power permanently.",
			}
		],
		category: "Beyond the Standard Model"
	},
	"Fibonacci Sequence": {
		image: "img/fibonacci-sequence.png",
		bgCover: true,
		type: "tool",
		availability: "limited",
		rarity: "rare",
		energy: 11,
		power: 5,
		moves: [
			{
				type: "end round",
				description: "Change power to the next Fibonacci number times two.",
			},
		],
		category: "Sequences"
	},
	"Minimalism": {
		image: "img/minimalism.png",
		bgCover: true,
		type: "resource",
		rarity: "rare",
		energy: 8,
		power: 58,
		moves: [
			{
				type: "end turn",
				description: "After drawing, remove cards from your hand until you have 5 cards. Gain 6 energy for each card removed.",
			},
		],
		category: "Aesthetics"
	},
	"Library of Alexandria": {
		image: "img/library-of-alexandria.png",
		bgCover: true,
		type: "resource",
		rarity: "epic",
		energy: 2,
		power: 30,
		moves: [
			{
				type: "end turn",
				description: "Gain 3 energy or store 3 energy in the card.",
			},
			{
				type: "ability",
				description: "Release all energy stored.",
				price: 0
			},
		],
		category: "Historical Libraries"
	}
}