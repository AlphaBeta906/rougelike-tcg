"use client"

import { useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Sortable from '@/components/sortable';
import Card from '@/components/card';
import { cards } from '@/data/cards';

export default function Stack() {
    const [items, setItems] = useState(Array.from({ length: 6 }, (_, i) => (i + 1).toString()));
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragEnd = useCallback((event: any) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over!.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="flex flex-col">
                    {items.map((id) => (
                        <Sortable id={id} key={id} className={`${Number(id) !== 1 ? "-mt-[20rem] w-min" : ""} z-${(Number(id) - 1) * 10}`}>
                            <div className={`${Number(id) !== 1 ? "hover:mt-[5rem]" : ""} transition-all delay-100`}>
                                <Card
                                    {...cards[Object.keys(cards)[Number(id)]]}
                                    name={Object.keys(cards)[Number(id)]}
                                />
                            </div>
                        </Sortable>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};
