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
		playerAction?: "draw" | "sacrifice" | "lock" | "play"
		specificCardForAction?: string[]
		inputCard?: true
		category?: string[] // will change later
		subcategory?: string[] // will change later
		numberOfCards?: number
		currentPhase?: "card playing" | "attacking" | "defending"
	},
	target?: {
		player?: boolean // (player === true) => player & (player === false) => opponent
		everyone?: true
		specificCards?: string[]
		specificTrait?: "locked" | "burning"
		category?: string[] // will change later
		subcategory?: string[] // will change later
		hand?: true
		anywhere?: true
		thisCard?: true
		inputCard?: true
		allCards?: true
		oneCard?: true
		inputCardTrait?: "subcategory" | "rarity"
		resources?: true
	},
	action?: {
		from: "choose" | "force"
		action: "imitate" | "sacrifice" | "lock"
		forMoves?: number
		untilRoundEnds?: true
	}
	effects?: {
		powerChange?: number
		amplify?: number
		augment?: number
		permanent?: true
		forMoves?: number
		untilReturned?: true
		sacrifice?: true
		discardNumber?: number | "all"
		discardAndReplace?: true
		noRevive?: true
		lock?: true
		burn?: true
		convertedTo?: string
		burnDegree?: number
		gainEnergy?: number
		untilDestroyed?: true
		untilRoundEnds?: true
	}
	restriction?: {
		target?: "abilities"
		untilWhen?: "turn" | "round" | "returned"
		sacrificeAfterMoves?: number
	}
}

function formatList(list: Array<string>, conjunction: string) {
	if (list.length === 0) {
		return "";
	} else if (list.length === 1) {
		return list[0];
	} else if (list.length === 2) {
		return list.join(` ${conjunction} `);
	} else {
		return list.slice(0, -1).join(", ") + `, ${conjunction} ` + list.slice(-1);
	}
}

function formatText(input: string): string {
	const sentences = input.split(". ");
	const formattedSentences = sentences.map((sentence) => {
		const trimmedSentence = sentence.trim();
		if (trimmedSentence) {
			const firstChar = trimmedSentence.charAt(0).toUpperCase();
			const restOfSentence = trimmedSentence.slice(1);
			return firstChar + restOfSentence;
		}
		return "";
	});

	return formattedSentences.join(". ").replace(/ ,/g, ",").replace(/\s+/g, " ");
}


