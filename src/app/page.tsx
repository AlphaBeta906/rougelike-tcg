"use client";

import type { ReactNode } from "react";
import type { TCard } from "@/data/cardTypes";

import { useEffect, useState, useCallback } from "react";
import {
	DndContext, 
	rectIntersection, 
	DragOverlay,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { cards } from "@/data/cards";
import Card from "@/components/card";
import Droppable from "@/components/dropable";
import Sortable from "@/components/sortable";
import range from "@/lib/range";
import shuffleDictionary from "@/lib/shuffleDictionary";
import CardReduced from "@/components/cardReduced";
import { getCategory } from "@/data/categories";

export default function Home() {
	const [isDragging, setIsDragging] = useState(false);
	const [dropData, setDropData] = useState<object>({});
	const [activeId, setActiveId] = useState(null);
	const [cardsData, setCardsData] = useState<{ [key: string]: TCard }>({});
	const [tp, setTp] = useState<{
		[key: string]: {
			name: string, basePower: number, additionalPower: Array<
				{ power: number, from: string, to: string }
			>,
			amplifier: Array<
				{ power: number, from: string, to: string }
			>
		}
	}>({});
	const [top, setTop] = useState<number>();
	const [adp, setAdp] = useState<number>();
	const [reload, setReload] = useState(true);
	const [holder, setHolder] = useState(true);
	const [items, setItems] = useState<string[]>([]);

	useEffect(() => console.log("Tp update:", tp), [tp]);
	useEffect(() => console.log("cardsData update:", cardsData), [cardsData]);
	useEffect(() => console.log("holder update:", holder), [holder]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragStart = useCallback((event: any) => {
		const { active } = event;

		setIsDragging(true);
		setActiveId(active.id);
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragEndDrop = useCallback((event: any) => {
		const { active, over } = event;

		const card = active.id;
		const cardData = cards[card];

		let newTp = tp;
		newTp[over.id] = {
			name: card,
			basePower: cardData.power,
			additionalPower: [],
			amplifier: []
		};
		console.log(newTp);
		setTp(newTp);

		if (over.id.startsWith("operator-holder-") && !(Object.keys(cards).filter(x => cards[x].type === "operator").includes(active.id ?? ""))) {
			return;
		}

		setDropData({
			...dropData,
			[over.id]: ((Object.keys(cards).filter(x => cards[x].type === "operator").includes(active.id ?? "") && over.id.startsWith("operator-holder-")) ? <CardReduced
				name={card}
				{...cards[card]}
			/> : <Card
				name={card}
				{...cards[card]}
			/>)
		});

		const newCardsData: { [key: string]: TCard } = { ...cardsData };
		newCardsData[over.id] = {
			...cards[card],
			name: card
		};
		setCardsData(newCardsData);

		newTp = {};
		Object.keys(tp).forEach((key) => {
			newTp[key] = {
				...tp[key],
				additionalPower: [],
				amplifier: [],
			};
		});

		const allMoves = Object.values(tp).map(x => {
			return { moves: cards[x.name].moves, from: x.name };
		});

		allMoves.sort((a, b) => {
			const a2 = Object.keys(tp).find((val) => tp[val].name === a.from) ?? "";
			const b2 = Object.keys(tp).find((val) => tp[val].name === b.from) ?? "";

			const aIndex = parseInt(a2.split("-")[2]);
			const bIndex = parseInt(b2.split("-")[2]);
			if (aIndex < bIndex) {
				return -1;
			} else if (aIndex > bIndex) {
				return 1;
			} else {
				if (a2.startsWith("operator-holder-")) {
					return -1;
				} else {
					return 1;
				}
			}
		});

		const takenList: string[] = [];

		allMoves.forEach(movesOrg => {
			const { moves, from } = movesOrg;
			const holder = Object.keys(tp).find((val) => tp[val].name === from && !(takenList.includes(val))) ?? "";
			takenList.push(holder);

			for (const move of moves) {
				if (!move?.moveContent) {
					continue;
				}

				const moveData = move.moveContent;

				const { conditions, target, effects } = moveData;

				if (target?.specificCards !== undefined && effects?.powerChange !== undefined) {
					const specificCards = target.specificCards;
					const cardNames = Object.values(tp).map((x) => x.name);
					const intersection = specificCards.filter((x) => cardNames.includes(x));

					console.log(intersection);

					for (const card of Object.values(tp)) {
						const { name } = card;

						if (intersection.includes(name)) {
							const key = Object.keys(newTp).find((key) => newTp[key].name === name);

							if (!key) {
								return;
							}

							const amplifierPower = newTp[holder].amplifier.reduce((acc, { power }) => acc + power, 0);

							newTp[key].additionalPower = [...newTp[key].additionalPower, {
								power: effects.powerChange + (effects.powerChange > 0 ? Math.abs(amplifierPower) : -Math.abs(amplifierPower)),
								from: from,
								to: name
							}];
						}
					}
				} else if (target?.subcategory !== undefined && effects?.powerChange !== undefined) {
					const intersection = Object.values(tp).map(x => x.name).filter(x => target.subcategory?.some(elem => cards[x].category.split(" × ").includes(elem)));

					for (const card of Object.values(tp)) {
						const { name } = card;

						if (intersection.includes(name)) {
							const key = Object.keys(newTp).find((key) => newTp[key].name === name);

							if (!key) {
								return;
							}

							const amplifierPower = newTp[holder].amplifier.reduce((acc, { power }) => acc + power, 0);

							newTp[key].additionalPower = [...newTp[key].additionalPower, {
								power: effects.powerChange + (effects.powerChange > 0 ? Math.abs(amplifierPower) : -Math.abs(amplifierPower)),
								from: from,
								to: name
							}];
						}
					}
				} else if (target?.category !== undefined && effects?.powerChange !== undefined) {
					const intersection = Object.values(tp).map(x => x.name).filter(x => target.category?.some(elem => {
						console.log(getCategory(cards[x].category));
						return getCategory(cards[x].category).includes(elem);
					}));

					for (const card of Object.values(tp)) {
						const { name } = card;

						if (intersection.includes(name)) {
							const key = Object.keys(newTp).find((key) => newTp[key].name === name);

							if (!key) {
								return;
							}

							const amplifierPower = newTp[holder].amplifier.reduce((acc, { power }) => acc + power, 0);

							newTp[key].additionalPower = [...newTp[key].additionalPower, {
								power: effects.powerChange + (effects.powerChange > 0 ? Math.abs(amplifierPower) : -Math.abs(amplifierPower)),
								from: from,
								to: name
							}];
						}
					}
				} else if (conditions?.subcategory !== undefined && conditions?.inputCard !== undefined && effects?.powerChange !== undefined) {
					if (holder.startsWith("card-holder-")) {
						return;
					}

					const intersection = Object.values(tp).map(x => x.name).filter(x => conditions.subcategory?.some(elem => cards[x].category.split(" × ").includes(elem)));
					const key = holder?.replace("operator-holder-", "card-holder-");

					if (tp[key] !== undefined) {
						if (intersection.includes(tp[key].name)) {
							const amplifierPower = newTp[holder].amplifier.reduce((acc, { power }) => acc + power, 0);

							newTp[key].additionalPower = [...newTp[key].additionalPower, {
								power: effects.powerChange + (effects.powerChange > 0 ? Math.abs(amplifierPower) : -Math.abs(amplifierPower)),
								from: from,
								to: tp[key].name
							}];
						}
					}
				} else if (target?.inputCard !== undefined && effects?.amplify !== undefined) {
					if (holder.startsWith("card-holder-")) {
						return;
					}

					const key = holder?.replace("operator-holder-", "card-holder-");

					if (tp[key] !== undefined) {
						newTp[key].amplifier = [...newTp[key].amplifier, {
							power: effects.amplify,
							from: from,
							to: tp[key].name
						}];
					}
				} else if (target?.inputCardTrait !== undefined && effects?.powerChange !== undefined) {
					if (holder.startsWith("card-holder-")) {
						return;
					}

					const key = holder?.replace("operator-holder-", "card-holder-");

					if (tp[key] !== undefined && cardsData[key] !== undefined) {
						const cardCategories = cardsData[key].category.split(" × ");

						const intersection = Object.values(tp).map(x => x.name).filter(x => cardCategories.some(elem => cards[x].category.split(" × ").includes(elem)));

						for (const card of Object.values(tp)) {
							const { name } = card;

							if (intersection.includes(name)) {
								const key2 = Object.keys(newTp).find((key) => newTp[key].name === name);

								if (!key2) {
									return;
								}

								const amplifierPower = newTp[holder].amplifier.reduce((acc, { power }) => acc + power, 0);

								newTp[key2].additionalPower = [...newTp[key2].additionalPower, {
									power: effects.powerChange + (effects.powerChange > 0 ? Math.abs(amplifierPower) : -Math.abs(amplifierPower)),
									from: from,
									to: name
								}];
							}
						}
					}
				} else if (target?.inputCard !== undefined && effects?.powerChange !== undefined) {
					if (holder.startsWith("card-holder-")) {
						return;
					}

					const key = holder?.replace("operator-holder-", "card-holder-");

					if (tp[key] !== undefined) {
						newTp[key].additionalPower = [...newTp[key].additionalPower, {
							power: effects.powerChange,
							from: from,
							to: tp[key].name
						}];
					}
				}
			}
		});
		console.log("end!");
		setTp(newTp);
	}, [tp, dropData, cardsData]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragEndSortable = useCallback((event: any) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over!.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragEnd = useCallback((event: any) => {
		const { over } = event;

		if (over === null) {
			setIsDragging(false);
			setActiveId(null);
			return;
		}

		if (over.id.startsWith("card-holder-") || over.id.startsWith("operator-holder-")) {
			handleDragEndDrop(event);
		} else {
			handleDragEndSortable(event);
		}

		setIsDragging(false);
		setActiveId(null);
	}, [handleDragEndDrop, handleDragEndSortable]);

	const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setReload(true);
	};

	const buttonHolderHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const newHolder = (holder === true ? false : true);
		setHolder(newHolder);
	};

	useEffect(() => {
		if (reload) {
			const newCardItems = Object.keys(shuffleDictionary(cards));

			setItems(newCardItems);
			setReload(false);
		}
	}, [reload]);

	useEffect(() => {
		setTop(Object.values(tp).reduce((acc, { basePower, additionalPower }) => acc + basePower + additionalPower.map(x => x.power).reduce((acc, value) => acc + value, 0), 0));
		setAdp(Object.values(tp).reduce((acc, { additionalPower }) => acc + additionalPower.map(x => x.power).reduce((acc, value) => acc + value, 0), 0));
	}, [tp]);

	const mouseSensor = useSensor(MouseSensor);
	const touchSensor = useSensor(TouchSensor);

	const sensors = useSensors(
		mouseSensor,
		touchSensor,
	);

	return (
		<>
			<DndContext
				onDragStart={handleDragStart}
				onDragCancel={() => {
					setIsDragging(false);
					setActiveId(null);
				}}
				onDragEnd={handleDragEnd}
				collisionDetection={rectIntersection}
				sensors={sensors}
			>
				<div className="flex gap-2">
					<button onClick={buttonHandler} className="rounded-xl p-2 bg-red-500 hover:bg-red-600 active:bg-red-800 transition-all delay-100 text-white font-semibold">Reload</button>
					<button onClick={buttonHolderHandler} className={`rounded-xl p-2 ${holder ? "bg-red-500 hover:bg-red-600 active:bg-red-800" : "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-800"} transition-all delay-100 text-white font-semibold`}>{holder ? "Main Holder" : "Operator Holder"}</button>
				</div>

				<div className="flex justify-center">
					{range(1, 3).map((id) => {
						return (
							<div key={id}>
								<Droppable id={`operator-holder-${id}`} disabled={!holder ? Object.keys(cards).filter(x => cards[x].type !== "operator").includes(activeId ?? "") : false}>
									<div className={`w-[18.5rem] h-fit border-4 ${isDragging && !holder ? (Object.keys(cards).filter(x => cards[x].type !== "operator").includes(activeId ?? "") ? "border-red-400" : "border-green-400") : ""} rounded-lg m-5`}>
										<div className="mx-3 my-3">{(`operator-holder-${id}`) in dropData ? dropData[`operator-holder-${id}` as keyof unknown] : <div className="w-[16.5rem] h-[5.075rem]" /> as ReactNode}</div>
									</div>
								</Droppable>
								<Droppable id={`card-holder-${id}`} disabled={!(holder)}>
									<div className={`w-[18.5rem] h-[29rem] border-4 ${isDragging && holder ? "border-green-400" : ""} rounded-lg m-5`}>
										<div className="mx-3 my-3">{(`card-holder-${id}`) in dropData ? dropData[`card-holder-${id}` as keyof unknown] : <div className="w-[16.5rem] h-[27rem]" /> as ReactNode}</div>
									</div>
								</Droppable>
							</div>
						);
					})}
				</div>

				<div>Total power: {top}</div>
				<div>Additional power: {adp}</div>
				<ul className="list-inside">
					{Object.values(tp).map(x => x.amplifier).flat().map(({ power, from, to }, index) => {
						return (
							<li key={index} className={"font-semibold text-violet-500"}>
								× {from} amplifies {to} by {power} power
							</li>
						);
					})}
					{Object.values(tp).map(x => x.additionalPower).flat().map(({ power, from, to }, index) => {
						return (
							<li key={index} className={`font-semibold ${power > 0 ? "text-emerald-500" : "text-red-500"}`}>
								{power > 0 ? "+" : "-"} {to} {power > 0 ? "gains" : "loses"} {power} power from {from}
							</li>
						);
					})}
				</ul>

				<div className="grid gap-2 grid-cols-5 w-fit">
					<SortableContext items={items} strategy={rectSortingStrategy}>
						{items.map((id, index) => (
							<Sortable id={id} key={id} className={`shadow-xl ${id === activeId ? "opacity-0" : ""}`} style={{ zValue: ((index % 5) + 1) * 10}}>
								<Card
									{...cards[id]}
									name={id}
								/>
							</Sortable>
						))}
					</SortableContext>
				</div>
				<DragOverlay className="shadow-xl">
					{activeId ? <Card {...cards[activeId]} name={activeId} /> : null}
				</DragOverlay>
			</DndContext>
		</>
	);
}