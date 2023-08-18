import type { ReactNode } from "react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

type Props = {
	id: string
	children?: ReactNode
	className?: string
}

export default function Draggable({ id, children, className }: Props) {
	const {attributes, listeners, setNodeRef, transform} = useDraggable({
		id: id,
	});

	const style = transform ? {
		transform: CSS.Transform.toString(transform),
	} : undefined;

	return (
		<button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`touch-none ${className}`}>
			{children}
		</button>
	);
}