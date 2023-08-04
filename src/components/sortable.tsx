import type { ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable"; import React from 'react';

type Props = {
	id: string
	children?: ReactNode
    className?: string
}

export default function Sortable({ id, children, className="" }: Props) {
	const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });

    const style = {
        transform: transform !== null ? `translate3d(${transform?.x}px, ${transform?.y}px, 0) scaleX(1) scaleY(1)` : "",
        transition: transition || undefined,
        zIndex: transform !== null ? 100 : ""
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={className}
        >
			{children}
		</div>
    );
}
