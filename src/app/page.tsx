'use client'

import type { ReactNode } from "react";
import type { TCard } from "@/data/cardTypes";
import type { Move } from "@/data/cardTypes";

import { useEffect, useState, useCallback } from "react";
import { DndContext, rectIntersection, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import { cards } from "@/data/cards";
import Card from "@/components/card";
import Droppable from "@/components/dropable";
import Sortable from "@/components/sortable";
import range from "@/lib/range";
import shuffleDictionary from "@/lib/shuffleDictionary";
import moveContentParser from "@/lib/moveContentParser";

export default function Home() {
	const [isDragging, setIsDragging] = useState(false);
	const [dropData, setDropData] = useState<object>({});
	const [activeId, setActiveId] = useState(null);
	const [cardsData, setCardsData] = useState<{ [key: string]: TCard }>({});
	const [tp, setTp] = useState<{ [key: string]: { name: string, basePower: number, additionalPower: number } }>({});
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

		const card = active.id;
		const cardData = cards[card]

		let newTp = tp;
		newTp[over.id] = {
			name: card,
			basePower: cardData.power,
			additionalPower: 0
		}
		console.log(newTp)
		setTp(newTp)

		setDropData({
			...dropData,
			[over.id]: <Card
				name={card}
				{...cards[card]}
			/>
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
				additionalPower: 0,
			};
		});

		const cardReqData = Object.values(tp).map((val) => cards[val.name]);
		const moves = cardReqData.filter(x => x !== null).map(x => x?.moves).flat()

		for (const move of moves) {
			console.log(move)
			if (!move?.moveContent) {
				continue;
			}

			const moveData = move.moveContent

			const { target, effects } = moveData;

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

						const newAdditionalPower =
							(newTp[key].additionalPower ?? 0) + (effects.powerChange ?? 0);

						newTp[key].additionalPower = newAdditionalPower;
					}
				}
			}
		}
		console.log("end!")
		setTp(newTp)
		setTop(Object.values(tp).reduce((acc, { basePower, additionalPower }) => acc + basePower + additionalPower, 0))
		setAdp(Object.values(tp).reduce((acc, { additionalPower }) => acc + additionalPower, 0))
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

		if (over.id.startsWith("card-holder-")) {
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
		setTop(Object.values(tp).reduce((acc, { basePower, additionalPower }) => acc + basePower + additionalPower, 0))
		setAdp(Object.values(tp).reduce((acc, { additionalPower }) => acc + additionalPower, 0))
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
							<Droppable id={`card-holder-${id}`} key={`card-holder-${id}`}>
								<div className={`w-[20rem] h-[32rem] border-4 ${isDragging ? "border-green-400" : ""} rounded-lg m-5`}>
									<div className="mx-3 my-3">{(`card-holder-${id}`) in dropData ? dropData[`card-holder-${id}` as keyof unknown] : <div className="w-[18rem] h-[30rem]" /> as ReactNode}</div>
								</div>
							</Droppable>
						)
					})}
				</div>

				<div>Total power: {top}</div>
				<div>Additional power: {adp}</div>

				<div className="grid gap-2 grid-cols-4 w-fit">
					<SortableContext items={items} strategy={rectSortingStrategy}>
						{items.map((id) => (
							<Sortable id={id} key={id} className={`shadow-xl ${id === activeId ? "opacity-50" : ""}`}>
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