export default function moveContentParser(moveContent: MoveContent) {
	// Note to self: Move descriptions follow order "If {conditions}, {target} {effects}"
	const { conditions, target, action, effects, restriction } = moveContent;
	let conditionsText, restrictionsText = "";
	const targetList: Array<string> = [];
	const effectsList: Array<string> = [];

	// Conditions parser
	if (conditions !== undefined) {
		if (conditions.winning !== undefined) conditionsText = "If you're winning";
		else if (conditions.wonRound !== undefined) conditionsText = "If you won the round";
		else if (conditions.losing !== undefined) conditionsText = "If you're losing";
		else if (conditions.lostRound !== undefined) conditionsText = "If you lost the round";
		else if (conditions.handSize !== undefined) conditionsText = `If your hand has ${conditions.handSize} cards`;
		else if (conditions.currentPhase !== undefined) conditionsText = `If the current phase is the ${conditions.currentPhase} phase`;
		else if (conditions.coinFlip !== undefined) conditionsText = `Flip a coin. If it lands on ${conditions.coinFlip}`;
		else if (conditions.player !== undefined && conditions.playerAction !== undefined) {
			const playerPossesive = conditions.player ? "your" : "your opponent's";
			const player = conditions.player ? "you" : "your opponent";

			switch (conditions.playerAction) {
				case "draw":
					conditionsText = `If ${player} drew ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"}`;
					break;
				case "sacrifice":
					conditionsText = `If ${conditions.specificCardForAction !== undefined ? "one of" : ""} ${playerPossesive} ${conditions.specificCardForAction !== undefined ? `${formatList(conditions.specificCardForAction, "or")} card` : "cards"} gets sacrificed`;
					break;
				case "play":
					conditionsText = `If ${player} ${conditions.player ? "play" : "plays"} ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"}`;
					break;
			}
		}
		else if (conditions.anyone !== undefined && conditions.playerAction !== undefined) {
			switch (conditions.playerAction) {
				case "draw":
					conditionsText = `If someone drew ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"}`;
					break;
				case "sacrifice":
					conditionsText = `If ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"} sacrificed`;
					break;
				case "play":
					conditionsText = `If someone plays ${conditions.specificCardForAction !== undefined ? formatList(conditions.specificCardForAction, "or") : "a card"}`;
					break;
			}
		}
		else if (conditions.inputCard !== undefined) {
			let categoryList: Array<string> = [];
			let categoryName = "";

			if (conditions.category !== undefined) {
				categoryList = conditions.category;
				categoryName = "category";
			} else if (conditions.subcategory !== undefined) {
				categoryList = conditions.subcategory;
				categoryName = "subcategory";
			}

			conditionsText = `If the input card is part of the ${formatList(categoryList, "or")} ${categoryName}`;
		}
	}

	// Action parser 1
	if (action) {
		switch (action.from) {
			case "choose": 
				targetList.push("Choose one of"); 
				break;
			case "force": 
				targetList.push("Force your opponent to choose");
				break;
		}
	}

	// Target parser
	if (target) {
		if (target.allCards !== undefined) targetList.push("all of");
		if (target.oneCard !== undefined) targetList.push("one of");

		if (target.player !== undefined) targetList.push(target.player ? "your" : (action?.from === "force" ? "their" : "your opponent's"));
		else if (target.everyone !== undefined) targetList.push("all");

		if (target.specificCards !== undefined) targetList.push(formatList(target.specificCards, "and"));
		else if (target.category !== undefined) targetList.push(formatList(target.category, "and"));
		else if (target.subcategory !== undefined) targetList.push(formatList(target.subcategory, "and"));

		if (target.thisCard !== undefined) targetList.push("this card");
		else if (target.inputCard !== undefined) targetList.push("the input card");
		else if (target.inputCardTrait !== undefined) targetList.push(`cards that are in the same ${target.inputCardTrait} as the input card`);
		else if ((target.specificCards !== undefined && target.specificCards.length === 1) || target.thisCard !== undefined) targetList.push("card");
		else if (target.resources !== undefined) targetList.push("resource cards in play");
		else if (target.specificTrait !== undefined) targetList.push(`${target.specificTrait} cards`);
		else targetList.push("cards");

		if (target.hand !== undefined) targetList.push("in hand");
		else if (target.anywhere !== undefined) targetList.push(", wherever it is,");
	}

	// Action parser 2
	if (action) {
		switch (action.action) {
			case "imitate": 
				targetList.push("to imitate a move from");
				break;
			case "sacrifice": 
				targetList.push("to sacrifice");
				break;
			case "lock":
				if (action.forMoves !== undefined) targetList.push(`to lock for ${action.forMoves} moves`);
				else if (action.untilRoundEnds !== undefined) targetList.push("to lock until round ends");
		}
	}

	// Effect parser
	if (effects) {
		if (effects.powerChange !== undefined) {
			if (effects.powerChange > 0) effectsList.push(`gains ${effects.powerChange} power`);
			else if (effects.powerChange < 0) effectsList.push(`loses ${Math.abs(effects.powerChange)} power`);
		} 
		else if (effects.amplify !== undefined) effectsList.push(`is amplified by ${effects.amplify} power`);
		else if (effects.augment !== undefined) effectsList.push(`is augmented by ${effects.augment} energy`);

		if (effects.lock !== undefined) effectsList.push("will get locked");
		else if (effects.burn !== undefined && effects.burnDegree !== undefined) effectsList.push(`will burn (${effects.burnDegree}x)`);
		else if (effects.burn !== undefined) effectsList.push("will burn");
		else if (effects.convertedTo !== undefined) effectsList.push(`will be converted to ${effects.convertedTo}`);

		if (effects.permanent !== undefined) effectsList.push("permanently");
		else if (effects.forMoves !== undefined && effects.forMoves === 1) effectsList.push("for this turn");
		else if (effects.forMoves !== undefined) effectsList.push(`for ${effects.forMoves} turns`);
		else if (effects.untilReturned !== undefined) effectsList.push("until returned");
		else if (effects.untilDestroyed !== undefined) effectsList.push("until this card is destroyed");
		else if (effects.untilRoundEnds !== undefined) effectsList.push("until the round ends");

		if (effects.sacrifice !== undefined && effects.noRevive !== undefined) effectsList.push("will get sacrificed and can't be revived");
		else if (effects.sacrifice !== undefined) effectsList.push("will get sacrificed");

		if (effects.discardNumber !== undefined && effects.discardAndReplace !== undefined) effectsList.push(`discard and replace ${effects.discardNumber} cards from your hand`);
		else if (effects.discardNumber !== undefined) effectsList.push(`discard ${effects.discardNumber} cards from your hand`);

		else if (effects.gainEnergy !== undefined) effectsList.push(`gain ${effects.gainEnergy} energy`);
	}

	if (restriction) {
		let restrictionTarget, restrictionUntilWhen = "";

		if (restriction.target !== undefined && restriction.untilWhen !== undefined) {
			switch (restriction.target) {
				case "abilities":
					restrictionTarget = "abilities";
					break;
			}

			switch (restriction.untilWhen) {
				case "returned":
					restrictionUntilWhen = "returned";
					break;
				case "round":
					restrictionUntilWhen = "the end of the round";
					break;
				case "turn":
					restrictionUntilWhen = "the end of the turn";
					break;
			}

			restrictionsText = `This card's ${restrictionTarget} can be used once until ${restrictionUntilWhen}`;
		} else if (restriction.sacrificeAfterMoves) {
			restrictionsText = `This card will be sacrificed and can't be revived after ${restriction.sacrificeAfterMoves} moves`;
		}
	}

	return formatText(`${restrictionsText}${conditionsText ?? ""}${conditions ? ", " : ""}${targetList.join(" ")}${effectsList.length !== 0 ? " " : ""}${effectsList.join(" ")}.`);
}