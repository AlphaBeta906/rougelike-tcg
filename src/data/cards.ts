import { CardData } from "./cardTypes";

export const cards: Record<string, CardData> = {
	"Peak-and-Trough Analysis": {
		image: "peak-and-trough.png",
		type: "effect",
		rarity: "rare",
		availability: "limited",
		energy: 4,
		power: 20,
		moves: [
			{
				type: "end turn",
				description: "If you are winning, all cards in your hand permanently gain 10 power.",
				moveContent: {
					conditions: {
						winning: true
					},
					target: {
						player: true,
						hand: true
					},
					effects: {
						powerChange: 10,
						permanent: true
					}
				}
			},
			{
				type: "end turn",
				description: "If you are winning, all cards in your hand permanently lose 10 power.",
				moveContent: {
					conditions: {
						losing: true
					},
					target: {
						player: true,
						hand: true
					},
					effects: {
						powerChange: -10,
						permanent: true
					}
				}
			},
		],
		category: "Technical Analysis"
	},
	"Alcohol": {
		image: "alcohol.png",
		type: "effect",
		rarity: "rare",
		energy: 6,
		power: 36,
		moves: [
			{
				type: "draw",
				description: "All alcohol cards in your deck, wherever they are, permanently gain 20 power.",
				moveContent: {
					target: {
						player: true,
						subcategory: ["Alcohols"]
					},
					effects: {
						powerChange: 20,
						permanent: true
					}
				}
			},
			{
				type: "draw",
				description: "Your enemy's Sober and Prohibition cards permanently lose 25 power.",
				moveContent: {
					target: {
						player: false,
						specificCards: ["Sober", "Prohibition"]
					},
					effects: {
						powerChange: -25,
						permanent: true
					}
				}
			},
		],
		category: "Functional Groups"
	},
	"Isopropyl Alcohol": {
		image: "isopropyl-alcohol.png",
		type: "combatant",
		rarity: "common",
		energy: 2,
		power: 30,
		moves: [
			{
				type: "play",
				description: "All bactria and virus cards in your opponent's hand lose 10 power for two moves.",
				moveContent: {
					target: {
						player: false,
						subcategory: ["Bacteria", "Virus"]
					},
					effects: {
						powerChange: -10,
						forMoves: 2
					}
				}
			}
		],
		category: "Alcohols"
	},
	"Plagiarism": {
		image: "plagiarism.png",
		bgCover: true,
		type: "combatant",
		rarity: "epic",
		availability: "limited",
		energy: 12,
		power: 77,
		moves: [
			{
				type: "ability",
				description: "Imitate an ability from one of your opponent's cards.",
				price: 14,
				moveContent: {
					action: {
						from: "choose",
						action: "imitate"
					},
					target: {
						player: false,
						anywhere: true
					}
				}
			},
			{
				type: "restriction",
				description: "This card's abilities can be used once until returned.",
				moveContent: {
					restriction: {
						target: "abilities",
						untilWhen: "returned"
					}
				}
			},
			{
				type: "end turn",
				description: "This card loses 20 power.",
				moveContent: {
					target: {
						thisCard: true
					},
					effects: {
						powerChange: -20,
						permanent: true
					}
				}
			}
		],
		category: "Cheating"
	},
	"Planck Constant": {
		image: "planck-constant.png",
		type: "operator",
		rarity: "rare",
		energy: 3,
		power: 20,
		moves: [
			{
				type: "play",
				description: "Quantum Mechanics cards using this card will get an extra 30 power boost.",
				moveContent: {
					conditions: {
						inputCard: true,
						subcategory: ["Quantum Mechanics"]
					},
					target: {
						inputCard: true
					},
					effects: {
						powerChange: 30,
						forMoves: 1
					}
				}
			}
		],
		category: "Quantum Mechanics"
	},
	"January Barometer": {
		image: "january-barometer.png",
		bgCover: true,
		type: "effect",
		rarity: "legendary",
		availability: "limited",
		energy: 10,
		power: 0,
		moves: [
			{
				type: "end round",
				description: "If you win the round, all cards will gain 40 power permanently.",
				moveContent: {
					conditions: {
						wonRound: true
					},
					target: {
						player: true,
						allCards: true
					},
					effects: {
						powerChange: 40,
						permanent: true
					}
				}
			},
			{
				type: "end round",
				description: "If you lose the round, all cards will lose 40 power permanently.",
				moveContent: {
					conditions: {
						wonRound: true
					},
					target: {
						player: true,
						allCards: true
					},
					effects: {
						powerChange: -40,
						permanent: true
					}
				}
			}
		],
		category: "Weird Indicators"
	},
	"Support and Resistance": {
		image: "support-and-resistance.png",
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
		image: "replete.png",
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
		image: "caffeine.png",
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
		image: "caesura.png",
		mini: true,
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
		image: "oxymoron.png",
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
		image: "negation.png",
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
		image: "golden-ratio.png",
		bgCover: true,
		type: "combatant",
		rarity: "rare",
		energy: 6,
		power: 61,
		moves: [
			{
				type: "draw",
				description: "Your Fibonacci sequence card, wherever it is, gains 16 power permanently.",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Fibonacci Sequence"]
					},
					effects: {
						powerChange: 16,
						permanent: true
					}
				}
			}
		],
		category: "Irrationals"
	},
	"Phi": {
		image: "phi.png",
		type: "combatant",
		rarity: "legendary",
		availability: "restricted",
		energy: 12,
		power: 100,
		moves: [
			{
				type: "play",
				description: "All player's Golden Ratio and Wave Function cards, wherever it is, gains 60 power permanently.",
				moveContent: {
					target: {
						everyone: true,
						specificCards: ["Golden Ratio", "Wave Function"]
					},
					effects: {
						powerChange: 60,
						permanent: true
					}
				}
			},
			{
				type: "play",
				description: "All player's Golden Ratio and Wave Function cards, wherever it is, gains 60 power permanently.",
				moveContent: {
					target: {
						everyone: true,
						specificCards: ["Phi", "Pi"]
					},
					effects: {
						powerChange: 60,
						permanent: true
					}
				}
			}
		],
		category: "Greek Letters"
	},
	"Wave Function": {
		image: "wave-function.png",
		type: "combatant",
		rarity: "epic",
		energy: 6,
		power: 56,
		moves: [
			{
				type: "play",
				description: "Your Schrödinger Equation card gains 44 power this turn.",
				moveContent: {
					target: {
						player: true, 
						specificCards: ["Schrödinger Equation"]
					},
					effects: {
						powerChange: 44,
						forMoves: 1
					}
				}
			}
		],
		category: "Quantum Mechanics"
	},
	"Ultraviolet Catastrophe": {
		image: "ultraviolet-catastrophe.png",
		bgCover: true,
		type: "combatant",
		rarity: "rare",
		energy: 12,
		power: 77,
		moves: [
			{
				type: "draw",
				description: "Your Bright Line Spectra, and Photoelectric Effect cards will gain 35 power permanently.",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Bright Line Spectra", "Photoelectric Effect"]
					},
					effects: {
						powerChange: 35,
						permanent: true
					}
				}
			}
		],
		category: "Paradoxes × Quantum Mechanics"
	},
	"Mucking": {
		image: "mucking.png",
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
				price: 7,
				moveContent: {
					effects: {
						discardNumber: "all",
						discardAndReplace: true
					}
				}
			}
		],
		category: "Cheating × Poker"
	},
	"Taoism": {
		image: "taoism.png",
		type: "combatant",
		rarity: "epic",
		availability: "limited",
		energy: 7,
		power: 56,
		moves: [
			{
				type: "draw",
				description: "If you have Lao Tzu or Zhuang Zhou, they gain 20 power permanently.",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Lao Tzu", "Zhuang Zhou"]
					},
					effects: {
						powerChange: 20,
						permanent: true
					}
				}
			}
		],
		category: "Early Chinese Philosophy"
	},
	"Tao": {
		image: "tao.png",
		type: "effect",
		rarity: "epic",
		availability: "restricted",
		energy: 11,
		power: 40,
		moves: [
			{
				type: "linger",
				description: "Every even turn, all cards in your hand will gain 40 power, and all cards in your opponent's hand will lose 40 power.",
			},
			{
				type: "linger",
				description: "Every odd turn, all cards in your hand will lose 40 power, and all cards in your opponent's hand will gain 40 power.",
			},
		],
		category: "Taoism"
	},
	"Lao Tzu": {
		image: "lao-tzu.png",
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
		image: "theory-of-everything.png",
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
				moveContent: {
					target: {
						player: true,
						specificCards: ["String Theory", "Special Relativity"]
					},
					effects: {
						powerChange: 50,
						forMoves: 2
					}
				}
			},
			{
				type: "play",
				description: "All Quantum Mechanics cards gain 20 power permanently.",
				moveContent: {
					target: {
						everyone: true,
						subcategory: ["Quantum Mechanics"]
					},
					effects: {
						powerChange: 20,
						permanent: true
					}
				}
			}
		],
		category: "Beyond the Standard Model"
	},
	"Fibonacci Sequence": {
		image: "fibonacci-sequence.png",
		bgCover: true,
		type: "operator",
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
		image: "minimalism.png",
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
		image: "library-of-alexandria.png",
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
	},
	"Tu Quoque": {
		image: "tu-quoque.png",
		bgCover: true,
		type: "trap",
		rarity: "epic",
		energy: 7,
		power: 0,
		moves: [
			{
				type: "trap",
				description: "If one of your cards in play gets debuffed, one of your opponent's cards in play will lose the equivalent percentage loss of the card that suffered the largest debuff this turn.",
			},
		],
		category: "Logical Fallacies"
	},
	"Baghdad House of Wisdom": {
		image: "baghdad-house-of-wisdom.png",
		bgCover: true,
		type: "effect",
		rarity: "legendary",
		energy: 8,
		power: 50,
		moves: [
			{
				type: "ability",
				description: "A card you choose in hand will gain 15% more power and lose 2 energy.",
				price: 6
			},
			{
				type: "play",
				description: "All Islamic Golden Age cards gain 45 power for the round."
			}
		],
		category: "Historical Libraries"
	},
	"Mictlantecuhtli": {
		image: "mictlantecuhtli.png",
		type: "combatant",
		rarity: "epic",
		availability: "limited",
		energy: 9,
		power: 78,
		moves: [
			{
				type: "ability",
				description: "Force your opponent to sacrifice two cards. This move can only be used once a round.",
				price: 7
			},
			{
				type: "play",
				description: "If played with a card that has been sacrificed in the phase, this card gains 34 power for the round."
			}
		],
		category: "Aztec Mythology"
	},
	"Khepri": {
		image: "khepri.png",
		type: "trap",
		rarity: "epic",
		energy: 4,
		power: 23,
		moves: [
			{
				type: "trap",
				description: "If one of your cards gets sacrificed, in the next phase it will be undone.",
			},
		],
		category: "Egyptian Mythology"
	},
	"Quantum Tunneling": {
		image: "quantum-tunneling.png",
		bgCover: true,
		type: "operator",
		rarity: "legendary",
		energy: 7,
		power: 20,
		moves: [
			{
				type: "play",
				description: "This input card's attack will bypass enemy defense and directly be applied to the score.",
			},
		],
		category: "Quantum Computing"
	},
	"The Cobra Effect": {
		image: "the-cobra-effect.png",
		bgCover: true,
		type: "trap",
		rarity: "rare",
		availability: "limited",
		energy: 8,
		power: 33,
		moves: [
			{
				type: "trap",
				description: "If one of your opponent's cards get buffed, all enemy cards in hand lose 20 power this round.",
			},
		],
		category: "Unintended Consequences"
	},
	"Murphy's Law": {
		image: "murphy's-law.png",
		bgCover: true,
		type: "effect",
		rarity: "legendary",
		availability: "limited",
		energy: 8,
		power: 33,
		moves: [
			{
				type: "draw",
				description: "Gain 200 power for the rest of the round.",
			},
			{
				type: "linger",
				description: "After the end of the round, all positive effects reverse, and trigger when the card is in hand, for the rest of the round.",
			},
		],
		category: "Unintended Consequences"
	},
	"Hippasus of Metapontum": {
		image: "hippasus.png",
		bgCover: true,
		type: "operator",
		rarity: "legendary",
		availability: "limited",
		energy: 14,
		power: 121,
		moves: [
			{
				type: "draw",
				description: "Al",
				moveContent: {
					target: {
						everyone: true,
						subcategory: ["Irrationals"]
					},
					effects: {
						powerChange: 25,
						forMoves: 3
					}
				}
			},
			{
				type: "play",
				description: "Al",
				moveContent: {
					conditions: {
						inputCard: true,
						subcategory: ["Irrationals"]
					},
					target: {
						inputCard: true,
					},
					effects: {
						powerChange: 30,
						forMoves: 1
					}
				}
			},
			{
				type: "return",
				description: "Al",
				moveContent: {
					target: {
						thisCard: true
					},
					effects: {
						sacrifice: true,
						noRevive: true
					}
				}
			}
		],
		category: "The Pythagoreans"
	},
	"Harmonic Resonance": {
		image: "harmonic-resonance.png",
		bgCover: true,
		type: "operator",
		rarity: "rare",
		availability: "limited",
		energy: 5,
		power: 30,
		moves: [
			{
				type: "play",
				description: "All cards that are in the same category as the input card will gain 50 power for the round.",
				moveContent: {
					target: {
						player: true,
						inputCardTrait: "subcategory"
					},
					effects: {
						powerChange: 18,
						forMoves: 1
					}
				}
			}
		],
		category: "Music Theory"
	},
	"Whole Note": {
		image: "whole-note.png",
		mini: true,
		type: "effect",
		rarity: "epic",
		availability: "limited",
		energy: 10,
		power: 0,
		moves: [
			{
				type: "play",
				description: "Make your opponent skip the next phase."
			}
		],
		category: "Music Theory"
	},
	"Philosopher's Stone": {
		image: "philosopher's-stone.png",
		type: "combatant",
		rarity: "legendary",
		availability: "restricted",
		energy: 25,
		power: 130,
		moves: [
			{
				type: "play",
				description: "All Alchemy cards, gains 25 power for the round."
			},
			{
				type: "return",
				description: "",
				moveContent: {
					target: {
						thisCard: true
					},
					effects: {
						sacrifice: true,
						noRevive: true
					}
				}
			}
		],
		category: "Alchemy"
	},
	"Wynn": {
		image: "wynn.png",
		type: "effect",
		rarity: "epic",
		energy: 8,
		power: 77,
		moves: [
			{
				type: "play",
				description: "M",
				moveContent: {
					conditions: {
						winning: true
					},
					target: {
						player: true,
						hand: true
					},
					effects: {
						powerChange: 50,
						forMoves: 1
					}
				}
			}
		],
		category: "Old English Letters"
	},
	"Æsh": {
		image: "aesh.png",
		type: "effect",
		rarity: "rare",
		availability: "limited",
		energy: 6,
		power: 43,
		moves: [
			{
				type: "play",
				description: "Your cards that contains \"ae\", will gain 40 power for this turn.",
			}
		],
		category: "Old English Letters"
	},
	"Amp": {
		image: "amp.png",
		bgCover: true,
		type: "operator",
		rarity: "epic",
		availability: "limited",
		energy: 4,
		power: 20,
		moves: [
			{
				type: "play",
				description: ".",
				moveContent: {
					target: {
						inputCard: true
					},
					effects: {
						amplify: 20,
						forMoves: 1
					}
				}
			}
		],
		category: "Music Technology"
	},
	"Pepper's Ghost": {
		image: "pepper's-ghost.png",
		bgCover: true,
		type: "operator",
		rarity: "epic",
		availability: "limited",
		energy: 8,
		power: 20,
		moves: [
			{
				type: "return",
				description: "Duplicate the input card that lasts until played, and place it on your hand.",
			}
		],
		category: "Illusions × Spices"
	},
	"Pavlov's Bell": {
		image: "pavlov's-bell.png",
		type: "effect",
		rarity: "common",
		availability: "limited",
		energy: 2,
		power: 30,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: false,
						oneCard: true
					},
					effects: {
						lock: true,
						forMoves: 1
					}
				}
			},
			{
				type: "restriction",
				description: "",
				moveContent: {
					restriction: {
						sacrificeAfterMoves: 2
					}
				}
			}
		],
		category: "Classical Conditioning"
	},
	"Wheel": {
		image: "wheel.png",
		bgCover: true,
		type: "combatant",
		rarity: "epic",
		energy: 5,
		power: 67,
		moves: [
			{
				type: "draw",
				description: "",
				moveContent: {
					target: {
						player: false,
						oneCard: true
					},
					effects: {
						burn: true,
						burnDegree: 0.6,
						forMoves: 5
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Pi", "Tau", "Radian"]
					},
					effects: {
						powerChange: 14,
						permanent: true
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Axel"]
					},
					effects: {
						powerChange: 40,
						forMoves: 1
					}
				}
			}	
		],
		category: "Early Technology"
	},
	"Pi": {
		image: "pi.png",
		type: "combatant",
		rarity: "legendary",
		availability: "limited",
		energy: 6,
		power: 62,
		moves: [
			{
				type: "end turn",
				description: "",
				moveContent: {
					conditions: {
						winning: true
					},
					target: {
						thisCard: true
					},
					effects: {
						powerChange: 14,
						permanent: true
					}
				}
			},
			{
				type: "draw",
				description: "",
				moveContent: {
					target: {
						player: true,
						subcategory: ["Greek Letters", "Irrationals"]
					},
					effects: {
						powerChange: 14,
						permanent: true
					}
				}
			},
			{
				type: "draw",
				description: "",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Phi", "Tau"]
					},
					effects: {
						powerChange: 14,
						permanent: true
					}
				}
			}
		],
		category: "Greek Letters × Irrationals"
	},
	"Sucrose": {
		image: "sucrose.png",
		type: "resource",
		rarity: "legendary",
		energy: 4,
		power: 60,
		moves: [
			{
				type: "end turn",
				description: "",
				moveContent: {
					effects: {
						gainEnergy: 10
					}
				}
			},
			{
				type: "return",
				description: "",
				moveContent: {
					target: {
						player: true,
						hand: true
					},
					effects: {
						powerChange: -65,
						untilDestroyed: true
					}
				}
			},
			{
				type: "draw",
				description: "",
				moveContent: {
					target: {
						player: true,
						subcategory: ["Sugars"]
					},
					effects: {
						powerChange: 20,
						permanent: true
					}
				}
			}
		],
		category: "Sugars"
	},
	"Kamikaze": {
		image: "kamikaze.png",
		bgCover: true,
		type: "operator",
		rarity: "epic",
		energy: 5,
		power: 0,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						inputCard: true
					},
					effects: {
						powerChange: 65,
						forMoves: 1
					}
				}
			},
			{
				type: "return",
				description: "",
				moveContent: {
					target: {
						inputCard: true
					},
					effects: {
						sacrifice: true,
						noRevive: true
					}
				}
			}
		],
		category: "Aerial Warfare"
	},
	"Psi": {
		image: "psi.png",
		type: "combatant",
		rarity: "legendary",
		availability: "limited",
		energy: 10,
		power: 70,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						category: ["Philosophy", "Psychology"]
					},
					effects: {
						powerChange: 22,
						permanent: true
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						everyone: true,
						specificCards: ["Sai", "Neptune"]
					},
					effects: {
						powerChange: 22,
						permanent: true
					}
				}
			}
		],
		category: "Greek Letters"
	},
	"Big-Omega Notation": {
		image: "big-omega-notation.png",
		type: "effect",
		rarity: "legendary",
		energy: 0,
		power: 0,
		moves: [
			{
				type: "draw",
				description: "",
				moveContent: {
					target: {
						player: true,
						hand: true
					},
					effects: {
						powerChange: 16,
						untilReturned: true
					}
				}
			}
		],
		category: "Analysis of Algorithms"
	},
	"Big-O Notation": {
		image: "big-o-notation.png",
		type: "effect",
		rarity: "rare",
		availability: "limited",
		energy: 4,
		power: 34,
		moves: [
			{
				type: "return",
				description: "",
				moveContent: {
					target: {
						player: true,
						resources: true
					},
					effects: {
						augment: 1
					}
				}
			}
		],
		category: "Analysis of Algorithms"
	},
	"Wheat": {
		image: "wheat.png",
		bgCover: true,
		type: "combatant",
		rarity: "common",
		energy: 3,
		power: 22,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						subcategory: ["Ancient Civilizations", "Cereal Grains"]
					},
					effects: {
						powerChange: 7
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						subcategory: ["Starches"]
					},
					effects: {
						powerChange: 10
					}
				}
			}
		],
		category: "Cereal Grains"
	},
	"Oxygen": {
		image: "oxygen.png",
		type: "combatant",
		rarity: "common",
		energy: 4,
		power: 27,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						category: ["Biology"]
					},
					effects: {
						powerChange: 6
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Water", "Ozone"]
					},
					effects: {
						powerChange: 12
					}
				}
			}
		],
		category: "Elements of the Periodic Table"
	},
	"Choke Point": {
		image: "choke-point.png",
		bgCover: true,
		type: "combatant",
		rarity: "legendary",
		energy: 9,
		power: 7,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: false,
						hand: true
					},
					action: {
						action: "lock",
						from: "choose",
						forMoves: 1
					}
				}
			},
		],
		category: "Military Geography"
	},
	"Carbon Dioxide": {
		image: "carbon-dioxide.png",
		type: "combatant",
		rarity: "epic",
		energy: 4,
		power: 61,
		moves: [
			{
				type: "start",
				description: "",
				moveContent: {
					target: {
						player: true,
						hand: true
					},
					effects: {
						powerChange: -20,
						untilReturned: true
					}
				}
			},
		],
		category: "Greenhouse Gasses"
	},
	"Maize": {
		image: "maize.png",
		bgCover: true,
		type: "combatant",
		rarity: "rare",
		energy: 4,
		power: 45,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						specificCards: ["Maya Civilization", "Aztec Empire", "Inca Empire"]
					},
					effects: {
						powerChange: 7
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						subcategory: ["Starches"]
					},
					effects: {
						powerChange: 10
					}
				}
			}
		],
		category: "Cereal Grains"
	},
	"Amylase": {
		image: "amylase.png",
		type: "operator",
		rarity: "rare",
		energy: 5,
		power: 0,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						inputCard: true,
						subcategory: ["Sugars"]
					},
					effects: {
						powerChange: 15
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						inputCard: true,
						subcategory: ["Sugars"]
					},
					effects: {
						convertedTo: "Glucose"
					}
				}
			}
		],
		category: "Enzymes"
	},
	"Battle of Fort Sumter": {
		image: "battle-of-fort-sumter.png",
		bgCover: true,
		type: "effect",
		rarity: "epic",
		availability: "limited",
		energy: 10,
		power: 18,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: false,
						specificTrait: "locked",
					},
					effects: {
						powerChange: -15,
						untilReturned: true
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: true,
						subcategory: ["Battles of the American Civil War"]
					},
					effects: {
						powerChange: 20,
						untilReturned: true
					}
				}
			},
		],
		category: "Battles of the American Civil War"
	},
	"Battle of Bull Run": {
		image: "battle-of-bull-run.png",
		bgCover: true,
		type: "operator",
		rarity: "legendary",
		availability: "limited",
		energy: 7,
		power: 20,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					conditions: {
						currentPhase: "defending"
					},
					target: {
						inputCard: true
					},
					effects: {
						powerChange: 25,
						forMoves: 1
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					conditions: {
						player: true,
						playerAction: "play",
						specificCardForAction: ["Stonewall Jackson"]
					},
					target: {
						player: true,
						hand: true
					},
					effects: {
						powerChange: 10,
						forMoves: 1
					}
				}
			},
		],
		category: "Battles of the American Civil War"
	},
	"Battle of Vicksburg": {
		image: "battle-of-vicksburg.png",
		bgCover: true,
		type: "effect",
		rarity: "epic",
		availability: "limited",
		energy: 7,
		power: 49,
		moves: [
			{
				type: "draw",
				description: "",
				moveContent: {
					target: {
						thisCard: true
					},
					effects: {
						lock: true,
						untilRoundEnds: true
					}
				}
			},
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: false,
						hand: true
					},
					action: {
						from: "choose",
						action: "lock",
						untilRoundEnds: true
					}
				}
			},
			{
				type: "return",
				description: "",
				moveContent: {
					conditions: {
						winning: true
					},
					target: {
						player: true,
						specificCards: ["Fourth of July"]
					},
					effects: {
						powerChange: 35,
						untilReturned: true
					}
				}
			},
		],
		category: "Battles of the American Civil War"
	},
	"Battle of Appomattox": {
		image: "battle-of-appomattox.png",
		bgCover: true,
		type: "effect",
		rarity: "epic",
		energy: 9,
		power: 10,
		moves: [
			{
				type: "play",
				description: "",
				moveContent: {
					target: {
						player: false,
						hand: true
					},
					action: {
						from: "choose",
						action: "lock",
						untilRoundEnds: true
					}
				}
			},
		],
		category: "Battles of the American Civil War"
	},
};