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

export default function Home() {
	const [isDragging, setIsDragging] = useState(false);
	const [dropData, setDropData] = useState<object>({});
	const [activeId, setActiveId] = useState(null);
	const [cardsData, setCardsData] = useState<object>({});
	const [tp, setTp] = useState<number>(0);
	const [reload, setReload] = useState(true);
	const [items, setItems] = useState<string[]>([]);

	
	useEffect(() => {
		console.log("Initial dropData:", dropData);
	}, []);	  
	useEffect(() => console.log(dropData), [dropData]);

	const handleDragStart = useCallback((event: any) => {
		const { active } = event;

		setIsDragging(true)
		setActiveId(active.id);
	}, [isDragging, activeId])

	const handleDragEndDrop = useCallback((event: any) => {
		const { active, over } = event;

		const card = active.id;
		const cardData = cards[card]

		console.log(dropData)

		if (!(over.id in dropData)) {
			setTp(tp + cardData.power)
		} else {
			console.log(cardsData)
			const replaceCard: TCard = cardsData[over.id as keyof unknown]

			console.log(replaceCard)

			setTp(tp - replaceCard.power + cardData.power)
		}

		const newData = {
			...dropData,
			[over.id]: <Card
				name={card}
				{...cards[card]}
			/>
		}
		console.log(newData)

		setDropData(newData)
		setCardsData({
			...cardsData,
			[over.id]: {
				...cards[card],
				name: card
			}
		})
	}, [dropData, cardsData]);

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

				<div>Total power: {tp}</div>

				<div className="grid gap-2 grid-cols-4 w-fit">
					<SortableContext items={items} strategy={rectSortingStrategy}>
						{items.map((id) => (
							<Sortable id={id} key={id} className={`shadow-xl ${id === activeId ? "opacity-50": ""}`}>
								<Card
									{...cards[id]}
									name={id}
								/>
							</Sortable>
						))}
					</SortableContext>
				</div>
				<DragOverlay>
					{activeId ? <Card {...cards[activeId]} name={activeId} /> : null}
				</DragOverlay>
			</DndContext>
		</>
	)
}
