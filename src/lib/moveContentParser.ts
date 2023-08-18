export type MoveContent = {
	conditions?: {
		winning?: true
		wonRound?: true
		losing?: true
		lostRound?: true
		handSize?: number
		coinFlip?: "heads" | "tails"
		player?: boolean
		anyone?: true
		playerAction?: "draw" | "sacrifice"
		specificCardForAction?: string[]
		inputCard?: true
		category?: string[] // will change later
		subcategory?: string[] // will change later
	},
	target?: {
		player?: boolean // (player === true) => player & (player === false) => opponent
		everyone?: true
		specificCards?: string[]
		category?: string[] // will change later
		subcategory?: string[] // will change later
		hand?: true
		anywhere?: true
		thisCard?: true
		inputCard?: true
		allCards?: true
	},
	action?: {
		from: "choose" | "force"
		action: "imitate" | "sacrifice"
	}
	effects?: {
		powerChange?: number
		permanent?: true
		forMoves?: number
		sacrifice?: true,
		discardNumber?: number | "all",
		discardAndReplace?: true
		noRevive?: true
	}
	restriction?: {
		target?: "abilities"
		untilWhen?: "turn" | "round" | "returned"
	}
}

function formatList(list: Array<any>, conjunction: string) {
	if (list.length === 0) {
		return "";
	} else if (list.length === 1) {
		return list[0];
	} else if (list.length === 2) {
		return list.join(` ${conjunction} `)
	} else {
		return list.slice(0, -1).join(", ") + `, ${conjunction} ` + list.slice(-1);
	}
}

function formatText(input: string): string {
	const sentences = input.split('. ');
	const formattedSentences = sentences.map((sentence) => {
		const trimmedSentence = sentence.trim();
		if (trimmedSentence) {
			const firstChar = trimmedSentence.charAt(0).toUpperCase();
			const restOfSentence = trimmedSentence.slice(1);
			return firstChar + restOfSentence;
		}
		return '';
	});

	return formattedSentences.join('. ').replace(/ ,/g, ',').replace(/\s+/g, ' ');
}


export default function moveContentParser(moveContent: MoveContent) {
	// Note to self: Move descriptions follow order "If {conditions}, {target} {effects}"
	const { conditions, target, action, effects, restriction } = moveContent
	let conditionsText, restrictionsText = "";
	let targetList: Array<string> = [];
	let effectsList: Array<string> = [];

	// Conditions parser
	if (conditions !== undefined) {
		if (conditions.winning !== undefined) conditionsText = "If you're winning"
		else if (conditions.wonRound !== undefined) conditionsText = "If you won the round"
		else if (conditions.losing !== undefined) conditionsText = "If you're losing"
		else if (conditions.lostRound !== undefined) conditionsText = "If you lost the round"
		else if (conditions.handSize !== undefined) conditionsText = `If your hand has ${conditions.handSize} cards`
		else if (conditions.coinFlip !== undefined) conditionsText = `Flip a coin. If it lands on ${conditions.coinFlip}`
		else if (conditions.player !== undefined && conditions.player !== undefined) {
			let playerPossesive = conditions.player ? "your" : "your opponent's"
			let player = conditions.player ? "you" : "your opponent"

			switch (conditions.playerAction) {
				case "draw":
					conditionsText = `If ${player} drew ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"}`
					break;
				case "sacrifice":
					conditionsText = `If ${conditions.specificCardForAction !== undefined ? "one of" : ""} ${playerPossesive} ${conditions.specificCardForAction !== undefined ? `${formatList(conditions.specificCardForAction, "or")} card` : "cards"} gets sacrificed`
					break;
			}
		}
		else if (conditions.anyone !== undefined) {
			switch (conditions.playerAction) {
				case "draw":
					conditionsText = `If someone drew ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"}`
					break;
				case "sacrifice":
					conditionsText = `If ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"} sacrificed`
					break;
			}
		}
		else if (conditions.inputCard !== undefined) {
			let categoryList: Array<string> = []
			let categoryName = ""

			if (conditions.category !== undefined) {
				categoryList = conditions.category
				categoryName = "category"
			} else if (conditions.subcategory !== undefined) {
				categoryList = conditions.subcategory
				categoryName = "subcategory"
			}

			conditionsText = `If the input card is part of the ${formatList(categoryList, "or")} ${categoryName}`;
		}
	}

	// Action parser 1
	if (action) {
		switch (action.from) {
			case "choose": 
				targetList.push("Choose one of") 
				break
			case "force": 
				targetList.push("Force your opponent to choose")
				break
		}
	}

	// Target parser
	if (target) {
		if (target.allCards !== undefined) targetList.push("all of")

		if (target.player !== undefined) targetList.push(target.player ? "your" : (action?.from === "force" ? "their" : "your opponent's"))
		else if (target.everyone !== undefined) targetList.push("all")

		if (target.specificCards !== undefined) targetList.push(formatList(target.specificCards, "and"))
		else if (target.category !== undefined) targetList.push(formatList(target.category, "and"))
		else if (target.subcategory !== undefined) targetList.push(formatList(target.subcategory, "and"))

		if (target.thisCard !== undefined) targetList.push("this card")
		else if (target.inputCard !== undefined) targetList.push("the input card")
		else if ((target.specificCards !== undefined && target.specificCards.length === 1) || target.thisCard !== undefined) targetList.push("card")
		else targetList.push("cards")

		if (target.hand !== undefined) targetList.push("in hand")
		else if (target.anywhere !== undefined) targetList.push(", wherever it is,")
	}

	// Action parser 2
	if (action) {
		switch (action.action) {
			case "imitate": 
				targetList.push("to imitate a move from")
				break
			case "sacrifice": 
				targetList.push("to sacrifice")
				break
		}
	}

	// Effect parser
	if (effects) {
		if (effects.powerChange !== undefined) {
			if (effects.powerChange > 0) effectsList.push(`gains ${effects.powerChange} power`)
			else if (effects.powerChange < 0) effectsList.push(`loses ${Math.abs(effects.powerChange)} power`)
		}

		if (effects.permanent !== undefined) effectsList.push("permanently")
		else if (effects.forMoves !== undefined && effects.forMoves === 1) effectsList.push(`for this turn`)
		else if (effects.forMoves !== undefined) effectsList.push(`for ${effects.forMoves} turns`)

		if (effects.sacrifice !== undefined && effects.noRevive !== undefined) effectsList.push("will get sacrificed and can't be revived")
		else if (effects.sacrifice !== undefined) effectsList.push("will get sacrificed")

		if (effects.discardNumber !== undefined && effects.discardAndReplace !== undefined) effectsList.push(`discard and replace ${effects.discardNumber} cards from your hand`)
		else if (effects.discardNumber !== undefined) effectsList.push(`discard ${effects.discardNumber} cards from your hand`)
	}

	if (restriction) {
		let restrictionTarget, restrictionUntilWhen = "";

		switch (restriction.target) {
			case "abilities":
				restrictionTarget = "abilities"
				break;
		}

		switch (restriction.untilWhen) {
			case "returned":
				restrictionUntilWhen = "returned"
				break;
			case "round":
				restrictionUntilWhen = "the end of the round"
				break;
			case "turn":
				restrictionUntilWhen = "the end of the turn"
				break;
		}

		restrictionsText = `This card's ${restrictionTarget} can be used once until ${restrictionUntilWhen}`
	}

	return formatText(`${restrictionsText}${conditionsText ?? ""}${conditions ? ", " : ""}${targetList.join(" ")}${effectsList.length !== 0 ? " " : ""}${effectsList.join(" ")}.`);
}