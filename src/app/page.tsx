'use client'

import type { ReactNode } from "react";
import type { TCard } from "@/data/cardTypes";

import { useEffect, useState, useCallback } from "react";
import { DndContext, rectIntersection, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import { cards } from "@/data/cards";
import Card from "@/components/card";
import Droppable from "@/components/dropable";
import Sortable from "@/components/sortable";
import range from "@/lib/range";
import shuffleDictionary from "@/lib/shuffleDictionary";
import CardReduced from "@/components/cardReduced";

export default function Home() {
	const [isDragging, setIsDragging] = useState(false);
	const [dropData, setDropData] = useState<object>({});
	const [activeId, setActiveId] = useState(null);
	const [cardsData, setCardsData] = useState<{ [key: string]: TCard }>({});
	const [tp, setTp] = useState<{ 
		[key: string]: { name: string, basePower: number, additionalPower: Array<
			{ power: number, from: string, to: string }
		> } 
	}>({});
	const [top, setTop] = useState<number>();
	const [adp, setAdp] = useState<number>();
	const [reload, setReload] = useState(true);
	const [items, setItems] = useState<string[]>([]);

	useEffect(() => {
		console.log("Initial tp:", tp);
	}, []);
	useEffect(() => console.log("Tp update:", tp), [tp]);

	useEffect(() => {
		console.log("Initial cardsData:", cardsData);
	}, []);
	useEffect(() => console.log("cardsData update:", cardsData), [cardsData]);

	const handleDragStart = useCallback((event: any) => {
		const { active } = event;

		setIsDragging(true)
		setActiveId(active.id);
	}, [isDragging, activeId])

	const handleDragEndDrop = useCallback((event: any) => {
		const { active, over } = event;

		if (Object.keys(cards).filter(x => cards[x].type !== "operator").includes(active.id ?? "") && over.id.startsWith("operator-holder-")) {
			return;
		}

		if (Object.keys(cards).filter(x => cards[x].type === "operator").includes(active.id ?? "") && over.id.startsWith("card-holder-")) {
			return;
		}

		const card = active.id;
		const cardData = cards[card]

		let newTp = tp;
		newTp[over.id] = {
			name: card,
			basePower: cardData.power,
			additionalPower: []
		}
		console.log(newTp)
		setTp(newTp)

		setDropData({
			...dropData,
			[over.id]: ((Object.keys(cards).filter(x => cards[x].type === "operator").includes(active.id ?? "") && over.id.startsWith("operator-holder-")) ? <CardReduced
				name={card}
				{...cards[card]}
			/> : <Card
				name={card}
				{...cards[card]}
			/> )
		})
		
		let newCardsData: { [key: string]: TCard } = { ...cardsData }
		newCardsData[over.id] = {
			...cards[card],
			name: card
		}
		setCardsData(newCardsData)

		newTp = {};
		Object.keys(tp).forEach((key) => {
			newTp[key] = {
				...tp[key],
				additionalPower: [],
			};
		});

		const allMoves = Object.values(tp).map(x => {
			return {moves: cards[x.name].moves, from: x.name}
		})

		allMoves.forEach(movesOrg => {
			const { moves, from } = movesOrg
			const holder = Object.keys(tp).find((val) => tp[val].name === from) ?? "";

			for (const move of moves) {
				console.log(move)
				if (!move?.moveContent) {
					continue;
				}

				const moveData = move.moveContent

				const { conditions, target, effects } = moveData;

				if (target?.specificCards !== undefined && effects?.powerChange !== undefined) {
					const specificCards = target.specificCards;
					const cardNames = Object.values(tp).map((x) => x.name);
					const intersection = specificCards.filter((x) => cardNames.includes(x));

					console.log(intersection)

					for (const card of Object.values(tp)) {
						const { name } = card;

						if (intersection.includes(name)) {
							const key = Object.keys(newTp).find((key) => newTp[key].name === name);

							console.log(key)

							if (!key) {
								return;
							}

							newTp[key].additionalPower = [...newTp[key].additionalPower, {
								power: effects.powerChange,
								from: from,
								to: name
							}];
						}
					}
				} else if (target?.subcategory !== undefined && effects?.powerChange !== undefined) {
					const intersection = Object.values(tp).map(x => x.name).filter(x => target.subcategory?.some(elem => cards[x].category.split(" × ").includes(elem)))

					for (const card of Object.values(tp)) {
						const { name } = card;

						if (intersection.includes(name)) {
							const key = Object.keys(newTp).find((key) => newTp[key].name === name);

							console.log(key)

							if (!key) {
								return;
							}

							newTp[key].additionalPower = [...newTp[key].additionalPower, {
								power: effects.powerChange,
								from: from,
								to: name
							}];
						}
					}
				} else if (conditions?.subcategory !== undefined && conditions?.inputCard !== undefined && effects?.powerChange !== undefined) {
					const intersection = Object.values(tp).map(x => x.name).filter(x => conditions.subcategory?.some(elem => cards[x].category.split(" × ").includes(elem)))
					const key = holder?.replace("operator-holder-", "card-holder-")

					if (tp[key] !== undefined) {
						console.log(intersection)
						if (intersection.includes(tp[key].name)) {
							newTp[key].additionalPower = [...newTp[key].additionalPower, {
								power: effects.powerChange,
								from: from,
								to: tp[key].name
							}];
						}
					}
				}
			} 
		})
		console.log("end!")
		setTp(newTp)
	}, [tp, dropData, cardsData, adp, top]);

	const handleDragEndSortable = useCallback((event: any) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over!.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}, [dropData, cardsData]);

	const handleDragEnd = useCallback((event: any) => {
		const { over } = event;

		if (over === null) {
			setIsDragging(false)
			setActiveId(null)
			return;
		}

		if (over.id.startsWith("card-holder-") || over.id.startsWith("operator-holder-")) {
			handleDragEndDrop(event)
		} else {
			handleDragEndSortable(event)
		}

		setIsDragging(false)
		setActiveId(null)
	}, [dropData, cardsData]);

	const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setReload(true)
	};

	useEffect(() => {
		if (reload) {
			const newCardItems = Object.keys(shuffleDictionary(cards))

			setItems(newCardItems)
			setReload(false)
		}
	}, [reload])

	useEffect(() => {
		setTop(Object.values(tp).reduce((acc, { basePower, additionalPower }) => acc + basePower + additionalPower.map(x => x.power).reduce((acc, value) => acc + value, 0), 0))
		setAdp(Object.values(tp).reduce((acc, { additionalPower }) => acc + additionalPower.map(x => x.power).reduce((acc, value) => acc + value, 0), 0))
	}, [tp])

	return (
		<>
			<DndContext
				onDragStart={handleDragStart}
				onDragCancel={() => {
					setIsDragging(false)
					setActiveId(null);
				}}
				onDragEnd={handleDragEnd}
				collisionDetection={rectIntersection}
			>
				<button onClick={buttonHandler} className="rounded-xl p-2 bg-red-500 hover:bg-red-600 active:bg-red-800 transition-all delay-100 text-white font-semibold">Reload</button>

				<div className="flex justify-center">
					{range(1, 3).map((id) => {
						return (
							<div key={id}>
								<Droppable id={`operator-holder-${id}`} disabled={isDragging ? (Object.keys(cards).filter(x => cards[x].type !== "operator").includes(activeId ?? "")) : false}>
									<div className={`w-[20rem] h-fit border-4 ${isDragging ? (Object.keys(cards).filter(x => cards[x].type !== "operator").includes(activeId ?? "") ? "border-red-400" : "border-green-400") : ""} rounded-lg m-5`}>
										<div className="mx-3 my-3">{(`operator-holder-${id}`) in dropData ? dropData[`operator-holder-${id}` as keyof unknown] : <div className="w-[18rem] h-[5.075rem]" /> as ReactNode}</div>
									</div>
								</Droppable>
								<Droppable id={`card-holder-${id}`} disabled={isDragging ? (Object.keys(cards).filter(x => cards[x].type === "operator").includes(activeId ?? "")) : false}>
									<div className={`w-[20rem] h-[32rem] border-4 ${isDragging ? (Object.keys(cards).filter(x => cards[x].type === "operator").includes(activeId ?? "") ? "border-red-400" : "border-green-400") : ""} : ""} rounded-lg m-5`}>
										<div className="mx-3 my-3">{(`card-holder-${id}`) in dropData ? dropData[`card-holder-${id}` as keyof unknown] : <div className="w-[18rem] h-[30rem]" /> as ReactNode}</div>
									</div>
								</Droppable>
							</div>
						)
					})}
				</div>

				<div>Total power: {top}</div>
				<div>Additional power: {adp}</div>
				<ul className="list-inside">
					{Object.values(tp).map(x => x.additionalPower).flat().map(({power, from, to}, index) => {
						return (
							<li key={index} className={`font-semibold ${power > 0 ? "text-emerald-500" : "text-red-500" }`}>
								{power > 0 ? "+" : "-"} {to} {power > 0 ? "gains" : "loses"} {power} power from {from}
							</li>
						)
					})}
				</ul>

				<div className="grid gap-2 grid-cols-4 w-fit">
					<SortableContext items={items} strategy={rectSortingStrategy}>
						{items.map((id) => (
							<Sortable id={id} key={id} className={`shadow-xl ${id === activeId ? "opacity-0" : ""}`}>
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
	)
}
