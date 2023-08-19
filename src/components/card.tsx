"use client"

import { TCard, Move, MoveType } from '@/data/cardTypes';
import getCategory from '@/data/categories';
import moveContentParser from '@/lib/moveContentParser';

export default function Card({ name, image, type, rarity, availability="none", energy, power, moves, category, mini=false, bgCover=false}: TCard) {
	let typeMarker, rarityStyle, rarityName, rarityMarker;
	const color = getCategory(category)

	switch (type) {
		case "combatant":
			typeMarker = <div className="w-full text-white rounded-lg bg-red-700 flex items-center justify-center text-[0.7rem] mb-2 h-[calc(31.5938px-8px)] border-red-800 border-2 font-semibold">Combatant</div>
			break;
		case "resource":
			typeMarker = <div className="w-full text-white rounded-lg bg-amber-500 flex items-center justify-center text-[0.7rem] mb-2 h-[calc(31.5938px-8px)] border-amber-600 border-2 font-semibold">Resource</div>
			break;
		case "trap":
			typeMarker = <div className="w-full text-white rounded-lg bg-teal-500 flex items-center justify-center text-[0.7rem] mb-2 h-[calc(31.5938px-8px)] border-teal-600 border-2 font-semibold">Trap</div>
			break;
		case "effect":
			typeMarker = <div className="w-full text-white rounded-lg bg-violet-500 flex items-center justify-center text-[0.7rem] mb-2 h-[calc(31.5938px-8px)] border-violet-600 border-2 font-semibold">Effect</div>
			break;
		case "tool":
			typeMarker = <div className="w-full text-white rounded-lg bg-slate-500 flex items-center justify-center text-[0.7rem] mb-2 h-[calc(31.5938px-8px)] border-slate-600 border-2 font-semibold">Tool</div>
			break;
	}

	switch (rarity) {
		case "common":
			rarityStyle = "text-white bg-zinc-400 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] mb-2 border-zinc-500 border-2 font-semibold"
			rarityName = "Common"
			break;
		case "rare":
			rarityStyle = "text-white bg-amber-600 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] mb-2 border-amber-700 border-2 font-semibold"
			rarityName = "Rare"
			break;
		case "epic":
			rarityStyle = "text-white bg-slate-400 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] mb-2 border-slate-500 border-2 font-semibold"
			rarityName = "Epic"
			break;
		case "legendary":
			rarityStyle = "text-white bg-yellow-500 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.7rem] mb-2 border-yellow-600 border-2 font-semibold"
			rarityName = "Legendary"
			break;
	}

	let moveTable = []
	let index = 0;

	for (let moveIndex in moves as Move[]) {
		index++

		let move = moves[moveIndex]

		let moveTypeMarker;

		switch (move.type) {
			case "ability":
				if ("price" in move) {
					moveTypeMarker = <div className="w-[4.5rem] flex m-2">
						<div className="w-[30%] text-white rounded-s-lg bg-amber-500 flex items-center justify-center border-amber-600 border-2 border-e-0 font-semibold">{move.price}</div>
						<div className="w-[70%] text-white rounded-e-lg bg-red-500 flex items-center justify-center border-red-600 border-2 border-s-0 font-semibold">Ability</div>
					</div>
				}
				break;
			case "start":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-orange-500 flex items-center justify-center m-2 border-orange-600 border-2 font-semibold">Start</div>
				break;
			case "play":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-amber-500 flex items-center justify-center m-2 border-amber-600 border-2 font-semibold">Play</div>
				break;
			case "draw":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-emerald-500 flex items-center justify-center m-2 border-emerald-600 border-2 font-semibold">Draw</div>
				break;
			case "trap":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-teal-500 flex items-center justify-center m-2 border-teal-600 border-2 font-semibold">Trap</div>;
				break;
			case "end turn":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-blue-500 flex items-center justify-center m-2 border-blue-600 border-2 font-semibold">End Turn</div>;
				break;
			case "end round":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-indigo-500 flex items-center justify-center m-2 border-indigo-600 border-2 font-semibold">End Round</div>;
				break;
			case "return":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-violet-500 flex items-center justify-center m-2 border-violet-600 border-2 font-semibold">Return</div>
				break;
			case "linger":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-fuchsia-500 flex items-center justify-center m-2 border-fuchsia-600 border-2 font-semibold">Linger</div>
				break;
			case "restriction":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-slate-500 flex items-center justify-center m-2 border-slate-600 border-2 font-semibold">Restriction</div>
				break;
		}

		moveTable.push(
			<tr key={index} className={`${index !== moves.length ? "border-b-2" : ""} hover:bg-slate-200 transition-all delay-100`}>
				<td>{moveTypeMarker}</td>
				<td>{move.moveContent !== undefined ? moveContentParser(move.moveContent) : move.description}</td>
			</tr>
		)
	}

	switch (availability) {
		case 'none': 
			rarityMarker = <div className={`w-full ${rarityStyle} rounded-lg`}>{rarityName}</div>
			break
		case 'limited': 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-amber-500 flex items-center justify-center text-[0.7rem] mb-2 border-amber-600 border-2 border-e-0 font-semibold">L</div>
				<div className={`w-[75%] ${rarityStyle} rounded-e-lg border-s-0`}>{rarityName}</div>
			</div>
			break
		case 'restricted': 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-slate-700 flex items-center justify-center text-[0.7rem] mb-2 border-slate-900 border-2 border-e-0 font-semibold">R</div>
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
		<div className={`bg-gradient-to-r p-[3px] ${colorDefiner(400)} box-border rounded w-[18rem] h-[30rem]`}>
			<div className={`flex flex-col p-2 rounded-sm w-full h-full bg-gradient-to-r ${colorDefiner(100)} bg-opacity-20`}>
				<div className="text-center text-lg font-extrabold pb-2 block">{name}</div>

				<div className="flex gap-2">
					{typeMarker}

					{rarityMarker}

					<div className="flex w-full">
						<div className="w-full text-white rounded-s-lg bg-cyan-500 flex items-center justify-center text-[0.7rem] mb-2 border-cyan-600 border-2 border-e-0 font-semibold">{energy}</div>
						<div className="w-full text-white rounded-e-lg bg-indigo-500 flex items-center justify-center text-[0.7rem] mb-2 border-indigo-600 border-2 border-s-0 font-semibold">{power}</div>
					</div>
				</div>

				<div className="flex flex-col w-full h-full gap-1">
					<div className={`border-transparent bg-clip-border bg-gradient-to-r ${colorDefiner(400)} h-[178.203px] w-full overflow-hidden justify-center flex items-center p-[3px] rounded flex-grow-0`}>
						<div className="bg-white justify-center flex items-center h-full w-full rounded-sm">
							{bgCover ? <img src={image} className="h-full w-full object-cover flex-shrink-0 rounded-sm" /> : <img src={image} className={`${!mini ? "max-h-[80%] max-w-[80%]" : "max-h-[50%] max-w-[50%]"}`} /> }
						</div>
					</div>
					<div className={`bg-gradient-to-r ${colorDefiner(400)} p-[3px] w-full h-[178.203px] text-[0.65rem] overflow-auto justify-center flex items-center rounded`}>
						<div className="bg-white w-full h-full p-2 rounded-sm">
							<table className="h-full">
								<tbody className="h-full">
									{moveTable}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="text-center text-sm pt-1">
					<div className={`bg-gradient-to-r w-full ${colorDefiner(400)} flex items-center justify-center text-[0.7rem] p-[3px] rounded`}>
						<div className="bg-white w-full rounded-sm">
							<div className={`bg-gradient-to-r w-full text-transparent bg-clip-text ${colorDefiner(500)} font-bold`}>
								{category}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}