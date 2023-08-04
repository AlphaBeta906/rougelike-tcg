"use client"

import { TCard, Move, MoveType } from '@/data/cardTypes';
import getCategory from '@/data/categories';

export default function Card({ name, image, type, rarity, availability="none", energy, power, moves, category, bgCover=false }: TCard) {
	let typeMarker, rarityStyle, rarityName, rarityMarker;
	const color = getCategory(category)

	switch (type) {
		case "combatant":
			typeMarker = <div className="w-full text-white rounded-lg bg-red-700 flex items-center justify-center text-[0.65rem] mb-2 p-[0.25rem]">Combatant</div>
			break;
		case "resource":
			typeMarker = <div className="w-full text-white rounded-lg bg-amber-500 flex items-center justify-center text-[0.65rem] mb-2 p-[0.25rem]">Resource</div>
			break;
		case "effect":
			typeMarker = <div className="w-full text-white rounded-lg bg-violet-500 flex items-center justify-center text-[0.65rem] mb-2 p-[0.25rem]">Effect</div>
			break;
		case "tool":
			typeMarker = <div className="w-full text-white rounded-lg bg-slate-500 flex items-center justify-center text-[0.65rem] mb-2 p-[0.25rem]">Tool</div>
			break;
	}

	switch (rarity) {
		case "common":
			rarityStyle = "text-white bg-zinc-400 flex items-center justify-center text-[0.65rem] mb-2"
			rarityName = "Common"
			break;
		case "rare":
			rarityStyle = "text-white bg-amber-600 flex items-center justify-center text-[0.65rem] mb-2"
			rarityName = "Rare"
			break;
		case "epic":
			rarityStyle = "text-white bg-slate-400 flex items-center justify-center text-[0.65rem] mb-2"
			rarityName = "Epic"
			break;
		case "legendary":
			rarityStyle = "text-white bg-yellow-500 flex items-center justify-center text-[0.65rem] mb-2"
			rarityName = "Legendary"
			break;
	}

	let moveTable = []
	let index = 0;

	for (let moveIndex in moves as Move<MoveType>[]) {
		index++

		let move = moves[moveIndex]

		let moveTypeMarker;

		switch (move.type) {
			case "ability":
				if ("price" in move) {
					moveTypeMarker = <div className="w-[4.5rem] flex m-2">
						<div className="w-[30%] text-white rounded-s-lg bg-amber-500 flex items-center justify-center">{move.price}</div>
						<div className="w-[70%] text-white rounded-e-lg bg-red-500 flex items-center justify-center">Ability</div>
					</div>
				}
				break;
			case "start":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-amber-500 flex items-center justify-center m-2">Start</div>
				break;
			case "play":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-yellow-500 flex items-center justify-center m-2">Play</div>
				break;
			case "draw":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-green-400 flex items-center justify-center m-2">Draw</div>
				break;
			case "end turn":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-blue-500 flex items-center justify-center m-2">End Turn</div>;
				break;
			case "end round":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-indigo-500 flex items-center justify-center m-2">End Round</div>;
				break;
			case "return":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-violet-500 flex items-center justify-center m-2">Return</div>
				break;
			case "linger":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-fuchsia-500 flex items-center justify-center m-2">Linger</div>
				break;
		}

		moveTable.push(
			<tr key={index} className={`${index !== moves.length ? "border-b-2" : ""} hover:bg-slate-200 transition-all delay-100`}>
				<td>{moveTypeMarker}</td>
				<td>{move.description}</td>
			</tr>
		)
	}

	switch (availability) {
		case 'none': 
			rarityMarker = <div className={`w-full ${rarityStyle} rounded-lg p-[0.25rem]`}>{rarityName}</div>
			break
		case 'limited': 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-amber-500 flex items-center justify-center text-[0.65rem] mb-2 p-[0.25rem]">L</div>
				<div className={`w-[75%] ${rarityStyle} rounded-e-lg p-[0.25rem]`}>{rarityName}</div>
			</div>
			break
		case 'restricted': 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-black flex items-center justify-center text-[0.65rem] mb-2 p-[0.25rem]">R</div>
				<div className={`w-[75%] ${rarityStyle} rounded-e-lg p-[0.25rem]`}>{rarityName}</div>
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
		<div className={`bg-gradient-to-r p-[3px] ${colorDefiner(300)} box-border rounded w-[18rem] h-[30rem]`}>
			<div className="flex flex-col bg-white p-2 rounded-sm w-full h-full">
				<div className="text-center text-lg font-bold pb-2 block">{name}</div>

				<div className="flex gap-2">
					{typeMarker}

					{rarityMarker}

					<div className="flex w-full">
						<div className="w-full text-white rounded-s-lg bg-cyan-500 flex items-center justify-center text-[0.65rem] p-[0.25rem] mb-2">{energy}</div>
						<div className="w-full text-white rounded-e-lg bg-indigo-500 flex items-center justify-center text-[0.65rem] p-[0.25rem] mb-2">{power}</div>
					</div>
				</div>

				<div className="flex flex-col w-full h-full gap-1">
					<div className={`border-transparent bg-clip-border bg-gradient-to-r ${colorDefiner(300)} h-[178.203px] w-full overflow-hidden justify-center flex items-center p-[3px] rounded flex-grow-0`}>
						<div className="bg-white justify-center flex items-center h-full w-full rounded-sm">
							{bgCover ? <img src={image} className="h-full w-full object-cover flex-shrink-0" /> : <img src={image} className="w-1/2 h-shrink object-cover" /> }
						</div>
					</div>
					<div className={`bg-gradient-to-r ${colorDefiner(300)} p-[3px] w-full h-[178.203px] text-[0.65rem] overflow-auto justify-center flex items-center rounded`}>
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
					<div className={`bg-gradient-to-r w-full ${colorDefiner(300)} flex items-center justify-center text-[0.65rem] p-[3px] rounded`}>
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