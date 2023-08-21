import type { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

type Props = {
	id: string
	disabled?: boolean
	children?: ReactNode
}

export default function Droppable({ id, disabled=false, children }: Props) {
	const { setNodeRef } = useDroppable({
		id: id,
		disabled: disabled
	});
  
	return (
		<div ref={setNodeRef}>
			{children}
		</div>
	);
}