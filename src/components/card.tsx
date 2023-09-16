"use client";

import { TCard } from "@/data/cardTypes";
import { getCategoryColors } from "@/data/categories";
import moveContentParser from "@/lib/moveContentParser";

function colorDefiner(color: string[], shade: number) {
	if (color.length === 1) {
		return `from-${color}-${shade} to-${color}-${shade}`;
	} else {
		return `from-${color[0]}-${shade} to-${color[1]}-${shade}`;
	}
}

export default function Card({ name, image, type, rarity, availability="none", energy, power, moves, category, mini=false, bgCover=false}: TCard) {
	let typeMarker, rarityStyle, rarityName, rarityMarker;
	const color = getCategoryColors(category);

	switch (type) {
		case "combatant":
			typeMarker = <div className="w-full text-white rounded-lg bg-red-700 flex items-center justify-center text-[0.65rem] mb-2 h-[calc(31.5938px-8px)] border-red-800 border-2 font-semibold">Combatant</div>;
			break;
		case "resource":
			typeMarker = <div className="w-full text-white rounded-lg bg-amber-500 flex items-center justify-center text-[0.65rem] mb-2 h-[calc(31.5938px-8px)] border-amber-600 border-2 font-semibold">Resource</div>;
			break;
		case "trap":
			typeMarker = <div className="w-full text-white rounded-lg bg-teal-500 flex items-center justify-center text-[0.65rem] mb-2 h-[calc(31.5938px-8px)] border-teal-600 border-2 font-semibold">Trap</div>;
			break;
		case "effect":
			typeMarker = <div className="w-full text-white rounded-lg bg-violet-500 flex items-center justify-center text-[0.65rem] mb-2 h-[calc(31.5938px-8px)] border-violet-600 border-2 font-semibold">Effect</div>;
			break;
		case "operator":
			typeMarker = <div className="w-full text-white rounded-lg bg-emerald-500 flex items-center justify-center text-[0.65rem] mb-2 h-[calc(31.5938px-8px)] border-emerald-600 border-2 font-semibold">Operator</div>;
			break;
	}

	switch (rarity) {
		case "common":
			rarityStyle = "text-white bg-neutral-400 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.65rem] mb-2 border-neutral-500 border-2 font-semibold";
			rarityName = "Common";
			break;
		case "rare":
			rarityStyle = "text-white bg-amber-600 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.65rem] mb-2 border-amber-700 border-2 font-semibold";
			rarityName = "Rare";
			break;
		case "epic":
			rarityStyle = "text-white bg-slate-400 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.65rem] mb-2 border-slate-500 border-2 font-semibold";
			rarityName = "Epic";
			break;
		case "legendary":
			rarityStyle = "text-white bg-yellow-500 flex items-center justify-center h-[calc(31.5938px-8px)] text-[0.65rem] mb-2 border-yellow-600 border-2 font-semibold";
			rarityName = "Legendary";
			break;
	}

	const moveTable = moves.map((move, index) => {
		let moveTypeMarker;

		switch (move.type) {
			case "ability":
				if ("price" in move) {
					moveTypeMarker = <div className="w-[4.5rem] flex m-2">
						<div className="w-[30%] text-white rounded-s-lg bg-amber-500 flex items-center justify-center border-amber-600 border-2 border-e-0 font-semibold">{move.price}</div>
						<div className="w-[70%] text-white rounded-e-lg bg-red-500 flex items-center justify-center border-red-600 border-2 border-s-0 font-semibold">Ability</div>
					</div>;
				}
				break;
			case "play":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-amber-500 flex items-center justify-center m-2 border-amber-600 border-2 font-semibold">Play</div>;
				break;
			case "start":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-yellow-500 flex items-center justify-center m-2 border-yellow-600 border-2 font-semibold">Start</div>;
				break;
			case "draw":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-emerald-500 flex items-center justify-center m-2 border-emerald-600 border-2 font-semibold">Draw</div>;
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
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-violet-500 flex items-center justify-center m-2 border-violet-600 border-2 font-semibold">Return</div>;
				break;
			case "linger":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-fuchsia-500 flex items-center justify-center m-2 border-fuchsia-600 border-2 font-semibold">Linger</div>;
				break;
			case "restriction":
				moveTypeMarker = <div className="w-[4.5rem] text-white rounded-lg bg-slate-500 flex items-center justify-center m-2 border-slate-600 border-2 font-semibold">Restriction</div>;
				break;
		}
		
		return (
			<tr key={index} className={`${(index + 1) !== moves.length ? "border-b-2" : ""} hover:bg-slate-200 transition-all delay-100`}>
				<td>{moveTypeMarker}</td>
				<td>{move.moveContent !== undefined ? moveContentParser(move.moveContent) : move.description}</td>
			</tr>
		);
	});

	switch (availability) {
		case "none": 
			rarityMarker = <div className={`w-full ${rarityStyle} rounded-lg`}>{rarityName}</div>;
			break;
		case "limited": 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-amber-500 flex items-center justify-center text-[0.7rem] mb-2 border-amber-600 border-2 border-e-0 font-semibold">L</div>
				<div className={`w-[75%] ${rarityStyle} rounded-e-lg border-s-0`}>{rarityName}</div>
			</div>;
			break;
		case "restricted": 
			rarityMarker = <div className="flex w-full">
				<div className="w-[25%] text-white rounded-s-lg bg-slate-700 flex items-center justify-center text-[0.7rem] mb-2 border-slate-900 border-2 border-e-0 font-semibold">R</div>
				<div className={`w-[75%] ${rarityStyle} rounded-e-lg border-s-0`}>{rarityName}</div>
			</div>;
			break;
	}

	return (
		<div className={`bg-gradient-to-r p-[3px] ${colorDefiner(color, 400)} box-border rounded w-[16.5rem] h-[27rem]`}>
			<div className={`flex flex-col p-2 rounded-sm w-full h-full bg-gradient-to-r ${colorDefiner(color, 100)}`}>
				<div className="text-center text-lg font-extrabold pb-2 block opacity-100 blur-0">{name}</div>

				<div className="flex gap-2">
					{typeMarker}

					{rarityMarker}

					<div className="flex w-full">
						<div className="w-full text-white rounded-s-lg bg-cyan-500 flex items-center justify-center text-[0.65rem] mb-2 border-cyan-600 border-2 border-e-0 font-semibold">{energy}</div>
						<div className="w-full text-white rounded-e-lg bg-indigo-500 flex items-center justify-center text-[0.65rem] mb-2 border-indigo-600 border-2 border-s-0 font-semibold">{power}</div>
					</div>
				</div>

				<div className="flex flex-col w-full h-full gap-1">
					<div className={`border-transparent bg-clip-border bg-gradient-to-r ${colorDefiner(color, 400)} h-[154.203px] w-full overflow-hidden justify-center flex items-center p-[3px] rounded flex-grow-0`}>
						<div className={`${bgCover ? "" : "bg-white"} justify-center flex items-center h-full w-full rounded-sm bg-cover bg-center`} style={{ backgroundImage: (bgCover ? `url("./img/${image}")` : undefined )}} >
							{bgCover ? <div /> : <img src={`./img/${image}`} className={`${!mini ? "max-h-[80%] max-w-[80%]" : "max-h-[50%] max-w-[50%]"}`} /> }
						</div>
					</div>
					<div className={`bg-gradient-to-r ${colorDefiner(color, 400)} p-[3px] w-full h-[154.203px] text-[0.58rem] overflow-auto justify-center flex items-center rounded`}>
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
					<div className={`bg-gradient-to-r w-full ${colorDefiner(color, 400)} flex items-center justify-center text-[0.7rem] p-[3px] rounded`}>
						<div className="bg-white w-full rounded-sm">
							<div className={`bg-gradient-to-r w-full text-transparent bg-clip-text ${colorDefiner(color, 500)} font-bold`}>
								{category}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}