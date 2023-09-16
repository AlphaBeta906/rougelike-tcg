import type { ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable";

type Props = {
	id: string
	children?: ReactNode
    className?: string
    style?: { zValue: number }
}

export default function Sortable({ id, children, className="", style={ zValue: 0 } }: Props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({ id: id });

	const styleNew = {
		transform: transform !== null ? `translate3d(${transform?.x}px, ${transform?.y}px, 0) scaleX(1) scaleY(1)` : "",
		transition: transition || undefined,
		zIndex: transform !== null ? 100 : style.zValue
	};

	return (
		<div
			ref={setNodeRef}
			style={styleNew}
			{...attributes}
			{...listeners}
			className={className}
		>
			{children}
		</div>
	);
}
