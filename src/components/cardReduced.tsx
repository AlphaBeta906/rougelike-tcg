"use client"

import { TCard } from '@/data/cardTypes';
import { getCategoryColors } from '@/data/categories';

export default function CardReduced({ name, rarity, availability="none", energy, power, category}: TCard) {
	let typeMarker, rarityStyle, rarityName, rarityMarker;
	const color = getCategoryColors(category)

	switch (rarity) {
		case "common":
			rarityStyle = "text-white bg-neutral-400 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] mb-2 border-neutral-500 border-2 font-semibold"
			rarityName = "Common"
			break;
		case "rare":
			rarityStyle = "text-white bg-amber-600 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] border-amber-700 border-2 font-semibold"
			rarityName = "Rare"
			break;
		case "epic":
			rarityStyle = "text-white bg-slate-400 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] border-slate-500 border-2 font-semibold"
			rarityName = "Epic"
			break;
		case "legendary":
			rarityStyle = "text-white bg-yellow-500 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] border-yellow-600 border-2 font-semibold"
			rarityName = "Legendary"
			break;
	}

	switch (availability) {
		case 'none': 
			rarityMarker = <div className={`w-full ${rarityStyle} rounded-lg`}>{rarityName}</div>
			break
		case 'limited': 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-amber-500 flex items-center justify-center text-[0.7rem] border-amber-600 border-2 border-e-0 font-semibold">L</div>
				<div className={`w-[75%] ${rarityStyle} rounded-e-lg border-s-0`}>{rarityName}</div>
			</div>
			break
		case 'restricted': 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-slate-700 flex items-center justify-center text-[0.7rem] border-slate-900 border-2 border-e-0 font-semibold">R</div>
				<div className={`w-[75%] ${rarityStyle} rounded-e-lg border-s-0`}>{rarityName}</div>
			</div>
			break
	}
	
	function colorDefiner(shade: number) {
		if (color.length === 1) {
			return `from-${color}-${shade} to-${color}-${shade}`
		} else {
			return `from-${color[0]}-${shade} to-${color[1]}-${shade}`
		}
	}

	return (
		<div className={`bg-gradient-to-r p-[3px] ${colorDefiner(400)} box-border rounded w-[16.5rem] h-auto`}>
			<div className={`flex flex-col p-2 rounded-sm w-full h-full bg-gradient-to-r ${colorDefiner(100)}`}>
				<div className="text-center text-lg font-extrabold pb-2 block opacity-100">{name}</div>

				<div className="flex gap-2">
					<div className="w-full text-white rounded-lg bg-cyan-500 flex items-center justify-center text-[0.7rem] border-cyan-600 border-2 font-semibold">{energy}</div>

					{rarityMarker}

					<div className="w-full text-white rounded-lg bg-indigo-500 flex items-center justify-center text-[0.7rem] border-indigo-600 border-2 font-semibold">{power}</div>
				</div>
			</div>
		</div>
	)
}